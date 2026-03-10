import { useCallback } from 'react';
import type { CartItem, CartItemComputed, CartComputed } from '@/types/product';
import { getProductById } from '@/data/products';
import { calculateDiscount } from '@/data/business-rules';

const STORAGE_KEY = 'ar-jeans-cart';

function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

export function loadCartFromStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as CartItem[];
  } catch {
    /* corrupted — ignore */
  }
  return [];
}

function saveCartToStorage(items: CartItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* quota — ignore */
  }
}

/** Actions do carrinho — recebem setter de estado do Context */
export function useCartActions(
  items: CartItem[],
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>
) {
  const addItem = useCallback(
    (productId: string, colorId: string, sizes: Record<string, number>) => {
      const filtered: Record<string, number> = {};
      for (const [size, qty] of Object.entries(sizes)) {
        if (qty > 0) filtered[size] = qty;
      }
      if (Object.keys(filtered).length === 0) return;

      setItems((prev) => {
        const idx = prev.findIndex(
          (i) => i.productId === productId && i.colorId === colorId
        );

        let next: CartItem[];
        if (idx >= 0) {
          next = [...prev];
          const existing = { ...next[idx]! };
          const merged = { ...existing.sizes };
          for (const [size, qty] of Object.entries(filtered)) {
            merged[size] = (merged[size] ?? 0) + qty;
          }
          existing.sizes = merged;
          next[idx] = existing;
        } else {
          next = [
            ...prev,
            { id: generateId(), productId, colorId, sizes: filtered },
          ];
        }

        saveCartToStorage(next);
        return next;
      });
    },
    [setItems]
  );

  const updateItemSizes = useCallback(
    (itemId: string, sizes: Record<string, number>) => {
      setItems((prev) => {
        const next = prev
          .map((item) => {
            if (item.id !== itemId) return item;
            const filtered: Record<string, number> = {};
            for (const [size, qty] of Object.entries(sizes)) {
              if (qty > 0) filtered[size] = qty;
            }
            return { ...item, sizes: filtered };
          })
          .filter((item) => Object.keys(item.sizes).length > 0);

        saveCartToStorage(next);
        return next;
      });
    },
    [setItems]
  );

  const removeItem = useCallback(
    (itemId: string) => {
      setItems((prev) => {
        const next = prev.filter((i) => i.id !== itemId);
        saveCartToStorage(next);
        return next;
      });
    },
    [setItems]
  );

  const clearCart = useCallback(() => {
    setItems([]);
    saveCartToStorage([]);
  }, [setItems]);

  return { addItem, updateItemSizes, removeItem, clearCart };
}

/** Computa valores derivados do carrinho (totais, descontos) */
export function computeCart(items: CartItem[]): CartComputed {
  const computedItems: CartItemComputed[] = items
    .map((item) => {
      const product = getProductById(item.productId);
      if (!product) return null;

      const color = product.colors.find((c) => c.id === item.colorId);
      if (!color) return null;

      const totalPieces = Object.values(item.sizes).reduce(
        (sum, qty) => sum + qty,
        0
      );
      const unitPrice = product.basePrice;
      const subtotal = totalPieces * unitPrice;

      return { ...item, product, color, totalPieces, unitPrice, subtotal };
    })
    .filter((x): x is CartItemComputed => x !== null);

  const totalPieces = computedItems.reduce((s, i) => s + i.totalPieces, 0);
  const subtotalBruto = computedItems.reduce((s, i) => s + i.subtotal, 0);
  const { tier, discountPercent, discountAmount, totalFinal, orderType } =
    calculateDiscount(subtotalBruto, totalPieces);

  return {
    items: computedItems,
    totalPieces,
    subtotalBruto,
    discountTier: tier,
    discountPercent,
    discountAmount,
    totalFinal,
    orderType,
  };
}

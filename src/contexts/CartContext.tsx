import {
  createContext,
  useContext,
  useState,
  useMemo,
  type ReactNode,
} from 'react';
import type { CartItem, CartComputed } from '@/types/product';
import {
  useCartActions,
  computeCart,
  loadCartFromStorage,
} from '@/hooks/useCart';

interface CartContextValue {
  items: CartItem[];
  computed: CartComputed;
  addItem: (
    productId: string,
    colorId: string,
    sizes: Record<string, number>
  ) => void;
  updateItemSizes: (itemId: string, sizes: Record<string, number>) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCartFromStorage);
  const actions = useCartActions(items, setItems);
  const computed = useMemo(() => computeCart(items), [items]);

  return (
    <CartContext.Provider value={{ items, computed, ...actions }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCartContext must be used within CartProvider');
  return ctx;
}

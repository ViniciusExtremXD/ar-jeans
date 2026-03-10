import { useState, useCallback } from 'react';
import type { Product, OrderSelection } from '@/types/product';

/**
 * Estado local do formulário de seleção dentro do ProductDetail.
 * Gerencia cores selecionadas, quantidades por cor/tamanho e preview.
 */
export function useProduct(product: Product) {
  // ── Estado inicial ──
  const makeInitialColors = () => {
    const map: Record<string, boolean> = {};
    product.colors.forEach((c, i) => {
      map[c.id] = i === 0;
    });
    return map;
  };

  const makeInitialQty = () => {
    const map: Record<string, Record<string, number>> = {};
    product.colors.forEach((c) => {
      map[c.id] = {};
      product.sizes.forEach((s) => {
        map[c.id]![s] = 0;
      });
    });
    return map;
  };

  const [selection, setSelection] = useState<OrderSelection>({
    selectedColors: makeInitialColors(),
    quantities: makeInitialQty(),
    activeColorTab: product.colors[0]?.id ?? '',
  });

  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [previewColorId, setPreviewColorId] = useState(
    product.colors[0]?.id ?? ''
  );

  // ── Ações ──
  const toggleColor = useCallback(
    (colorId: string) => {
      setSelection((prev) => {
        const wasSelected = prev.selectedColors[colorId];
        const newColors = { ...prev.selectedColors, [colorId]: !wasSelected };

        // Zero quantidades se deselecionou
        const newQty = { ...prev.quantities };
        if (wasSelected) {
          newQty[colorId] = { ...newQty[colorId] };
          for (const size of Object.keys(newQty[colorId]!)) {
            newQty[colorId]![size] = 0;
          }
        }

        // Manter um tab ativo
        let tab = prev.activeColorTab;
        if (wasSelected && tab === colorId) {
          tab =
            Object.entries(newColors).find(([, sel]) => sel)?.[0] ?? tab;
        }
        if (!wasSelected) tab = colorId;

        return {
          selectedColors: newColors,
          quantities: newQty,
          activeColorTab: tab,
        };
      });

      setPreviewColorId(colorId);
      setActivePhotoIndex(0);
    },
    []
  );

  const setActiveColorTab = useCallback((colorId: string) => {
    setSelection((prev) => ({ ...prev, activeColorTab: colorId }));
    setPreviewColorId(colorId);
    setActivePhotoIndex(0);
  }, []);

  const changeQuantity = useCallback(
    (colorId: string, size: string, delta: number) => {
      setSelection((prev) => {
        const curr = prev.quantities[colorId]?.[size] ?? 0;
        const next = Math.max(0, Math.min(99, curr + delta));
        return {
          ...prev,
          quantities: {
            ...prev.quantities,
            [colorId]: { ...prev.quantities[colorId], [size]: next },
          },
        };
      });
    },
    []
  );

  const setQuantity = useCallback(
    (colorId: string, size: string, qty: number) => {
      const clamped = Math.max(0, Math.min(99, qty));
      setSelection((prev) => ({
        ...prev,
        quantities: {
          ...prev.quantities,
          [colorId]: { ...prev.quantities[colorId], [size]: clamped },
        },
      }));
    },
    []
  );

  // ── Computed ──
  const getTotalPieces = useCallback((): number => {
    let total = 0;
    for (const [cid, sel] of Object.entries(selection.selectedColors)) {
      if (!sel) continue;
      for (const qty of Object.values(selection.quantities[cid] ?? {})) {
        total += qty;
      }
    }
    return total;
  }, [selection]);

  const getItemsToAdd = useCallback((): Array<{
    colorId: string;
    sizes: Record<string, number>;
  }> => {
    const result: Array<{ colorId: string; sizes: Record<string, number> }> =
      [];
    for (const [cid, sel] of Object.entries(selection.selectedColors)) {
      if (!sel) continue;
      const sizes: Record<string, number> = {};
      let hasPieces = false;
      for (const [sz, qty] of Object.entries(
        selection.quantities[cid] ?? {}
      )) {
        if (qty > 0) {
          sizes[sz] = qty;
          hasPieces = true;
        }
      }
      if (hasPieces) result.push({ colorId: cid, sizes });
    }
    return result;
  }, [selection]);

  const resetSelection = useCallback(() => {
    setSelection({
      selectedColors: makeInitialColors(),
      quantities: makeInitialQty(),
      activeColorTab: product.colors[0]?.id ?? '',
    });
    setActivePhotoIndex(0);
    setPreviewColorId(product.colors[0]?.id ?? '');
  }, [product]);

  return {
    selection,
    activePhotoIndex,
    setActivePhotoIndex,
    previewColorId,
    setPreviewColorId,
    toggleColor,
    setActiveColorTab,
    setQuantity,
    changeQuantity,
    getTotalPieces,
    getItemsToAdd,
    resetSelection,
  };
}

import type { CartItemComputed } from '@/types/product';
import { formatCurrency } from '@/utils/format';
import styles from './CartItem.module.css';

interface Props {
  item: CartItemComputed;
  onRemove: () => void;
  onUpdateSizes: (sizes: Record<string, number>) => void;
  onEdit: () => void;
}

function formatSizeLabel(size: string, audience: string): string {
  if (audience === 'infantil') return `Infantil ${size}`;
  if (/^\d+$/.test(size)) return `Nº ${size}`;
  return `Tamanho ${size}`;
}

export function CartItem({ item, onRemove, onUpdateSizes, onEdit }: Props) {
  const sizesEntries = Object.entries(item.sizes).filter(([, qty]) => qty > 0);

  const updateSizeQty = (size: string, nextQty: number) => {
    const nextSizes = { ...item.sizes, [size]: Math.max(0, nextQty) };
    onUpdateSizes(nextSizes);
  };

  const removeSize = (size: string) => {
    const nextSizes = { ...item.sizes };
    delete nextSizes[size];
    onUpdateSizes(nextSizes);
  };

  return (
    <div className={styles.item}>
      <div className={styles.header}>
        <div>
          <span className={styles.type}>{item.product.typeLabel}</span>
          <h4 className={styles.name}>{item.product.name}</h4>
          <span className={styles.color}>
            <span
              className={styles.colorDot}
              style={{ background: item.color.gradient }}
            />
            {item.color.label} · Catálogo p.{item.product.catalogPage}
          </span>
          <span className={styles.ref}>Ref: {item.product.reference}</span>
        </div>
        <div className={styles.headerActions}>
          <button
            className={styles.editBtn}
            onClick={onEdit}
            type="button"
            aria-label="Editar item no modal"
          >
            Editar
          </button>
          <button
            className={styles.removeBtn}
            onClick={onRemove}
            type="button"
            aria-label="Remover item"
          >
            ✕
          </button>
        </div>
      </div>

      <div className={styles.variants}>
        {sizesEntries.map(([size, qty]) => (
          <div key={size} className={styles.variantRow}>
            <div className={styles.variantText}>
              <span className={styles.variantSize}>{formatSizeLabel(size, item.product.audience)}</span>
              <span className={styles.variantQty}>{qty} peça{qty !== 1 ? 's' : ''}</span>
            </div>
            <div className={styles.variantControls}>
              <button
                className={styles.qtyBtn}
                onClick={() => updateSizeQty(size, qty - 1)}
                type="button"
                aria-label={`Diminuir quantidade do ${size}`}
              >
                −
              </button>
              <span className={styles.qtyValue}>{qty}</span>
              <button
                className={styles.qtyBtn}
                onClick={() => updateSizeQty(size, qty + 1)}
                type="button"
                aria-label={`Aumentar quantidade do ${size}`}
              >
                +
              </button>
              <button
                className={styles.removeSizeBtn}
                onClick={() => removeSize(size)}
                type="button"
                aria-label={`Remover tamanho ${size}`}
              >
                <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false">
                  <path
                    d="M9 3h6m-9 3h12m-1 0-1 13a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2L7 6m3 4v7m4-7v7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <div className={styles.footerLeft}>
          <span className={styles.pieces}>{item.totalPieces} pç</span>
          {item.discountPercent > 0 && (
            <span className={styles.discountBadge}>{item.discountPercent}% OFF</span>
          )}
        </div>
        <div className={styles.priceGroup}>
          {item.discountPercent > 0 && (
            <span className={styles.originalPrice}>{formatCurrency(item.subtotal)}</span>
          )}
          <span className={`${styles.subtotal} ${item.discountPercent > 0 ? styles.discounted : ''}`}>
            {formatCurrency(item.discountPercent > 0 ? item.subtotalFinal : item.subtotal)}
          </span>
        </div>
      </div>
    </div>
  );
}

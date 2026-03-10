import type { CartItemComputed } from '@/types/product';
import { formatCurrency } from '@/utils/format';
import styles from './CartItem.module.css';

interface Props {
  item: CartItemComputed;
  onRemove: () => void;
}

export function CartItem({ item, onRemove }: Props) {
  const sizesEntries = Object.entries(item.sizes).filter(([, qty]) => qty > 0);

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
            {item.color.label}
          </span>
        </div>
        <button
          className={styles.removeBtn}
          onClick={onRemove}
          type="button"
          aria-label="Remover item"
        >
          ✕
        </button>
      </div>

      <div className={styles.sizes}>
        {sizesEntries.map(([size, qty]) => (
          <span key={size} className={styles.sizePill}>
            {size}: {qty}
          </span>
        ))}
      </div>

      <div className={styles.footer}>
        <span className={styles.pieces}>{item.totalPieces} pç</span>
        <span className={styles.subtotal}>
          {formatCurrency(item.subtotal)}
        </span>
      </div>
    </div>
  );
}

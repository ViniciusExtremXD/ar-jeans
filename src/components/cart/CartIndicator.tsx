import { useCartContext } from '@/contexts/CartContext';
import { trackEvent } from '@/utils/analytics';
import styles from './CartIndicator.module.css';

interface Props {
  onClick: () => void;
}

export function CartIndicator({ onClick }: Props) {
  const { computed } = useCartContext();
  const { totalPieces } = computed;

  const handleClick = () => {
    trackEvent('cart_open', { totalPieces });
    onClick();
  };

  return (
    <button
      className={styles.indicator}
      onClick={handleClick}
      type="button"
      aria-label={`Carrinho: ${totalPieces} peças`}
    >
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
      {totalPieces > 0 && (
        <span className={styles.badge}>{totalPieces}</span>
      )}
    </button>
  );
}

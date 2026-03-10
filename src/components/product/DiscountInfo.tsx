import { DISCOUNT_TIERS, WHOLESALE_THRESHOLD } from '@/data/business-rules';
import styles from './DiscountInfo.module.css';

interface Props {
  currentPieces: number;
}

export function DiscountInfo({ currentPieces }: Props) {
  return (
    <div className={styles.box}>
      <div className={styles.title}>Varejo & Atacado — Desconto Progressivo</div>
      <div className={styles.row}>
        {DISCOUNT_TIERS.map((tier) => {
          const isActive =
            currentPieces >= tier.minPieces &&
            currentPieces <= tier.maxPieces;
          const isPast = currentPieces > tier.maxPieces;
          return (
            <div
              key={tier.minPieces}
              className={`${styles.card} ${isActive ? styles.active : ''} ${isPast ? styles.past : ''}`}
            >
              <div className={styles.value}>
                {tier.orderType === 'varejo'
                  ? 'Varejo'
                  : tier.discountPercent > 0
                    ? `-${tier.discountPercent}%`
                    : '0%'}
              </div>
              <div className={styles.label}>{tier.label}</div>
              <div className={styles.sub}>
                {tier.maxPieces === Infinity
                  ? `${tier.minPieces}+ pç`
                  : `${tier.minPieces}–${tier.maxPieces} pç`}
              </div>
            </div>
          );
        })}
      </div>
      {currentPieces > 0 && currentPieces < WHOLESALE_THRESHOLD && (
        <div className={styles.warning}>
          💡 A partir de {WHOLESALE_THRESHOLD} peças você entra no atacado com desconto progressivo!
        </div>
      )}
    </div>
  );
}

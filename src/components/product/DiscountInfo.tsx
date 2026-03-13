import { getDiscountTier, WHOLESALE_THRESHOLD } from '@/data/business-rules';
import styles from './DiscountInfo.module.css';

interface Props {
  currentPieces: number;
}

export function DiscountInfo({ currentPieces }: Props) {
  if (currentPieces <= 0) return null;

  const tier = getDiscountTier(currentPieces);

  if (tier.discountPercent > 0) {
    return (
      <div className={styles.active}>
        <span className={styles.check}>&#10003;</span>
        <span className={styles.pct}>{tier.discountPercent}% OFF</span>
        <span className={styles.tierLabel}>· {tier.label}</span>
      </div>
    );
  }

  const remaining = WHOLESALE_THRESHOLD - currentPieces;
  return (
    <p className={styles.hint}>
      +{remaining} peça{remaining !== 1 ? 's' : ''} para 10% OFF automático
    </p>
  );
}

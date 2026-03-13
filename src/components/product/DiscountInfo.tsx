import { DISCOUNT_TIERS, getDiscountTier } from '@/data/business-rules';
import styles from './DiscountInfo.module.css';

interface Props {
  currentPieces: number;
}

export function DiscountInfo({ currentPieces }: Props) {
  const pieces = Math.max(0, currentPieces);
  const currentTier = getDiscountTier(Math.max(1, pieces));
  const nextTier = DISCOUNT_TIERS.find((tier) => pieces < tier.minPieces);

  let helperMessage = 'Adicione peças para liberar desconto atacado neste item';
  if (pieces > 0 && nextTier) {
    const missing = nextTier.minPieces - pieces;
    helperMessage = `Faltam ${missing} peça${missing !== 1 ? 's' : ''} para ${nextTier.discountPercent}% OFF`;
  } else if (currentTier.discountPercent === 10) {
    helperMessage = 'Atacado ativado neste item';
  } else if (currentTier.discountPercent === 20) {
    helperMessage = '20% OFF liberado neste item';
  }

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.title}>Desconto Progressivo por Produto</span>
        <span className={styles.currentPieces}>{pieces} pç selecionada{pieces !== 1 ? 's' : ''}</span>
      </div>

      <div className={styles.tiers}>
        {DISCOUNT_TIERS.map((tier) => {
          const isActive = pieces >= tier.minPieces && pieces <= tier.maxPieces;
          const isReached = pieces > tier.maxPieces;

          return (
            <article
              key={tier.minPieces}
              className={`${styles.tier} ${isActive ? styles.active : ''} ${isReached ? styles.reached : ''}`}
            >
              <span className={styles.tierLabel}>{tier.label}</span>
              <strong className={styles.tierValue}>
                {tier.discountPercent === 0 ? 'Preço cheio' : `${tier.discountPercent}% OFF`}
              </strong>
              <span className={styles.tierRange}>
                {tier.maxPieces === Infinity
                  ? `${tier.minPieces}+ peças`
                  : `${tier.minPieces} a ${tier.maxPieces} peças`}
              </span>
            </article>
          );
        })}
      </div>

      <p className={styles.helper}>{helperMessage}</p>
    </div>
  );
}

import type { Badge as BadgeType } from '@/types/product';
import styles from './Badge.module.css';

interface Props {
  badge: BadgeType;
}

export function Badge({ badge }: Props) {
  return (
    <span
      className={`${styles.badge} ${badge.variant === 'gold' ? styles.gold : styles.dark}`}
    >
      {badge.icon} {badge.text}
    </span>
  );
}

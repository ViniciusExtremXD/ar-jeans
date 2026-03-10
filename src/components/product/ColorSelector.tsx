import type { ProductColor } from '@/types/product';
import styles from './ColorSelector.module.css';

interface Props {
  colors: ProductColor[];
  selectedColors: Record<string, boolean>;
  onToggle: (colorId: string) => void;
}

export function ColorSelector({ colors, selectedColors, onToggle }: Props) {
  return (
    <div className={styles.wrap}>
      {colors.map((color) => {
        const active = selectedColors[color.id] ?? false;
        return (
          <button
            key={color.id}
            className={`${styles.btn} ${active ? styles.active : ''}`}
            onClick={() => onToggle(color.id)}
            type="button"
          >
            <span
              className={`${styles.check} ${active ? styles.checkActive : ''}`}
            >
              {active ? '✓' : ''}
            </span>
            <span
              className={styles.dot}
              style={{ background: color.gradient }}
            />
            {color.label}
          </button>
        );
      })}
    </div>
  );
}

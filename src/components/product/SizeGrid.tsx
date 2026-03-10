import type { ProductColor } from '@/types/product';
import { QuantityInput } from '@/components/ui/QuantityInput';
import styles from './SizeGrid.module.css';

interface Props {
  sizes: string[];
  colors: ProductColor[];
  selectedColors: Record<string, boolean>;
  activeColorTab: string;
  quantities: Record<string, Record<string, number>>;
  onTabChange: (colorId: string) => void;
  onQuantityChange: (colorId: string, size: string, delta: number) => void;
  onQuantitySet: (colorId: string, size: string, value: number) => void;
}

export function SizeGrid({
  sizes,
  colors,
  selectedColors,
  activeColorTab,
  quantities,
  onTabChange,
  onQuantityChange,
  onQuantitySet,
}: Props) {
  const activeTabs = colors.filter((c) => selectedColors[c.id]);

  return (
    <div>
      {/* Color tabs */}
      {activeTabs.length > 1 && (
        <div className={styles.tabs}>
          {activeTabs.map((color) => (
            <button
              key={color.id}
              className={`${styles.tab} ${
                color.id === activeColorTab ? styles.tabActive : ''
              }`}
              onClick={() => onTabChange(color.id)}
              type="button"
            >
              <span
                className={styles.tabDot}
                style={{ background: color.gradient }}
              />
              {color.label}
            </button>
          ))}
        </div>
      )}

      {/* Size grid for active tab */}
      <div className={styles.grid}>
        {sizes.map((sz) => (
          <QuantityInput
            key={sz}
            label={sz}
            value={quantities[activeColorTab]?.[sz] ?? 0}
            onIncrement={() => onQuantityChange(activeColorTab, sz, 1)}
            onDecrement={() => onQuantityChange(activeColorTab, sz, -1)}
            onChange={(v) => onQuantitySet(activeColorTab, sz, v)}
          />
        ))}
      </div>
    </div>
  );
}

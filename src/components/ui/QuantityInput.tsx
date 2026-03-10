import styles from './QuantityInput.module.css';

interface Props {
  value: number;
  label?: string;
  onChange: (value: number) => void;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
  compact?: boolean;
}

export function QuantityInput({
  value,
  label,
  onChange,
  onIncrement,
  onDecrement,
  min = 0,
  max = 99,
  compact = false,
}: Props) {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const n = parseInt(e.target.value) || 0;
    onChange(Math.max(min, Math.min(max, n)));
  };

  return (
    <div className={`${styles.wrapper} ${compact ? styles.compact : ''}`}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.control}>
        <button
          className={styles.btn}
          onClick={onDecrement}
          type="button"
          aria-label="Diminuir"
        >
          −
        </button>
        <input
          className={styles.input}
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={handleInput}
        />
        <button
          className={styles.btn}
          onClick={onIncrement}
          type="button"
          aria-label="Aumentar"
        >
          +
        </button>
      </div>
    </div>
  );
}

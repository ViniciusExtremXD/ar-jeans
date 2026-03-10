import { BUSINESS_RULES } from '@/data/business-rules';
import styles from './Hero.module.css';

interface Props {
  onScrollToShowcase: () => void;
}

export function Hero({ onScrollToShowcase }: Props) {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <span className={styles.logoA}>A</span>
          <span className={styles.logoR}>R</span>
          <span className={styles.logoDivider}> | </span>
          <span className={styles.logoText}>Jeans</span>
        </div>

        <div className={styles.tag}>
          <span className={styles.dot} />
          {BUSINESS_RULES.collectionName} · Moda Feminina
        </div>

        <h1 className={styles.title}>
          Varejo & Atacado<br />
          <span>Desconto Progressivo</span>
        </h1>

        <p className={styles.subtitle}>
          Compre a partir de 1 peça no varejo ou monte
          seu pedido atacado com desconto progressivo.
        </p>

        <div className={styles.highlights}>
          <div className={styles.highlight}>
            <strong>1+ peça</strong>
            <span>Varejo ou Atacado</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.highlight}>
            <strong>Até 20%</strong>
            <span>Desconto progressivo</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.highlight}>
            <strong>WhatsApp</strong>
            <span>Pedido direto</span>
          </div>
        </div>

        <button
          className={styles.cta}
          onClick={onScrollToShowcase}
          type="button"
        >
          Ver Coleção ↓
        </button>
      </div>

      <div className={styles.decoration}>
        <div className={styles.shapeRing} />
        <div className={styles.shapeCorner} />
      </div>
    </section>
  );
}

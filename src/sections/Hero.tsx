import { BUSINESS_RULES, COMPANY_INFO } from '@/data/business-rules';
import styles from './Hero.module.css';

interface Props {
  onScrollToShowcase: () => void;
}

export function Hero({ onScrollToShowcase }: Props) {
  return (
    <section id="topo" className={styles.hero}>
      <div className={styles.content}>
        {/* Logo */}
        <div className={styles.logo}>
          <span className={styles.logoA}>A</span>
          <span className={styles.logoR}>R</span>
          <span className={styles.logoDivider}> | </span>
          <span className={styles.logoText}>Jeans</span>
        </div>

        <div className={styles.tag}>
          <span className={styles.dot} />
          {BUSINESS_RULES.collectionName} · Atacado & Varejo
        </div>

        <h1 className={styles.title}>
          Moda que vende.<br />
          <span>Do varejo ao atacado.</span>
        </h1>

        <p className={styles.subtitle}>
          Feminino, masculino e infantil. Compre a partir de 1 peça
          ou monte seu pedido atacado com desconto progressivo de até 20%.
          Atendimento via WhatsApp · Loja física em São Paulo.
        </p>

        {/* Stats */}
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
            <strong>66+</strong>
            <span>Modelos no catálogo</span>
          </div>
        </div>

        {/* CTAs */}
        <div className={styles.ctaGroup}>
          <button
            className={styles.ctaPrimary}
            onClick={onScrollToShowcase}
            type="button"
          >
            Ver Coleção ↓
          </button>
          <a
            href={COMPANY_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaInsta}
          >
            Ver Instagram
          </a>
        </div>
      </div>

      <div className={styles.decoration}>
        <div className={styles.shapeRing} />
        <div className={styles.shapeCorner} />
      </div>
    </section>
  );
}

import { BUSINESS_RULES, COMPANY_INFO } from '@/data/business-rules';
import { DISCOUNT_TIERS } from '@/data/business-rules';
import styles from './WholesaleRetail.module.css';

export function WholesaleRetail() {
  const waRetail = `https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent(
    'Olá! Gostaria de fazer um pedido no varejo.'
  )}`;
  const waWholesale = `https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent(
    'Olá! Sou lojista e gostaria de fazer um pedido no atacado.'
  )}`;

  return (
    <section id="atacado-varejo" className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.tag}>MODALIDADES DE COMPRA</span>
          <h2 className={styles.title}>Atacado & Varejo</h2>
          <p className={styles.subtitle}>
            Atendemos tanto consumidores finais quanto lojistas e revendedores.
            O pedido é sempre finalizado pelo WhatsApp — simples e direto.
          </p>
        </div>

        {/* Cards comparativos */}
        <div className={styles.cards}>
          {/* Varejo */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.cardIcon}>🛍️</span>
              <div>
                <h3 className={styles.cardTitle}>Varejo</h3>
                <p className={styles.cardSub}>Para consumidor final</p>
              </div>
            </div>
            <ul className={styles.list}>
              <li>✓ A partir de <strong>1 peça</strong></li>
              <li>✓ Preço unitário padrão</li>
              <li>✓ Todos os produtos disponíveis</li>
              <li>✓ Pedido via WhatsApp</li>
              <li>✓ Retirada na loja ou combinar entrega</li>
            </ul>
            <a href={waRetail} target="_blank" rel="noopener noreferrer" className={styles.cardCta}>
              Comprar no Varejo
            </a>
          </div>

          {/* Atacado */}
          <div className={`${styles.card} ${styles.cardFeatured}`}>
            <div className={styles.featuredBadge}>Mais Popular</div>
            <div className={styles.cardHeader}>
              <span className={styles.cardIcon}>🏭</span>
              <div>
                <h3 className={styles.cardTitle}>Atacado</h3>
                <p className={styles.cardSub}>Para lojistas e revendedores</p>
              </div>
            </div>
            <ul className={styles.list}>
              <li>✓ A partir de <strong>6 peças</strong></li>
              <li>✓ Preço de atacado aplicado automaticamente</li>
              <li>✓ Desconto progressivo até <strong>20%</strong></li>
              <li>✓ Pedido via WhatsApp</li>
              <li>✓ Atendimento especializado a lojistas</li>
            </ul>
            <a href={waWholesale} target="_blank" rel="noopener noreferrer" className={styles.cardCtaFeatured}>
              Quero Comprar no Atacado
            </a>
          </div>
        </div>

        {/* Tabela de desconto progressivo */}
        <div className={styles.progressiveBlock}>
          <h3 className={styles.progressiveTitle}>Desconto Progressivo</h3>
          <p className={styles.progressiveSub}>
            Quanto mais peças, maior o desconto — aplicado automaticamente no pedido.
          </p>
          <div className={styles.tiers}>
            {DISCOUNT_TIERS.map((tier) => (
              <div key={tier.label} className={`${styles.tier} ${tier.orderType === 'atacado' ? styles.tierAtacado : ''}`}>
                <div className={styles.tierRange}>
                  {tier.maxPieces === Infinity
                    ? `${tier.minPieces}+ peças`
                    : `${tier.minPieces}–${tier.maxPieces} peças`}
                </div>
                <div className={styles.tierLabel}>{tier.label}</div>
                <div className={styles.tierDiscount}>
                  {tier.discountPercent > 0 ? `-${tier.discountPercent}%` : 'Preço padrão'}
                </div>
                <div className={styles.tierDesc}>{tier.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tamanhos */}
        <div id="tamanhos" className={styles.sizesSection}>
          <span className={styles.tag}>GRADE DE MEDIDAS</span>
          <div className={styles.sizesBlock}>
          <h3 className={styles.sizesTitle}>Tamanhos Disponíveis</h3>
          <div className={styles.sizesGrid}>
            <div className={styles.sizeGroup}>
              <div className={styles.sizeGroupLabel}>Adulto (PP–GG)</div>
              <div className={styles.sizes}>
                {['PP', 'P', 'M', 'G', 'GG'].map((s) => (
                  <span key={s} className={styles.size}>{s}</span>
                ))}
              </div>
            </div>
            <div className={styles.sizeGroup}>
              <div className={styles.sizeGroupLabel}>Plus Size (XG–EXG)</div>
              <div className={styles.sizes}>
                {['XG', 'EXG', '1G', '2G', '3G'].map((s) => (
                  <span key={s} className={`${styles.size} ${styles.sizePlus}`}>{s}</span>
                ))}
              </div>
            </div>
            <div className={styles.sizeGroup}>
              <div className={styles.sizeGroupLabel}>Infantil (1–16)</div>
              <div className={styles.sizes}>
                {['1', '2', '4', '6', '8', '10', '12', '14', '16'].map((s) => (
                  <span key={s} className={`${styles.size} ${styles.sizeKids}`}>{s}</span>
                ))}
              </div>
            </div>
            <div className={styles.sizeGroup}>
              <div className={styles.sizeGroupLabel}>Numérico (36–46)</div>
              <div className={styles.sizes}>
                {['36', '38', '40', '42', '44', '46'].map((s) => (
                  <span key={s} className={styles.size}>{s}</span>
                ))}
              </div>
            </div>
          </div>
          <p className={styles.sizesNote}>
            * Disponibilidade por tamanho varia por modelo. Consulte via WhatsApp para grade completa.
          </p>
          </div>
        </div>
      </div>
    </section>
  );
}

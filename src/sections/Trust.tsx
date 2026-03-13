import { COMPANY_INFO } from '@/data/business-rules';
import styles from './Trust.module.css';

const waHref = `https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent(
  'Olá! Gostaria de falar com a AR Jeans.'
)}`;

export function Trust() {
  return (
    <section id="confianca" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.tag}>CONFIANÇA & TRANSPARÊNCIA</span>
          <h2 className={styles.title}>Operação Real, Atendimento Direto</h2>
          <p className={styles.subtitle}>
            Loja física em São Paulo, CNPJ ativo e atendimento personalizado
            pelo WhatsApp. Sem intermediários, sem surpresas.
          </p>
        </div>

        <div className={styles.badges}>
          {[
            { icon: '✅', title: 'CNPJ Ativo', desc: COMPANY_INFO.cnpj },
            { icon: '📍', title: 'Loja Física', desc: 'São Paulo – SP' },
            { icon: '💬', title: 'WhatsApp', desc: 'Atendimento direto' },
            { icon: '🔄', title: 'Política de Troca', desc: '7 dias corridos' },
            { icon: '🏭', title: 'Atacado Real', desc: 'Para lojistas' },
            { icon: '📸', title: 'Instagram', desc: '@arjeans_oficial' },
          ].map((b) => (
            <div key={b.title} className={styles.badge}>
              <span className={styles.badgeIcon}>{b.icon}</span>
              <strong className={styles.badgeTitle}>{b.title}</strong>
              <span className={styles.badgeDesc}>{b.desc}</span>
            </div>
          ))}
        </div>

        <div className={styles.details}>
          {/* Institucional */}
          <div className={styles.detail}>
            <h3 className={styles.detailTitle}>📋 Dados Institucionais</h3>
            <ul className={styles.detailList}>
              <li><strong>Razão social:</strong> AR Jeans</li>
              <li><strong>CNPJ:</strong> {COMPANY_INFO.cnpj}</li>
              <li><strong>Endereço:</strong> {COMPANY_INFO.addressFull}</li>
              <li><strong>Telefone/WhatsApp:</strong> {COMPANY_INFO.whatsapp}</li>
              <li><strong>Instagram:</strong> @{COMPANY_INFO.instagram}</li>
              <li><strong>Horário:</strong> {COMPANY_INFO.serviceHours}</li>
            </ul>
          </div>

          {/* Política de troca */}
          <div className={styles.detail}>
            <h3 className={styles.detailTitle}>🔄 Política de Troca e Devolução</h3>
            <p className={styles.detailText}>{COMPANY_INFO.exchangePolicy}</p>
            <p className={styles.detailText}>
              Para acionar a política de troca, entre em contato pelo WhatsApp com a nota fiscal
              e fotos das peças.
            </p>
          </div>

          {/* Atendimento */}
          <div className={styles.detail}>
            <h3 className={styles.detailTitle}>💬 Atendimento</h3>
            <p className={styles.detailText}>
              Todo o atendimento é feito pelo WhatsApp. Envie sua lista de peças,
              tire dúvidas sobre tamanhos, disponibilidade e pagamento — e receba
              confirmação rápida.
            </p>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.detailCta}
            >
              Falar no WhatsApp agora →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

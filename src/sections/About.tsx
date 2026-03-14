import { useReveal } from '@/hooks/useReveal';
import { COMPANY_INFO } from '@/data/business-rules';
import styles from './About.module.css';

export function About() {
  const { ref: sectionRef, revealed } = useReveal<HTMLElement>();
  const [weekHours = '', saturdayHours = ''] = COMPANY_INFO.serviceHours
    .split('·')
    .map((part) => part.trim());
  const [addressLine1 = '', ...addressRest] = COMPANY_INFO.addressFull
    .split('–')
    .map((part) => part.trim());
  const addressLine2 = addressRest.join(' – ');

  return (
    <section id="sobre" ref={sectionRef} className={`${styles.section} reveal ${revealed ? 'revealed' : ''}`}>
      <div className={styles.container}>
        <div className={styles.text}>
          <span className={styles.tag}>SOBRE A MARCA</span>
          <h2 className={styles.title}>AR Jeans</h2>
          <p className={styles.lead}>
            Há anos no mercado têxtil, a AR Jeans é uma operação real com loja física,
            catálogo completo e atendimento personalizado para lojistas e consumidores
            de todo o Brasil.
          </p>
          <p className={styles.body}>
            Especializada em moda jeans e casual para feminino, masculino e infantil,
            a AR Jeans combina qualidade de tecido, variedade de modelos e agilidade no atendimento.
            Cada peça do catálogo é pensada para giro rápido — tanto no varejo quanto no atacado.
          </p>
          <p className={styles.body}>
            Nosso diferencial é a simplicidade: você navega pelo catálogo, escolhe as peças
            e finaliza direto pelo WhatsApp. Sem burocracia, sem intermediários.
          </p>

          <div className={styles.pillars}>
            {[
              { icon: '🏪', title: 'Loja Física', desc: 'Presença em São Paulo com atendimento pessoal' },
              { icon: '🏷️', title: 'Atacado Real', desc: 'Estrutura para lojistas e revendedores' },
              { icon: '🎯', title: 'Catálogo Amplo', desc: '66+ modelos feminino, masculino e infantil' },
              { icon: '📱', title: 'Pedido Simples', desc: 'Direto pelo WhatsApp, sem complicação' },
            ].map((p) => (
              <div key={p.title} className={styles.pillar}>
                <span className={styles.pillarIcon}>{p.icon}</span>
                <div>
                  <strong>{p.title}</strong>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.aside}>
          <div className={styles.infoCard}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>CNPJ</span>
              <span className={styles.infoValue}>{COMPANY_INFO.cnpj}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Endereço</span>
              <span className={styles.infoValue}>
                <span className={styles.infoLine}>{addressLine1}</span>
                {addressLine2 && <span className={styles.infoLine}>{addressLine2}</span>}
              </span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>WhatsApp</span>
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.infoLink}
              >
                {COMPANY_INFO.whatsapp}
              </a>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Instagram</span>
              <a
                href={COMPANY_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.infoLink}
              >
                @{COMPANY_INFO.instagram}
              </a>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Atendimento</span>
              <span className={styles.infoValue}>
                <span className={styles.hoursLine}>{weekHours}</span>
                <span className={styles.hoursLine}>{saturdayHours}</span>
              </span>
            </div>
          </div>

          <a
            href={COMPANY_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.instaCard}
          >
            <div className={styles.instaIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>
            <div>
              <strong>Ver coleção no Instagram</strong>
              <p>@{COMPANY_INFO.instagram}</p>
            </div>
            <span className={styles.instaArrow}>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

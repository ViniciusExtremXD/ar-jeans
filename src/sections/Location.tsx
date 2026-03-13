import { COMPANY_INFO } from '@/data/business-rules';
import styles from './Location.module.css';

export function Location() {
  return (
    <section id="localizacao" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.info}>
          <span className={styles.tag}>ONDE ESTAMOS</span>
          <h2 className={styles.title}>Nossa Loja</h2>
          <p className={styles.address}>{COMPANY_INFO.addressFull}</p>
          <p className={styles.hours}>{COMPANY_INFO.serviceHours}</p>

          <div className={styles.actions}>
            <a
              href={COMPANY_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnPrimary}
            >
              📍 Como Chegar
            </a>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent(
                'Olá! Gostaria de saber mais sobre o horário de visita à loja.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnSecondary}
            >
              💬 Falar no WhatsApp
            </a>
          </div>

          <div className={styles.note}>
            <p>
              💡 Atendemos presencialmente na loja e remotamente pelo WhatsApp.
              Para atacado, recomendamos agendar visita pelo WhatsApp com antecedência.
            </p>
          </div>
        </div>

        <div className={styles.mapWrap}>
          <iframe
            title="Localização AR Jeans — Rua Xavantes, 719, São Paulo"
            className={styles.map}
            src={COMPANY_INFO.mapsEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}

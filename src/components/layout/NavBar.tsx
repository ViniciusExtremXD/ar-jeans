import { useEffect, useState, useCallback } from 'react';
import { COMPANY_INFO } from '@/data/business-rules';
import { sendToWhatsApp } from '@/utils/whatsapp';
import { scrollToSection } from '@/utils/scroll';
import styles from './NavBar.module.css';

interface NavLink {
  label: string;
  anchor: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Coleção', anchor: 'catalogo' },
  { label: 'Atacado', anchor: 'atacado-varejo' },
  { label: 'Tamanhos', anchor: 'tamanhos' },
  { label: 'FAQ', anchor: 'faq' },
  { label: 'Localização', anchor: 'localizacao' },
  { label: 'Contato', anchor: 'contato' },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleLink = useCallback((anchor: string) => {
    setMenuOpen(false);

    if (anchor === 'atacado-varejo' || anchor === 'tamanhos') {
      window.dispatchEvent(new CustomEvent('ar:open-wholesale'));
    }

    scrollToSection(anchor);
  }, []);

  const handleWhatsApp = useCallback(() => {
    sendToWhatsApp('Olá! Gostaria de mais informações sobre os produtos AR Jeans.');
  }, []);

  return (
    <header data-sticky-header="true" className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        {/* Logo */}
        <button
          className={styles.logo}
          type="button"
          onClick={() => scrollToSection('topo', { extraOffset: 0 })}
          aria-label="AR Jeans — início"
        >
          <span className={styles.logoAR}>AR</span>
          <span className={styles.logoSep}> | </span>
          <span className={styles.logoJeans}>Jeans</span>
        </button>

        {/* Desktop nav */}
        <nav className={styles.nav} aria-label="Navegação principal">
          {NAV_LINKS.map((link) => (
            <button
              key={link.anchor + link.label}
              type="button"
              className={styles.navLink}
              onClick={() => handleLink(link.anchor)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className={styles.ctas}>
          <a
            href={COMPANY_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.instaBtn}
            aria-label="Instagram AR Jeans"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            @arjeans_oficial
          </a>
          <button type="button" className={styles.whatsBtn} onClick={handleWhatsApp}>
            Pedir via WhatsApp
          </button>
        </div>

        {/* Hamburger */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={styles.mobileMenu} role="dialog" aria-label="Menu mobile">
          <div className={styles.mobileLinks}>
            {NAV_LINKS.map((link) => (
              <button
                key={link.anchor + link.label}
                type="button"
                className={styles.mobileLink}
                onClick={() => handleLink(link.anchor)}
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className={styles.mobileCtas}>
            <a
              href={COMPANY_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobileInsta}
              onClick={() => setMenuOpen(false)}
            >
              Ver Instagram →
            </a>
            <button
              type="button"
              className={styles.mobileWhats}
              onClick={() => { setMenuOpen(false); handleWhatsApp(); }}
            >
              Pedir via WhatsApp
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

import { useEffect, useState } from 'react';
import { scrollToSection } from '@/utils/scroll';
import styles from './BackToTop.module.css';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let triggerPoint = Number.POSITIVE_INFINITY;

    const syncVisibility = () => {
      setVisible(window.scrollY >= triggerPoint);
    };

    const updateTriggerPoint = () => {
      const catalog = document.getElementById('catalogo');
      if (!catalog) {
        triggerPoint = Number.POSITIVE_INFINITY;
        setVisible(false);
        return;
      }

      const catalogTop = catalog.getBoundingClientRect().top + window.scrollY;
      const catalogHeight = Math.max(catalog.offsetHeight, catalog.scrollHeight, catalog.clientHeight);
      triggerPoint = catalogTop + (catalogHeight / 5);
      syncVisibility();
    };

    updateTriggerPoint();
    window.addEventListener('scroll', syncVisibility, { passive: true });
    window.addEventListener('resize', updateTriggerPoint);
    window.addEventListener('load', updateTriggerPoint);

    return () => {
      window.removeEventListener('scroll', syncVisibility);
      window.removeEventListener('resize', updateTriggerPoint);
      window.removeEventListener('load', updateTriggerPoint);
    };
  }, []);

  const handleClick = () => {
    scrollToSection('catalogo');
  };

  return (
    <button
      type="button"
      className={`${styles.btn} ${visible ? styles.visible : ''}`}
      onClick={handleClick}
      aria-label="Voltar ao inicio do catalogo"
      tabIndex={visible ? 0 : -1}
    >
      ↑
    </button>
  );
}

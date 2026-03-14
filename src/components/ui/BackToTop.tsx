import { useEffect, useState } from 'react';
import { scrollToSection } from '@/utils/scroll';
import styles from './BackToTop.module.css';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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

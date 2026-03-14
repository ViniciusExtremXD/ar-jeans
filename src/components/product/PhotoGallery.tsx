import { useState, useCallback } from 'react';
import type { ProductColor } from '@/types/product';
import { asset } from '@/utils/asset';
import { Badge } from '@/components/ui/Badge';
import type { Badge as BadgeType } from '@/types/product';
import styles from './PhotoGallery.module.css';

interface Props {
  color: ProductColor;
  badges?: BadgeType[];
  reference?: string;
  activePhotoIndex: number;
  onPhotoChange: (index: number) => void;
}

export function PhotoGallery({
  color,
  badges = [],
  activePhotoIndex,
  onPhotoChange,
}: Props) {
  const [fading, setFading] = useState(false);
  const photos = color.photos;
  const current = photos[activePhotoIndex] ?? photos[0];

  const switchPhoto = useCallback((index: number) => {
    if (index === activePhotoIndex) return;

    setFading(true);
    window.setTimeout(() => {
      onPhotoChange(index);
      setFading(false);
    }, 160);
  }, [activePhotoIndex, onPhotoChange]);

  return (
    <div className={styles.gallery}>
      <div className={styles.shapeTop} />
      <div className={styles.shapeBottom} />
      <div className={styles.shapeRing} />
      <div className={styles.shapeDots} />

      <div className={styles.logo}>
        <div className={styles.logoAR}>
          <span>A</span>R
        </div>
        <div className={styles.logoSub}>Jeans</div>
      </div>

      <div className={styles.mainWrap}>
        {current && (
          <img
            className={`${styles.mainPhoto} ${fading ? styles.fading : ''}`}
            src={asset(current.src)}
            alt={current.alt}
          />
        )}
      </div>

      {photos.length > 1 && (
        <div className={styles.thumbs}>
          {photos.map((photo, index) => (
            <button
              key={index}
              className={`${styles.thumb} ${index === activePhotoIndex ? styles.thumbActive : ''}`}
              onClick={() => switchPhoto(index)}
              type="button"
            >
              <img src={asset(photo.src)} alt={photo.label} />
              <span className={styles.thumbLabel}>{photo.label}</span>
            </button>
          ))}
        </div>
      )}

      {badges.length > 0 && (
        <div className={styles.badgeWrap}>
          {badges.map((badge, index) => (
            <Badge key={index} badge={badge} />
          ))}
        </div>
      )}

      <div className={styles.catalogLabel}>Coleção Inverno</div>
    </div>
  );
}

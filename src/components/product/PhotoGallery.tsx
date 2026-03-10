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
  reference,
  activePhotoIndex,
  onPhotoChange,
}: Props) {
  const [fading, setFading] = useState(false);
  const photos = color.photos;
  const current = photos[activePhotoIndex] ?? photos[0];

  const switchPhoto = useCallback(
    (index: number) => {
      if (index === activePhotoIndex) return;
      setFading(true);
      setTimeout(() => {
        onPhotoChange(index);
        setFading(false);
      }, 160);
    },
    [activePhotoIndex, onPhotoChange]
  );

  return (
    <div className={styles.gallery}>
      {/* Decorative shapes */}
      <div className={styles.shapeTop} />
      <div className={styles.shapeBottom} />
      <div className={styles.shapeRing} />
      <div className={styles.shapeDots} />

      {/* Logo */}
      <div className={styles.logo}>
        <div className={styles.logoAR}>
          <span>A</span>R
        </div>
        <div className={styles.logoSub}>Jeans</div>
      </div>

      {/* Main photo */}
      <div className={styles.mainWrap}>
        {current && (
          <img
            className={`${styles.mainPhoto} ${fading ? styles.fading : ''}`}
            src={asset(current.src)}
            alt={current.alt}
          />
        )}
      </div>

      {/* Thumbnails */}
      {photos.length > 1 && (
        <div className={styles.thumbs}>
          {photos.map((photo, i) => (
            <button
              key={i}
              className={`${styles.thumb} ${
                i === activePhotoIndex ? styles.thumbActive : ''
              }`}
              onClick={() => switchPhoto(i)}
              type="button"
            >
              <img src={asset(photo.src)} alt={photo.label} />
              <span className={styles.thumbLabel}>{photo.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Badges */}
      {badges.length > 0 && (
        <div className={styles.badgeWrap}>
          {badges.map((b, i) => (
            <Badge key={i} badge={b} />
          ))}
        </div>
      )}

      {/* Page number & label */}
      {reference && <div className={styles.pageNumber}>01</div>}
      <div className={styles.catalogLabel}>Catálogo Digital</div>
    </div>
  );
}

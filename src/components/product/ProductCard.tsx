import type { Product } from '@/types/product';
import { formatCurrency } from '@/utils/format';
import { asset } from '@/utils/asset';
import { Badge } from '@/components/ui/Badge';
import styles from './ProductCard.module.css';

interface Props {
  product: Product;
  onClick: () => void;
}

export function ProductCard({ product, onClick }: Props) {
  const firstColor = product.colors[0];
  const photo = firstColor?.photos[0];

  const audienceMap: Record<string, string> = {
    feminino: 'Fem',
    masculino: 'Masc',
    infantil: 'Infantil',
    unissex: 'Unissex',
  };

  return (
    <button className={styles.card} onClick={onClick} type="button">
      <div className={styles.imageWrap}>
        {photo && (
          <img
            className={styles.image}
            src={asset(photo.src)}
            alt={photo.alt}
            loading="lazy"
          />
        )}
        <div className={styles.badges}>
          {product.isNew && (
            <span className={styles.badgeNew}>Novo</span>
          )}
          {product.featured && (
            <span className={styles.badgeFeatured}>Destaque</span>
          )}
          {product.badges.map((b, i) => (
            <Badge key={i} badge={b} />
          ))}
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.typeRow}>
          <span className={styles.type}>{product.typeLabel}</span>
          {product.audience !== 'unissex' && (
            <span className={styles.audience}>{audienceMap[product.audience] ?? product.audience}</span>
          )}
        </div>
        <h3 className={styles.name}>{product.name}</h3>
        {product.shortDescription && (
          <p className={styles.desc}>{product.shortDescription}</p>
        )}
        <div className={styles.catalogMeta}>
          <span>{product.categoryLabel}</span>
          <span>{product.reference}</span>
        </div>
        <div className={styles.meta}>
          <span className={styles.price}>
            {formatCurrency(product.basePrice)}
          </span>
          <span className={styles.colors}>
            {product.colors.length} cor{product.colors.length > 1 ? 'es' : ''}
          </span>
        </div>
        <div className={styles.commercial}>
          <span className={styles.commercialTag}>Varejo</span>
          <span className={styles.commercialTag}>Atacado</span>
        </div>
        <span className={styles.cta}>
          {product.featured ? 'Destaque · Ver Detalhes →' : 'Ver Detalhes →'}
        </span>
      </div>
    </button>
  );
}

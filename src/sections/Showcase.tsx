import type { Product } from '@/types/product';
import { getActiveProducts } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import styles from './Showcase.module.css';

interface Props {
  onProductSelect: (productId: string) => void;
}

export function Showcase({ onProductSelect }: Props) {
  const products = getActiveProducts();

  return (
    <section className={styles.showcase}>
      <div className={styles.header}>
        <span className={styles.tag}>COLEÇÃO</span>
        <h2 className={styles.title}>Nossas Peças</h2>
        <p className={styles.subtitle}>
          Selecione um modelo para montar seu pedido no atacado
        </p>
      </div>

      <div className={styles.grid}>
        {products.map((product: Product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => onProductSelect(product.id)}
          />
        ))}
      </div>
    </section>
  );
}

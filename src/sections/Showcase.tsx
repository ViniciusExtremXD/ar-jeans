import { useEffect, useMemo, useState } from 'react';
import type { Product } from '@/types/product';
import { getActiveProducts } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { CatalogFilters } from '@/components/catalog/CatalogFilters';
import {
  DEFAULT_CATALOG_FILTERS,
  buildCatalogFilterOptions,
  filterCatalogProducts,
  sortCatalogProducts,
} from '@/utils/catalog';
import { trackEvent } from '@/utils/analytics';
import styles from './Showcase.module.css';

interface Props {
  onProductSelect: (productId: string) => void;
}

export function Showcase({ onProductSelect }: Props) {
  const products = useMemo(() => getActiveProducts(), []);
  const [filters, setFilters] = useState(DEFAULT_CATALOG_FILTERS);

  const allOptions = useMemo(() => buildCatalogFilterOptions(products), [products]);

  const visibleSubcategories = useMemo(() => {
    if (filters.category === 'all') return allOptions.subcategories;

    const map = new Map<string, string>();
    products
      .filter((p) => p.category === filters.category)
      .forEach((p) => map.set(p.subcategory, p.subcategoryLabel));

    return Array.from(map.entries())
      .map(([value, label]) => ({ value, label }))
      .sort((a, b) => a.label.localeCompare(b.label, 'pt-BR'));
  }, [products, allOptions.subcategories, filters.category]);

  const visibleTypes = useMemo(() => {
    const map = new Map<string, string>();

    products
      .filter((p) => (filters.category === 'all' ? true : p.category === filters.category))
      .filter((p) => (filters.subcategory === 'all' ? true : p.subcategory === filters.subcategory))
      .forEach((p) => map.set(p.type, p.typeLabel));

    return Array.from(map.entries())
      .map(([value, label]) => ({ value, label }))
      .sort((a, b) => a.label.localeCompare(b.label, 'pt-BR'));
  }, [products, filters.category, filters.subcategory]);

  const filteredProducts = useMemo(
    () => sortCatalogProducts(filterCatalogProducts(products, filters)),
    [products, filters]
  );

  useEffect(() => {
    const query = filters.query.trim();
    if (query.length < 2) return;

    const timer = window.setTimeout(() => {
      trackEvent('catalog_search', { query, results: filteredProducts.length });
    }, 350);

    return () => window.clearTimeout(timer);
  }, [filters.query, filteredProducts.length]);

  function changeCategory(category: string) {
    setFilters((prev) => ({
      ...prev,
      category,
      subcategory: 'all',
      type: 'all',
    }));
    trackEvent('catalog_filter_category', { category });
  }

  function changeSubcategory(subcategory: string) {
    setFilters((prev) => ({ ...prev, subcategory, type: 'all' }));
    trackEvent('catalog_filter_subcategory', { subcategory });
  }

  function changeType(type: string) {
    setFilters((prev) => ({ ...prev, type }));
    trackEvent('catalog_filter_type', { type });
  }

  function clearFilters() {
    setFilters(DEFAULT_CATALOG_FILTERS);
    trackEvent('catalog_filter_clear', {});
  }

  const activeCategoryLabel =
    filters.category === 'all'
      ? 'Todos os produtos'
      : products.find((p) => p.category === filters.category)?.categoryLabel ?? 'Todos os produtos';

  return (
    <section className={styles.showcase}>
      <div className={styles.header}>
        <span className={styles.tag}>COLEÇÃO</span>
        <h2 className={styles.title}>Catálogo Completo</h2>
        <p className={styles.subtitle}>
          Navegue por categoria, subcategoria e tipo para montar seu pedido
        </p>
      </div>

      <CatalogFilters
        categories={allOptions.categories}
        subcategories={visibleSubcategories}
        types={visibleTypes}
        selectedCategory={filters.category}
        selectedSubcategory={filters.subcategory}
        selectedType={filters.type}
        query={filters.query}
        totalResults={filteredProducts.length}
        onCategoryChange={changeCategory}
        onSubcategoryChange={changeSubcategory}
        onTypeChange={changeType}
        onQueryChange={(query) => setFilters((prev) => ({ ...prev, query }))}
        onClear={clearFilters}
      />

      <div className={styles.metaBar}>
        <span className={styles.breadcrumb}>{activeCategoryLabel}</span>
        <span className={styles.counter}>{filteredProducts.length} itens</span>
      </div>

      <div className={styles.grid}>
        {filteredProducts.map((product: Product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => {
              trackEvent('catalog_product_click', {
                productId: product.id,
                category: product.category,
                subcategory: product.subcategory,
              });

              if (
                filters.category !== 'all' ||
                filters.subcategory !== 'all' ||
                filters.type !== 'all' ||
                filters.query.trim().length > 0
              ) {
                trackEvent('catalog_product_open_after_filter', {
                  productId: product.id,
                  category: filters.category,
                  subcategory: filters.subcategory,
                  type: filters.type,
                });
              }

              trackEvent('product_view', { productId: product.id });
              onProductSelect(product.id);
            }}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className={styles.emptyState}>
          Nenhum produto encontrado com os filtros atuais.
        </div>
      )}
    </section>
  );
}

import type { Product } from '@/types/product';

export interface CatalogFilterState {
  category: string;
  subcategory: string;
  type: string;
  query: string;
}

export interface CatalogFilterOptions {
  categories: Array<{ value: string; label: string }>;
  subcategories: Array<{ value: string; label: string }>;
  types: Array<{ value: string; label: string }>;
}

export const DEFAULT_CATALOG_FILTERS: CatalogFilterState = {
  category: 'all',
  subcategory: 'all',
  type: 'all',
  query: '',
};

function uniqueSortedOptions(items: Array<{ value: string; label: string }>) {
  const map = new Map<string, string>();
  items.forEach((item) => {
    if (!map.has(item.value)) map.set(item.value, item.label);
  });
  return Array.from(map.entries())
    .map(([value, label]) => ({ value, label }))
    .sort((a, b) => a.label.localeCompare(b.label, 'pt-BR'));
}

export function buildCatalogFilterOptions(products: Product[]): CatalogFilterOptions {
  return {
    categories: uniqueSortedOptions(
      products.map((p) => ({ value: p.category, label: p.categoryLabel }))
    ),
    subcategories: uniqueSortedOptions(
      products.map((p) => ({ value: p.subcategory, label: p.subcategoryLabel }))
    ),
    types: uniqueSortedOptions(
      products.map((p) => ({ value: p.type, label: p.typeLabel }))
    ),
  };
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function filterCatalogProducts(products: Product[], filters: CatalogFilterState): Product[] {
  const query = normalize(filters.query.trim());

  return products.filter((product) => {
    if (filters.category !== 'all' && product.category !== filters.category) return false;
    if (filters.subcategory !== 'all' && product.subcategory !== filters.subcategory) return false;
    if (filters.type !== 'all' && product.type !== filters.type) return false;

    if (!query) return true;

    const searchable = [
      product.name,
      product.reference,
      product.sku,
      product.typeLabel,
      product.categoryLabel,
      product.subcategoryLabel,
      ...product.tags,
      ...product.searchTokens,
    ]
      .join(' ')
      .toLowerCase();

    return normalize(searchable).includes(query);
  });
}

export function sortCatalogProducts(products: Product[]): Product[] {
  return [...products].sort((a, b) => {
    const featuredDelta = Number(b.featured) - Number(a.featured);
    if (featuredDelta !== 0) return featuredDelta;

    const orderDelta = (a.sortOrder ?? a.order) - (b.sortOrder ?? b.order);
    if (orderDelta !== 0) return orderDelta;

    return a.name.localeCompare(b.name, 'pt-BR');
  });
}

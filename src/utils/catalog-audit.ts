import { CATALOG_RAW_ITEMS } from '@/data/catalog-raw';
import { PRODUCTS } from '@/data/products';

export interface CatalogAuditSummary {
  rawItems: number;
  finalProducts: number;
  removedItems: number;
  duplicateRawSignatures: number;
  productsWithMissingPhotos: number;
}

function signature(item: (typeof CATALOG_RAW_ITEMS)[number]): string {
  return [item.name, item.price, item.category, item.subcategory].join('|');
}

export function buildCatalogAuditSummary(): CatalogAuditSummary {
  const signatureMap = new Map<string, number>();

  CATALOG_RAW_ITEMS.forEach((item) => {
    const key = signature(item);
    signatureMap.set(key, (signatureMap.get(key) ?? 0) + 1);
  });

  const duplicateRawSignatures = Array.from(signatureMap.values()).filter((count) => count > 1).length;

  const productsWithMissingPhotos = PRODUCTS.filter((product) =>
    product.colors.some((color) => color.photos.length === 0)
  ).length;

  return {
    rawItems: CATALOG_RAW_ITEMS.length,
    finalProducts: PRODUCTS.length,
    removedItems: CATALOG_RAW_ITEMS.length - PRODUCTS.length,
    duplicateRawSignatures,
    productsWithMissingPhotos,
  };
}

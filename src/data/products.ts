import type { Product, ProductColor } from '@/types/product';
import { CATALOG_RAW_ITEMS } from './catalog-raw';

const CATALOG_ASSET_ROOT = '/assets/products/catalog';

const FEATURED_PAGES = new Set([6, 11, 12, 16, 18, 22, 34, 55, 66, 76, 83]);

// Explicit fix for page with masked/buggy render in card thumbnail
const PAGE_IMAGE_OVERRIDES: Record<number, string[]> = {
  62: ['page62-img01.png', 'page62-img05.png', 'page62-img06.png'],
};

function toNumberPrice(value: string): number {
  return Number(value.replace('.', '').replace(',', '.'));
}

function normalizeText(value: string): string {
  return value
    .replace(/\s+/g, ' ')
    .replace(/\b(bb)\b/gi, 'Bebe')
    .replace(/\binf\b/gi, 'Infantil')
    .replace(/\bjuv\b/gi, 'Juvenil')
    .replace(/\bmasc\b/gi, 'Masculino')
    .replace(/\bfem\b/gi, 'Feminina')
    .trim();
}

function normalizeSlug(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function inferType(name: string, subcategory: string): { type: string; typeLabel: string } {
  const lower = name.toLowerCase();

  if (lower.includes('jaqueta') || lower.includes('sobretudo')) {
    return { type: 'jaqueta', typeLabel: 'Jaqueta' };
  }
  if (lower.includes('bermuda')) {
    return { type: 'bermuda', typeLabel: 'Bermuda' };
  }
  if (lower.includes('short')) {
    return { type: 'short', typeLabel: 'Short' };
  }
  if (lower.includes('blusa') || lower.includes('camisa')) {
    return { type: 'blusa', typeLabel: 'Blusa' };
  }
  if (lower.includes('conjunto')) {
    return { type: 'conjunto', typeLabel: 'Conjunto' };
  }
  if (lower.includes('macacao') || lower.includes('jardineira') || subcategory === 'bebe') {
    return { type: 'bebe', typeLabel: 'Bebe' };
  }

  return { type: 'calca', typeLabel: 'Calca' };
}

function inferAudience(category: string): Product['audience'] {
  if (category === 'masculino') return 'masculino';
  if (category === 'feminino' || category === 'feminino-plus-size') return 'feminino';
  return 'infantil';
}

function inferSizes(category: string, type: string): string[] {
  if (category === 'infantil-bebe') return ['1', '2', '4', '6'];
  if (category.startsWith('infantil')) return ['2', '4', '6', '8', '10', '12', '14', '16'];
  if (category === 'feminino-plus-size') return ['48', '50', '52', '54', '56'];
  if (type === 'jaqueta') return ['P', 'M', 'G', 'GG'];
  if (type === 'bermuda' || type === 'short') return ['38', '40', '42', '44', '46'];
  return ['36', '38', '40', '42', '44', '46'];
}

function inferComposition(type: string): string[] {
  if (type === 'blusa' || type === 'conjunto' || type === 'bebe') {
    return ['95% Algodao', '5% Elastano'];
  }
  if (type === 'jaqueta') {
    return ['100% Algodao'];
  }
  if (type === 'bermuda' || type === 'short') {
    return ['98% Algodao', '2% Elastano'];
  }
  return ['74% Algodao', '24% Poliester', '2% Elastano'];
}

function inferColorHex(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes('black') || lower.includes('preto')) return '#1C1C1C';
  if (lower.includes('verde')) return '#4E6B3A';
  if (lower.includes('bege') || lower.includes('caqui')) return '#B39A72';
  if (lower.includes('rosa')) return '#B97A95';
  return '#3D5A9A';
}

function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

function normalizeCategoryLabel(label: string): string {
  return normalizeText(label)
    .replace('Bebe', 'Bebe')
    .replace('Feminino Plus Size', 'Feminino Plus Size');
}

function normalizeSubcategoryLabel(label: string): string {
  return normalizeText(label)
    .replace('Calcas', 'Calcas')
    .replace('Bebe', 'Bebe');
}

function sanitizeImages(page: number, images: string[]): string[] {
  const overridden = PAGE_IMAGE_OVERRIDES[page];
  const source = overridden ?? images;

  return unique(
    source
      .filter((image) => /^page\d{2}-img\d{2}\.(jpeg|png)$/i.test(image))
      .filter((image) => !image.includes('placeholder'))
  );
}

function buildColor(page: number, name: string, images: string[]): ProductColor {
  const colorHex = inferColorHex(name);

  return {
    id: `catalog-p${String(page).padStart(2, '0')}`,
    label: `Catalogo p.${page}`,
    hex: colorHex,
    gradient: `linear-gradient(135deg, ${colorHex}, #1F1F1F)`,
    photos: images.map((filename, index) => ({
      src: `${CATALOG_ASSET_ROOT}/${filename}`,
      label: `Foto ${index + 1}`,
      alt: `${name} - Foto ${index + 1}`,
    })),
  };
}

export const PRODUCTS: Product[] = CATALOG_RAW_ITEMS
  .map((raw, index) => {
    const page = raw.page;
    const normalizedName = normalizeText(raw.name);
    const images = sanitizeImages(page, raw.images);

    if (images.length === 0) {
      return null;
    }

    const { type, typeLabel } = inferType(normalizedName, raw.subcategory);
    const categoryLabel = normalizeCategoryLabel(raw.categoryLabel);
    const subcategoryLabel = normalizeSubcategoryLabel(raw.subcategoryLabel);
    const audience = inferAudience(raw.category);

    const id = `catalog-p${String(page).padStart(3, '0')}-${normalizeSlug(normalizedName)}`;
    const slug = `${normalizeSlug(normalizedName)}-p${String(page).padStart(3, '0')}`;
    const sku = `CAT-${String(page).padStart(3, '0')}`;
    const reference = `#${sku}`;
    const featured = FEATURED_PAGES.has(page);

    const tags = unique([
      raw.category,
      raw.subcategory,
      type,
      audience,
      ...normalizedName.toLowerCase().split(/\s+/).filter(Boolean),
      sku.toLowerCase(),
    ]);

    const searchTokens = unique([
      ...tags,
      ...normalizeSlug(normalizedName).split('-').filter(Boolean),
      `pagina-${page}`,
      `p${page}`,
      sku.toLowerCase(),
    ]);

    const baseDescription = `${typeLabel} · ${subcategoryLabel} · ${categoryLabel}`;

    return {
      id,
      type,
      typeLabel,
      name: normalizedName,
      slug,
      shortDescription: baseDescription,
      commercialDescription:
        `${normalizedName} com modelagem comercial da AR Jeans. ` +
        `Item da colecao com foco em varejo e atacado.`,
      collection: 'inverno-2025',
      collectionLabel: 'Colecao Inverno 2025',
      reference,
      sku,
      catalogPage: page,
      category: raw.category,
      categoryLabel,
      subcategory: raw.subcategory,
      subcategoryLabel,
      audience,
      tags,
      isNew: featured,
      colors: [buildColor(page, normalizedName, images)],
      sizes: inferSizes(raw.category, type),
      basePrice: toNumberPrice(raw.price),
      composition: inferComposition(type),
      features: unique([typeLabel, subcategoryLabel, categoryLabel]),
      badges: featured
        ? [{ text: 'Destaque', icon: '⭐', variant: 'gold' }]
        : [{ text: categoryLabel, icon: '👖', variant: 'dark' }],
      featured,
      active: true,
      sortOrder: index + 1,
      order: index + 1,
      searchTokens,
    } as Product;
  })
  .filter((product): product is Product => product !== null)
  .sort((a, b) => a.catalogPage - b.catalogPage);

export function getActiveProducts(): Product[] {
  return PRODUCTS.filter((product) => product.active).sort(
    (a, b) => (a.sortOrder ?? a.order) - (b.sortOrder ?? b.order)
  );
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((product) => product.id === id);
}

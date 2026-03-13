import type { Product, ProductColor } from '@/types/product';
import { CATALOG_RAW_ITEMS } from './catalog-raw';

const CAT = '/assets/products/catalog';

const PAGE_NAME_OVERRIDES: Record<number, string> = {
  36: 'Sobretudo Feminino Juvenil',
  37: 'Sobretudo Feminino Juvenil Com Capuz',
  44: 'Calça Mom Rasgos',
};

const LEGACY_ID_BY_PAGE: Record<number, string> = {
  9: 'calca-regular-009',
  10: 'calca-social-010',
  11: 'calca-skinny-011',
  12: 'calca-wideleg-cargo-012',
  14: 'wide-leg-jeans-014',
  16: 'jaqueta-resinada-016',
  17: 'jaqueta-jeans-black-017',
  22: 'short-brilho-022',
  23: 'bermuda-social-023',
  25: 'short-cargo-025',
};

const FEATURED_PAGES = new Set([6, 9, 11, 12, 16, 18, 22, 34, 66, 76, 83]);

function toNumberPrice(value: string): number {
  return Number(value.replace('.', '').replace(',', '.'));
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function normalizedName(name: string, page: number): string {
  const base = PAGE_NAME_OVERRIDES[page] ?? name;
  return base
    .replace(/\s+/g, ' ')
    .replace(/\b(bb)\b/gi, 'Bebê')
    .replace(/\binf\b/gi, 'Infantil')
    .replace(/\bjuv\b/gi, 'Juvenil')
    .replace(/\bmasc\b/gi, 'Masculino')
    .replace(/\bfem\b/gi, 'Feminina')
    .trim();
}

function inferType(name: string): { type: string; label: string } {
  const lower = name.toLowerCase();
  if (lower.includes('jaqueta') || lower.includes('sobretudo')) return { type: 'jaqueta', label: 'Jaqueta' };
  if (lower.includes('bermuda')) return { type: 'bermuda', label: 'Bermuda' };
  if (lower.includes('short')) return { type: 'short', label: 'Short' };
  if (lower.includes('blusa') || lower.includes('camisa')) return { type: 'blusa', label: 'Blusa' };
  if (lower.includes('vestido')) return { type: 'vestido', label: 'Vestido' };
  if (lower.includes('macacao') || lower.includes('macacão') || lower.includes('jardineira')) {
    return { type: 'conjunto', label: 'Conjunto' };
  }
  return { type: 'calca', label: 'Calça' };
}

function inferSizes(audience: string, subcategory: string, type: string): string[] {
  if (audience === 'infantil') return ['2', '4', '6', '8', '10', '12', '14', '16'];
  if (subcategory === 'calcas-plus') return ['48', '50', '52', '54', '56'];
  if (type === 'jaqueta') return ['P', 'M', 'G', 'GG'];
  if (type === 'bermuda' || type === 'short') return ['38', '40', '42', '44', '46'];
  return ['36', '38', '40', '42', '44', '46'];
}

function inferComposition(type: string): string[] {
  if (type === 'blusa' || type === 'conjunto' || type === 'vestido') return ['95% Algodão', '5% Elastano'];
  if (type === 'jaqueta') return ['100% Algodão'];
  if (type === 'bermuda' || type === 'short') return ['98% Algodão', '2% Elastano'];
  return ['74% Algodão', '24% Poliéster', '2% Elastano'];
}

function inferColorHex(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes('black') || lower.includes('preto')) return '#1C1C1C';
  if (lower.includes('verde')) return '#4E6B3A';
  if (lower.includes('bege') || lower.includes('caqui')) return '#B39A72';
  if (lower.includes('floral')) return '#A37C8A';
  if (lower.includes('xadrez')) return '#9A4B4B';
  return '#3D5A9A';
}

function makeColor(photos: string[], page: number, name: string): ProductColor {
  const hex = inferColorHex(name);
  return {
    id: `catalog-p${String(page).padStart(2, '0')}`,
    label: `Catálogo p.${page}`,
    hex,
    gradient: `linear-gradient(135deg, ${hex}, #1F1F1F)`,
    photos: photos.map((filename, index) => ({
      src: `${CAT}/${filename}`,
      label: `Foto ${index + 1}`,
      alt: `${name} - Foto ${index + 1}`,
    })),
  };
}

function makeShortDescription(typeLabel: string, subcategoryLabel: string, categoryLabel: string): string {
  return `${typeLabel} · ${subcategoryLabel} · ${categoryLabel}`;
}

function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

type Group = {
  name: string;
  category: string;
  categoryLabel: string;
  subcategory: string;
  subcategoryLabel: string;
  audience: string;
  price: string;
  entries: typeof CATALOG_RAW_ITEMS;
};

const grouped = new Map<string, Group>();

for (const item of CATALOG_RAW_ITEMS) {
  const cleanName = normalizedName(item.name, item.page);
  const key = `${cleanName}|${item.price}|${item.category}|${item.subcategory}`;
  const group = grouped.get(key);

  if (group) {
    group.entries.push(item);
  } else {
    grouped.set(key, {
      name: cleanName,
      category: item.category,
      categoryLabel: item.categoryLabel,
      subcategory: item.subcategory,
      subcategoryLabel: item.subcategoryLabel,
      audience: item.audience,
      price: item.price,
      entries: [item],
    });
  }
}

const catalogProducts: Product[] = Array.from(grouped.values())
  .sort((a, b) => a.entries[0]!.page - b.entries[0]!.page)
  .map((group, index) => {
    const firstPage = group.entries[0]!.page;
    const name = group.name;
    const { type, label } = inferType(name);
    const id = LEGACY_ID_BY_PAGE[firstPage] ?? `${slugify(name)}-${String(firstPage).padStart(3, '0')}`;
    const slug = slugify(name);
    const pages = group.entries.map((e) => e.page).sort((a, b) => a - b);
    const colors = group.entries.map((entry) => makeColor(entry.images, entry.page, name));

    const tags = unique([
      group.category,
      group.subcategory,
      type,
      group.audience,
      ...(name.toLowerCase().split(/\s+/).filter(Boolean)),
    ]);

    const searchTokens = unique([
      ...tags,
      ...name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .split(/[^a-z0-9]+/)
        .filter(Boolean),
      `p${firstPage}`,
      `cat-${String(firstPage).padStart(3, '0')}`,
    ]);

    const featured = FEATURED_PAGES.has(firstPage);

    return {
      id,
      type,
      typeLabel: label,
      name,
      slug,
      shortDescription: makeShortDescription(label, group.subcategoryLabel, group.categoryLabel),
      commercialDescription:
        `${name} com modelagem comercial da AR Jeans. Catálogo ${group.categoryLabel} com acabamento ` +
        `pensado para venda em varejo e atacado.`,
      collection: 'inverno-2025',
      collectionLabel: 'Coleção 2025 · AR Jeans',
      reference: `#CAT-${String(firstPage).padStart(3, '0')}`,
      sku: `CAT-${String(firstPage).padStart(3, '0')}`,
      catalogPage: firstPage,
      catalogPages: pages.length > 1 ? pages : undefined,
      category: group.category,
      categoryLabel: group.categoryLabel,
      subcategory: group.subcategory,
      subcategoryLabel: group.subcategoryLabel,
      audience: group.audience as Product['audience'],
      tags,
      isNew: featured,
      colors,
      sizes: inferSizes(group.audience, group.subcategory, type),
      basePrice: toNumberPrice(group.price),
      composition: inferComposition(type),
      features: unique([label, group.subcategoryLabel, group.categoryLabel]),
      badges: featured
        ? [{ text: 'Destaque', icon: '⭐', variant: 'gold' }]
        : [{ text: group.categoryLabel, icon: '👖', variant: 'dark' }],
      featured,
      active: true,
      sortOrder: index + 2,
      order: index + 2,
      searchTokens,
    };
  });

const legacyFlareProduct: Product = {
  id: 'calca-flare-001',
  type: 'calca',
  typeLabel: 'Calça',
  name: 'Calça Flare Jeans',
  slug: 'calca-flare-jeans',
  shortDescription: 'High Waist · Cintura Alta · Modelagem Exclusiva',
  commercialDescription:
    'Calça flare em jeans premium com cintura alta e modelagem exclusiva. Ideal para composições elegantes e confortáveis.',
  collection: 'inverno-2025',
  collectionLabel: 'Coleção 2025 · AR Jeans',
  reference: '#FL001',
  sku: 'FL001',
  catalogPage: 1,
  category: 'feminino',
  categoryLabel: 'Feminino',
  subcategory: 'calcas',
  subcategoryLabel: 'Calças',
  audience: 'feminino',
  tags: ['feminino', 'calcas', 'flare', 'jeans'],
  isNew: true,
  colors: [
    {
      id: 'azul',
      label: 'Azul Escuro',
      hex: '#2C5BA8',
      gradient: 'linear-gradient(135deg, #2C5BA8, #1a3a7a)',
      photos: [
        { src: '/assets/products/calca-flare/azul-frente.jpg', label: 'Frente', alt: 'Calça Flare Azul Escuro - Frente' },
        { src: '/assets/products/calca-flare/azul-pose.jpg', label: 'Pose', alt: 'Calça Flare Azul Escuro - Pose' },
        { src: '/assets/products/calca-flare/azul-lateral.jpg', label: 'Lateral', alt: 'Calça Flare Azul Escuro - Lateral' },
        { src: '/assets/products/calca-flare/azul-detalhe.jpg', label: 'Detalhe', alt: 'Calça Flare Azul Escuro - Detalhe' },
        { src: '/assets/products/calca-flare/azul-detalhe2.jpg', label: 'Detalhe 2', alt: 'Calça Flare Azul Escuro - Detalhe 2' },
        { src: '/assets/products/calca-flare/azul-costas.jpg', label: 'Costas', alt: 'Calça Flare Azul Escuro - Costas' },
      ],
    },
    {
      id: 'black',
      label: 'Black',
      hex: '#1a1a1a',
      gradient: 'linear-gradient(135deg, #2a2a2a, #0a0a0a)',
      photos: [
        { src: '/assets/products/calca-flare/black-frente.jpg', label: 'Frente', alt: 'Calça Flare Black - Frente' },
        { src: '/assets/products/calca-flare/black-pose.jpg', label: 'Pose', alt: 'Calça Flare Black - Pose' },
        { src: '/assets/products/calca-flare/black-lateral.jpg', label: 'Lateral', alt: 'Calça Flare Black - Lateral' },
        { src: '/assets/products/calca-flare/black-detalhe.jpg', label: 'Detalhe', alt: 'Calça Flare Black - Detalhe' },
        { src: '/assets/products/calca-flare/black-detalhe2.jpg', label: 'Detalhe 2', alt: 'Calça Flare Black - Detalhe 2' },
        { src: '/assets/products/calca-flare/black-costas.jpg', label: 'Costas', alt: 'Calça Flare Black - Costas' },
      ],
    },
  ],
  sizes: ['36', '38', '40', '42', '44', '46'],
  basePrice: 69.9,
  composition: ['70% Algodão', '27% Poliéster', '3% Elastano'],
  features: ['Cintura Alta', 'High Waist', 'Modelagem Exclusiva'],
  badges: [
    { text: 'Mais Vendida', icon: '🔥', variant: 'gold' },
    { text: 'Cintura Alta', icon: '✨', variant: 'dark' },
  ],
  featured: true,
  active: true,
  sortOrder: 1,
  order: 1,
  searchTokens: ['calca', 'flare', 'feminino', 'jeans', 'high', 'waist', 'fl001'],
};

export const PRODUCTS: Product[] = [legacyFlareProduct, ...catalogProducts];

export function getActiveProducts(): Product[] {
  return PRODUCTS.filter((p) => p.active).sort((a, b) => (a.sortOrder ?? a.order) - (b.sortOrder ?? b.order));
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

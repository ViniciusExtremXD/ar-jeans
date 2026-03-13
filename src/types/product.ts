/* ══════════════════════════════════════════════
   AR Jeans — Domain Types
   ══════════════════════════════════════════════ */

// ── Product ──

export interface ProductPhoto {
  src: string;
  label: string;
  alt: string;
}

export interface ProductColor {
  id: string;
  label: string;
  hex: string;
  gradient: string;
  photos: ProductPhoto[];
}

export interface Product {
  id: string;
  type: string;
  typeLabel: string;
  name: string;
  slug: string;
  shortDescription: string;
  commercialDescription: string;
  collection: string;
  collectionLabel: string;
  reference: string;
  sku: string;
  catalogPage: number;
  catalogPages?: number[];
  category: string;
  categoryLabel: string;
  subcategory: string;
  subcategoryLabel: string;
  tags: string[];
  audience: 'feminino' | 'masculino' | 'infantil' | 'unissex';
  isNew: boolean;
  colors: ProductColor[];
  sizes: string[];
  basePrice: number;
  composition: string[];
  features: string[];
  badges: Badge[];
  featured: boolean;
  active: boolean;
  sortOrder: number;
  order: number;
  searchTokens: string[];
}

export interface Badge {
  text: string;
  icon: string;
  variant: 'gold' | 'dark';
}

// ── Cart ──

export interface CartItem {
  id: string;
  productId: string;
  colorId: string;
  sizes: Record<string, number>;
}

export interface CartItemComputed extends CartItem {
  product: Product;
  color: ProductColor;
  totalPieces: number;
  unitPrice: number;
  subtotal: number;
}

export interface CartComputed {
  items: CartItemComputed[];
  totalPieces: number;
  subtotalBruto: number;
  discountTier: DiscountTier | null;
  discountPercent: number;
  discountAmount: number;
  totalFinal: number;
  orderType: OrderType;
}

// ── Business Rules ──

export type OrderType = 'varejo' | 'atacado';

export interface DiscountTier {
  minPieces: number;
  maxPieces: number;
  discountPercent: number;
  label: string;
  description: string;
  orderType: OrderType;
}

export interface BusinessRules {
  whatsappNumber: string;
  minOrderPieces: number;
  discountTiers: DiscountTier[];
  collectionName: string;
  brandName: string;
}

// ── Order Selection (product detail form state) ──

export interface OrderSelection {
  selectedColors: Record<string, boolean>;
  quantities: Record<string, Record<string, number>>;
  activeColorTab: string;
}

// ── Analytics ──

export type AnalyticsEvent =
  | 'product_view'
  | 'catalog_filter_category'
  | 'catalog_filter_subcategory'
  | 'catalog_filter_type'
  | 'catalog_filter_clear'
  | 'catalog_search'
  | 'catalog_product_click'
  | 'catalog_product_open_after_filter'
  | 'color_select'
  | 'size_select'
  | 'quantity_change'
  | 'add_to_cart'
  | 'remove_from_cart'
  | 'cart_open'
  | 'whatsapp_click'
  | 'order_submit';

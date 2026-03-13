import type { BusinessRules, DiscountTier, OrderType } from '@/types/product';

// ══════════════════════════════════════════════
// Dados Institucionais da Empresa
// ══════════════════════════════════════════════
export const COMPANY_INFO = {
  name: 'AR Jeans',
  cnpj: '08.159.192/0001-95',
  address: 'Rua Xavantes, 719 – Loja 10',
  city: 'São Paulo – SP, 03027-900',
  addressFull: 'Rua Xavantes, 719 – Loja 10, São Paulo – SP, CEP 03027-900',
  whatsapp: '+55 11 98485-0206',
  whatsappRaw: '5511984850206',
  instagram: 'arjeans_oficial',
  instagramUrl: 'https://instagram.com/arjeans_oficial',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Rua+Xavantes+719+Loja+10+São+Paulo+SP+03027900',
  mapsEmbed:
    'https://www.google.com/maps?q=Rua+Xavantes,+719,+S%C3%A3o+Paulo,+SP,+03027-900&output=embed',
  exchangePolicy:
    'Aceitamos trocas em até 7 dias corridos mediante apresentação da nota fiscal. Peças devem estar sem uso e com etiquetas originais.',
  serviceHours: 'Seg–Sex: 9h–18h · Sáb: 9h–13h',
} as const;

// ══════════════════════════════════════════════
// Faixas de Desconto Progressivo
// ══════════════════════════════════════════════
// Regra centralizada — edite apenas aqui para
// alterar toda a lógica comercial do site.
//
// Modelo varejo + atacado:
//   1-5 pç  → Varejo (preço cheio, sem desconto)
//   6-11 pç → Atacado base (preço de atacado)
//   12-17   → Atacado +10%
//   18+     → Atacado Premium +20%
// Nenhuma faixa bloqueia a compra.
// ══════════════════════════════════════════════

export const WHOLESALE_THRESHOLD = 6;

export const DISCOUNT_TIERS: DiscountTier[] = [
  {
    minPieces: 1,
    maxPieces: 5,
    discountPercent: 0,
    label: 'Varejo',
    description: 'Preço unitário de varejo',
    orderType: 'varejo',
  },
  {
    minPieces: 6,
    maxPieces: 11,
    discountPercent: 0,
    label: 'Atacado',
    description: 'Preço de atacado',
    orderType: 'atacado',
  },
  {
    minPieces: 12,
    maxPieces: 17,
    discountPercent: 10,
    label: 'Atacado +10%',
    description: '10% off a partir de 12 peças',
    orderType: 'atacado',
  },
  {
    minPieces: 18,
    maxPieces: Infinity,
    discountPercent: 20,
    label: 'Atacado Premium',
    description: '20% off a partir de 18 peças',
    orderType: 'atacado',
  },
];

export const BUSINESS_RULES: BusinessRules = {
  whatsappNumber: COMPANY_INFO.whatsappRaw,
  minOrderPieces: 1,
  discountTiers: DISCOUNT_TIERS,
  collectionName: 'Coleção Inverno 2025',
  brandName: 'AR Jeans',
};

/** Retorna a faixa de desconto aplicável para o volume total */
export function getDiscountTier(totalPieces: number): DiscountTier {
  return (
    DISCOUNT_TIERS.find(
      (t) => totalPieces >= t.minPieces && totalPieces <= t.maxPieces
    ) ?? DISCOUNT_TIERS[0]!
  );
}

/** Retorna o tipo de pedido com base no volume */
export function getOrderType(totalPieces: number): OrderType {
  return totalPieces >= WHOLESALE_THRESHOLD ? 'atacado' : 'varejo';
}

/** Calcula desconto sobre subtotal bruto, considerando volume total */
export function calculateDiscount(subtotal: number, totalPieces: number) {
  const tier = getDiscountTier(totalPieces);
  const discountAmount = subtotal * (tier.discountPercent / 100);
  return {
    tier,
    discountPercent: tier.discountPercent,
    discountAmount,
    totalFinal: subtotal - discountAmount,
    orderType: tier.orderType,
  };
}

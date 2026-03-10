import type { Product } from '@/types/product';

// ══════════════════════════════════════════════
// Catálogo de Produtos
// ══════════════════════════════════════════════
// Adicione novos produtos aqui. Marque active:true
// quando houver dados/fotos reais prontos.
// ══════════════════════════════════════════════

const CAT = '/assets/products/catalog';

export const PRODUCTS: Product[] = [
  // ── 1. Calça Flare Jeans (original, com fotos manuais) ──
  {
    id: 'calca-flare-001',
    type: 'calca',
    typeLabel: 'Calça',
    name: 'Calça Flare Jeans',
    slug: 'calca-flare-jeans',
    shortDescription: 'High Waist · Cintura Alta · Modelagem Exclusiva',
    commercialDescription:
      'Calça flare em jeans premium com cintura alta e modelagem exclusiva. Ideal para composições elegantes e confortáveis. Tecido com elastano para máximo conforto.',
    collection: 'inverno-2025',
    collectionLabel: 'Coleção 2025 · Moda Feminina',
    reference: '#FL001',
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
    order: 1,
  },

  // ── 2. Calça Fem Regular Jeans (pág. 9) ──
  {
    id: 'calca-regular-009',
    type: 'calca',
    typeLabel: 'Calça',
    name: 'Calça Regular Jeans',
    slug: 'calca-regular-jeans',
    shortDescription: 'Corte Regular · Jeans Lycra · Conforto diário',
    commercialDescription:
      'Calça feminina regular em jeans com lycra, modelagem clássica para o dia a dia com conforto e elegância.',
    collection: 'inverno-2025',
    collectionLabel: 'Coleção 2025 · Moda Feminina',
    reference: '#RG009',
    colors: [
      {
        id: 'jeans-classico',
        label: 'Jeans Clássico',
        hex: '#4A6FA5',
        gradient: 'linear-gradient(135deg, #4A6FA5, #35527A)',
        photos: [
          { src: `${CAT}/page09-img01.jpeg`, label: 'Foto 1', alt: 'Calça Regular Jeans - Foto 1' },
          { src: `${CAT}/page09-img05.jpeg`, label: 'Foto 2', alt: 'Calça Regular Jeans - Foto 2' },
          { src: `${CAT}/page09-img06.jpeg`, label: 'Foto 3', alt: 'Calça Regular Jeans - Foto 3' },
          { src: `${CAT}/page09-img07.jpeg`, label: 'Foto 4', alt: 'Calça Regular Jeans - Foto 4' },
        ],
      },
    ],
    sizes: ['36', '38', '40', '42', '44', '46'],
    basePrice: 42.5,
    composition: ['74% Algodão', '24% Poliéster', '2% Elastano'],
    features: ['Corte Regular', 'Jeans Lycra'],
    badges: [
      { text: 'Básica', icon: '👖', variant: 'dark' },
    ],
    featured: false,
    active: true,
    order: 2,
  },

  // ── 3. Calça Social Sarja (pág. 10) ──
  {
    id: 'calca-social-010',
    type: 'calca',
    typeLabel: 'Calça',
    name: 'Calça Social Sarja',
    slug: 'calca-social-sarja',
    shortDescription: 'Social · Sarja Premium · Caimento elegante',
    commercialDescription:
      'Calça social feminina em sarja premium com caimento elegante, ideal para ambientes formais e casuais.',
    collection: 'inverno-2025',
    collectionLabel: 'Coleção 2025 · Moda Feminina',
    reference: '#SC010',
    colors: [
      {
        id: 'sarja-escuro',
        label: 'Sarja Escuro',
        hex: '#3D3D3D',
        gradient: 'linear-gradient(135deg, #4D4D4D, #2D2D2D)',
        photos: [
          { src: `${CAT}/page10-img01.jpeg`, label: 'Foto 1', alt: 'Calça Social Sarja - Foto 1' },
          { src: `${CAT}/page10-img02.jpeg`, label: 'Foto 2', alt: 'Calça Social Sarja - Foto 2' },
          { src: `${CAT}/page10-img03.jpeg`, label: 'Foto 3', alt: 'Calça Social Sarja - Foto 3' },
          { src: `${CAT}/page10-img07.jpeg`, label: 'Foto 4', alt: 'Calça Social Sarja - Foto 4' },
        ],
      },
    ],
    sizes: ['36', '38', '40', '42', '44', '46'],
    basePrice: 65.0,
    composition: ['97% Algodão', '3% Elastano'],
    features: ['Social', 'Sarja Premium'],
    badges: [
      { text: 'Social', icon: '💼', variant: 'dark' },
    ],
    featured: false,
    active: true,
    order: 3,
  },

  // ── 4. Calça Skinny Sarja Empinabumbum (pág. 11) ──
  {
    id: 'calca-skinny-011',
    type: 'calca',
    typeLabel: 'Calça',
    name: 'Calça Skinny Empinabumbum',
    slug: 'calca-skinny-empinabumbum',
    shortDescription: 'Skinny · Sarja · Efeito Empinabumbum',
    commercialDescription:
      'Calça skinny em sarja com efeito empinabumbum, modelagem que valoriza as curvas com máximo conforto.',
    collection: 'inverno-2025',
    collectionLabel: 'Coleção 2025 · Moda Feminina',
    reference: '#SK011',
    colors: [
      {
        id: 'sarja-natural',
        label: 'Sarja Natural',
        hex: '#8B7D6B',
        gradient: 'linear-gradient(135deg, #8B7D6B, #6B5D4B)',
        photos: [
          { src: `${CAT}/page11-img01.jpeg`, label: 'Foto 1', alt: 'Calça Skinny Empinabumbum - Foto 1' },
          { src: `${CAT}/page11-img05.jpeg`, label: 'Foto 2', alt: 'Calça Skinny Empinabumbum - Foto 2' },
          { src: `${CAT}/page11-img06.jpeg`, label: 'Foto 3', alt: 'Calça Skinny Empinabumbum - Foto 3' },
          { src: `${CAT}/page11-img07.jpeg`, label: 'Foto 4', alt: 'Calça Skinny Empinabumbum - Foto 4' },
          { src: `${CAT}/page11-img08.jpeg`, label: 'Foto 5', alt: 'Calça Skinny Empinabumbum - Foto 5' },
        ],
      },
    ],
    sizes: ['36', '38', '40', '42', '44', '46'],
    basePrice: 46.5,
    composition: ['97% Algodão', '3% Elastano'],
    features: ['Skinny', 'Empinabumbum', 'Sarja'],
    badges: [
      { text: 'Empinabumbum', icon: '🍑', variant: 'gold' },
    ],
    featured: true,
    active: true,
    order: 4,
  },

  // ── 5. Calça Wide Leg Cargo (pág. 12) ──
  {
    id: 'calca-wideleg-cargo-012',
    type: 'calca',
    typeLabel: 'Calça',
    name: 'Calça Wide Leg Cargo',
    slug: 'calca-wide-leg-cargo',
    shortDescription: 'Wide Leg · Cargo · Tendência atual',
    commercialDescription:
      'Calça wide leg cargo feminina, modelagem ampla com bolsos laterais utilitários. Peça queridinha da temporada.',
    collection: 'inverno-2025',
    collectionLabel: 'Coleção 2025 · Moda Feminina',
    reference: '#WC012',
    colors: [
      {
        id: 'cargo-verde',
        label: 'Verde Militar',
        hex: '#556B2F',
        gradient: 'linear-gradient(135deg, #556B2F, #3D4E22)',
        photos: [
          { src: `${CAT}/page12-img04.jpeg`, label: 'Foto 1', alt: 'Calça Wide Leg Cargo - Foto 1' },
          { src: `${CAT}/page12-img05.jpeg`, label: 'Foto 2', alt: 'Calça Wide Leg Cargo - Foto 2' },
          { src: `${CAT}/page12-img06.jpeg`, label: 'Foto 3', alt: 'Calça Wide Leg Cargo - Foto 3' },
          { src: `${CAT}/page12-img07.jpeg`, label: 'Foto 4', alt: 'Calça Wide Leg Cargo - Foto 4' },
        ],
      },
    ],
    sizes: ['36', '38', '40', '42', '44', '46'],
    basePrice: 75.0,
    composition: ['100% Algodão'],
    features: ['Wide Leg', 'Cargo', 'Bolsos Laterais'],
    badges: [
      { text: 'Tendência', icon: '🔥', variant: 'gold' },
    ],
    featured: true,
    active: true,
    order: 5,
  },

  // ── 6. Wide Leg Jeans (pág. 14) ──
  {
    id: 'wide-leg-jeans-014',
    type: 'calca',
    typeLabel: 'Calça',
    name: 'Wide Leg Jeans',
    slug: 'wide-leg-jeans',
    shortDescription: 'Wide Leg · Jeans Premium · Cintura alta',
    commercialDescription:
      'Calça wide leg em jeans premium com cintura alta, perna ampla e acabamento diferenciado.',
    collection: 'inverno-2025',
    collectionLabel: 'Coleção 2025 · Moda Feminina',
    reference: '#WL014',
    colors: [
      {
        id: 'jeans-medio',
        label: 'Jeans Médio',
        hex: '#4A7DC7',
        gradient: 'linear-gradient(135deg, #4A7DC7, #3561A0)',
        photos: [
          { src: `${CAT}/page14-img01.jpeg`, label: 'Foto 1', alt: 'Wide Leg Jeans - Foto 1' },
          { src: `${CAT}/page14-img02.jpeg`, label: 'Foto 2', alt: 'Wide Leg Jeans - Foto 2' },
          { src: `${CAT}/page14-img03.jpeg`, label: 'Foto 3', alt: 'Wide Leg Jeans - Foto 3' },
          { src: `${CAT}/page14-img04.jpeg`, label: 'Foto 4', alt: 'Wide Leg Jeans - Foto 4' },
          { src: `${CAT}/page14-img08.jpeg`, label: 'Foto 5', alt: 'Wide Leg Jeans - Foto 5' },
        ],
      },
    ],
    sizes: ['36', '38', '40', '42', '44', '46'],
    basePrice: 70.0,
    composition: ['74% Algodão', '24% Poliéster', '2% Elastano'],
    features: ['Wide Leg', 'Cintura Alta', 'Jeans Premium'],
    badges: [
      { text: 'Cintura Alta', icon: '✨', variant: 'dark' },
    ],
    featured: false,
    active: true,
    order: 6,
  },

  // ── 7. Jaqueta Resinada Premium (pág. 16) ──
  {
    id: 'jaqueta-resinada-016',
    type: 'jaqueta',
    typeLabel: 'Jaqueta',
    name: 'Jaqueta Resinada Premium',
    slug: 'jaqueta-resinada-premium',
    shortDescription: 'Resinada · Premium · Acabamento sofisticado',
    commercialDescription:
      'Jaqueta resinada premium com acabamento sofisticado, ideal para looks de inverno com toque moderno.',
    collection: 'inverno-2025',
    collectionLabel: 'Coleção 2025 · Moda Feminina',
    reference: '#JR016',
    colors: [
      {
        id: 'resinada-preta',
        label: 'Preta Resinada',
        hex: '#1a1a1a',
        gradient: 'linear-gradient(135deg, #2a2a2a, #0a0a0a)',
        photos: [
          { src: `${CAT}/page16-img01.jpeg`, label: 'Foto 1', alt: 'Jaqueta Resinada - Foto 1' },
          { src: `${CAT}/page16-img02.jpeg`, label: 'Foto 2', alt: 'Jaqueta Resinada - Foto 2' },
          { src: `${CAT}/page16-img03.jpeg`, label: 'Foto 3', alt: 'Jaqueta Resinada - Foto 3' },
          { src: `${CAT}/page16-img04.jpeg`, label: 'Foto 4', alt: 'Jaqueta Resinada - Foto 4' },
          { src: `${CAT}/page16-img08.jpeg`, label: 'Foto 5', alt: 'Jaqueta Resinada - Foto 5' },
        ],
      },
    ],
    sizes: ['P', 'M', 'G', 'GG'],
    basePrice: 65.0,
    composition: ['70% Algodão', '28% Poliéster', '2% Elastano'],
    features: ['Resinada', 'Premium', 'Inverno'],
    badges: [
      { text: 'Premium', icon: '⭐', variant: 'gold' },
    ],
    featured: true,
    active: true,
    order: 7,
  },

  // ── 8. Jaqueta Jeans Fem Black (pág. 17) ──
  {
    id: 'jaqueta-jeans-black-017',
    type: 'jaqueta',
    typeLabel: 'Jaqueta',
    name: 'Jaqueta Jeans Black',
    slug: 'jaqueta-jeans-black',
    shortDescription: 'Jeans Black · Corte feminino · Essencial',
    commercialDescription:
      'Jaqueta jeans feminina em lavagem black, peça essencial do guarda-roupa para qualquer estação.',
    collection: 'inverno-2025',
    collectionLabel: 'Coleção 2025 · Moda Feminina',
    reference: '#JB017',
    colors: [
      {
        id: 'jeans-black',
        label: 'Jeans Black',
        hex: '#1C1C1C',
        gradient: 'linear-gradient(135deg, #2C2C2C, #0C0C0C)',
        photos: [
          { src: `${CAT}/page17-img01.jpeg`, label: 'Foto 1', alt: 'Jaqueta Jeans Black - Foto 1' },
          { src: `${CAT}/page17-img05.jpeg`, label: 'Foto 2', alt: 'Jaqueta Jeans Black - Foto 2' },
          { src: `${CAT}/page17-img06.jpeg`, label: 'Foto 3', alt: 'Jaqueta Jeans Black - Foto 3' },
          { src: `${CAT}/page17-img07.jpeg`, label: 'Foto 4', alt: 'Jaqueta Jeans Black - Foto 4' },
          { src: `${CAT}/page17-img08.jpeg`, label: 'Foto 5', alt: 'Jaqueta Jeans Black - Foto 5' },
        ],
      },
    ],
    sizes: ['P', 'M', 'G', 'GG'],
    basePrice: 75.0,
    composition: ['100% Algodão'],
    features: ['Jeans Black', 'Corte Feminino'],
    badges: [
      { text: 'Essencial', icon: '🖤', variant: 'dark' },
    ],
    featured: false,
    active: true,
    order: 8,
  },

  // ── 9. Short Com Brilho Lycra (pág. 22) ──
  {
    id: 'short-brilho-022',
    type: 'short',
    typeLabel: 'Short',
    name: 'Short Com Brilho Lycra',
    slug: 'short-brilho-lycra',
    shortDescription: 'Com Brilho · Lycra · Verão / Festa',
    commercialDescription:
      'Short feminino com brilho em tecido lycra, perfeito para looks de verão e festas.',
    collection: 'inverno-2025',
    collectionLabel: 'Coleção 2025 · Moda Feminina',
    reference: '#SB022',
    colors: [
      {
        id: 'brilho-dourado',
        label: 'Dourado',
        hex: '#C5A55A',
        gradient: 'linear-gradient(135deg, #C5A55A, #A0843A)',
        photos: [
          { src: `${CAT}/page22-img01.jpeg`, label: 'Foto 1', alt: 'Short Brilho - Foto 1' },
          { src: `${CAT}/page22-img02.jpeg`, label: 'Foto 2', alt: 'Short Brilho - Foto 2' },
          { src: `${CAT}/page22-img03.jpeg`, label: 'Foto 3', alt: 'Short Brilho - Foto 3' },
          { src: `${CAT}/page22-img07.jpeg`, label: 'Foto 4', alt: 'Short Brilho - Foto 4' },
        ],
      },
    ],
    sizes: ['36', '38', '40', '42', '44'],
    basePrice: 24.99,
    composition: ['92% Poliéster', '8% Elastano'],
    features: ['Com Brilho', 'Lycra', 'Festa'],
    badges: [
      { text: 'Brilho', icon: '✨', variant: 'gold' },
    ],
    featured: false,
    active: true,
    order: 9,
  },

  // ── 10. Bermuda Fem Social Sarja (pág. 23) ──
  {
    id: 'bermuda-social-023',
    type: 'bermuda',
    typeLabel: 'Bermuda',
    name: 'Bermuda Social Sarja',
    slug: 'bermuda-social-sarja',
    shortDescription: 'Social · Sarja · Elegância casual',
    commercialDescription:
      'Bermuda feminina social em sarja com caimento elegante, ideal para o trabalho e passeios.',
    collection: 'inverno-2025',
    collectionLabel: 'Coleção 2025 · Moda Feminina',
    reference: '#BS023',
    colors: [
      {
        id: 'sarja-bege',
        label: 'Bege',
        hex: '#C8B88A',
        gradient: 'linear-gradient(135deg, #C8B88A, #A8986A)',
        photos: [
          { src: `${CAT}/page23-img04.jpeg`, label: 'Foto 1', alt: 'Bermuda Social Sarja - Foto 1' },
          { src: `${CAT}/page23-img05.jpeg`, label: 'Foto 2', alt: 'Bermuda Social Sarja - Foto 2' },
          { src: `${CAT}/page23-img06.jpeg`, label: 'Foto 3', alt: 'Bermuda Social Sarja - Foto 3' },
          { src: `${CAT}/page23-img07.jpeg`, label: 'Foto 4', alt: 'Bermuda Social Sarja - Foto 4' },
        ],
      },
    ],
    sizes: ['38', '40', '42', '44', '46'],
    basePrice: 49.99,
    composition: ['97% Algodão', '3% Elastano'],
    features: ['Social', 'Sarja'],
    badges: [],
    featured: false,
    active: true,
    order: 10,
  },

  // ── 11. Short Fem Cargo (pág. 25) ──
  {
    id: 'short-cargo-025',
    type: 'short',
    typeLabel: 'Short',
    name: 'Short Cargo 100%',
    slug: 'short-cargo',
    shortDescription: 'Cargo · 100% Algodão · Utilitário',
    commercialDescription:
      'Short feminino cargo em algodão 100%, bolsos utilitários e modelagem descontraída.',
    collection: 'inverno-2025',
    collectionLabel: 'Coleção 2025 · Moda Feminina',
    reference: '#FC025',
    colors: [
      {
        id: 'cargo-caqui',
        label: 'Caqui',
        hex: '#8B7355',
        gradient: 'linear-gradient(135deg, #8B7355, #6B5335)',
        photos: [
          { src: `${CAT}/page25-img04.jpeg`, label: 'Foto 1', alt: 'Short Cargo - Foto 1' },
          { src: `${CAT}/page25-img05.jpeg`, label: 'Foto 2', alt: 'Short Cargo - Foto 2' },
          { src: `${CAT}/page25-img06.jpeg`, label: 'Foto 3', alt: 'Short Cargo - Foto 3' },
          { src: `${CAT}/page25-img07.jpeg`, label: 'Foto 4', alt: 'Short Cargo - Foto 4' },
        ],
      },
    ],
    sizes: ['36', '38', '40', '42', '44'],
    basePrice: 44.99,
    composition: ['100% Algodão'],
    features: ['Cargo', 'Bolsos Utilitários'],
    badges: [
      { text: 'Cargo', icon: '🪖', variant: 'dark' },
    ],
    featured: false,
    active: true,
    order: 11,
  },
];

export function getActiveProducts(): Product[] {
  return PRODUCTS.filter((p) => p.active).sort((a, b) => a.order - b.order);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

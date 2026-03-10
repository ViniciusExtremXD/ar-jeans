import { useRef, useState, useCallback } from 'react';
import { CartProvider } from '@/contexts/CartContext';
import { Hero } from '@/sections/Hero';
import { Showcase } from '@/sections/Showcase';
import { ProductDetail } from '@/sections/ProductDetail';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { CartIndicator } from '@/components/cart/CartIndicator';
import styles from './App.module.css';

function AppContent() {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const showcaseRef = useRef<HTMLDivElement>(null);

  const scrollToShowcase = useCallback(() => {
    showcaseRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className={styles.app}>
      <Hero onScrollToShowcase={scrollToShowcase} />

      <div ref={showcaseRef}>
        <Showcase onProductSelect={setSelectedProductId} />
      </div>

      {/* Product Detail Modal */}
      {selectedProductId && (
        <ProductDetail
          productId={selectedProductId}
          onClose={() => setSelectedProductId(null)}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      {/* Cart Floating Button */}
      <CartIndicator onClick={() => setIsCartOpen(true)} />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

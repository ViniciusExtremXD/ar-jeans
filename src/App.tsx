import { useRef, useState, useCallback } from 'react';
import { CartProvider } from '@/contexts/CartContext';
import { NavBar } from '@/components/layout/NavBar';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { Hero } from '@/sections/Hero';
import { WholesaleRetail } from '@/sections/WholesaleRetail';
import { About } from '@/sections/About';
import { Trust } from '@/sections/Trust';
import { Showcase } from '@/sections/Showcase';
import { FAQ } from '@/sections/FAQ';
import { Location } from '@/sections/Location';
import { LeadCapture } from '@/sections/LeadCapture';
import { Footer } from '@/sections/Footer';
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
      <NavBar />

      <Hero onScrollToShowcase={scrollToShowcase} />

      <WholesaleRetail />

      <About />

      <Trust />

      <div ref={showcaseRef}>
        <Showcase onProductSelect={setSelectedProductId} />
      </div>

      <FAQ />

      <Location />

      <LeadCapture />

      <Footer />

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

      {/* WhatsApp Float */}
      <WhatsAppFloat />
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

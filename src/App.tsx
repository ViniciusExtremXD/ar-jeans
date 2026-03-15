import { useState, useCallback } from 'react';
import { CartProvider } from '@/contexts/CartContext';
import { NavBar } from '@/components/layout/NavBar';
import { Hero } from '@/sections/Hero';
import { WholesaleRetail } from '@/sections/WholesaleRetail';
import { About } from '@/sections/About';
import { Showcase } from '@/sections/Showcase';
import { FAQ } from '@/sections/FAQ';
import { Location } from '@/sections/Location';
import { LeadCapture } from '@/sections/LeadCapture';
import { Footer } from '@/sections/Footer';
import { ProductDetail } from '@/sections/ProductDetail';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { CartIndicator } from '@/components/cart/CartIndicator';
import { BackToTop } from '@/components/ui/BackToTop';
import { scrollToSection } from '@/utils/scroll';
import styles from './App.module.css';

function AppContent() {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const scrollToShowcase = useCallback(() => {
    scrollToSection('catalogo');
  }, []);

  const openProductFromCart = useCallback((productId: string) => {
    setIsCartOpen(false);
    setSelectedProductId(productId);
  }, []);

  const handleProductAdded = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  const handleCartOpen = useCallback(() => {
    setIsCartOpen(true);
  }, []);

  const handleCartClose = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  return (
    <div className={styles.app}>
      <NavBar />

      <Hero onScrollToShowcase={scrollToShowcase} />

      <WholesaleRetail />

      <div>
        <Showcase onProductSelect={setSelectedProductId} />
      </div>

      <About />

      <FAQ />

      <Location />

      <LeadCapture />

      <Footer />

      {/* Product Detail Modal */}
      {selectedProductId && (
        <ProductDetail
          productId={selectedProductId}
          onClose={() => setSelectedProductId(null)}
          onAddedToCart={handleProductAdded}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer
        open={isCartOpen}
        onClose={handleCartClose}
        onEditProduct={openProductFromCart}
      />

      {/* Cart Floating Button */}
      <CartIndicator onClick={handleCartOpen} />

      {/* Back to Top */}
      <BackToTop />
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

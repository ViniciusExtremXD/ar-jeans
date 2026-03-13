import { useState, useCallback } from 'react';
import { getProductById } from '@/data/products';
import { useProduct } from '@/hooks/useProduct';
import { useCartContext } from '@/contexts/CartContext';
import { calculateDiscount } from '@/data/business-rules';
import { trackEvent } from '@/utils/analytics';
import { formatCurrency } from '@/utils/format';
import { PhotoGallery } from '@/components/product/PhotoGallery';
import { ColorSelector } from '@/components/product/ColorSelector';
import { SizeGrid } from '@/components/product/SizeGrid';
import { DiscountInfo } from '@/components/product/DiscountInfo';
import { GoldButton } from '@/components/ui/GoldButton';
import styles from './ProductDetail.module.css';

interface Props {
  productId: string;
  onClose: () => void;
}

export function ProductDetail({ productId, onClose }: Props) {
  const product = getProductById(productId);
  const { addItem } = useCartContext();
  const [added, setAdded] = useState(false);

  const {
    selection,
    activePhotoIndex,
    setActivePhotoIndex,
    previewColorId,
    toggleColor,
    setActiveColorTab,
    setQuantity,
    changeQuantity,
    getTotalPieces,
    getItemsToAdd,
    resetSelection,
  } = useProduct(product!);

  if (!product) return null;

  const totalPieces = getTotalPieces();

  // Per-product discount based on current selection quantity
  const gross = totalPieces * product.basePrice;
  const { discountPercent: currentDiscount, discountAmount: currentDiscountAmt } =
    totalPieces > 0 ? calculateDiscount(gross, totalPieces) : { discountPercent: 0, discountAmount: 0 };
  const currentFinal = gross - currentDiscountAmt;

  const previewColor = product.colors.find(c => c.id === previewColorId) ?? product.colors[0]!;

  const handleAddToCart = useCallback(() => {
    const items = getItemsToAdd();
    if (items.length === 0) return;

    items.forEach(({ colorId, sizes }) => {
      addItem(product.id, colorId, sizes);
    });

    trackEvent('add_to_cart', {
      productId: product.id,
      pieces: totalPieces,
    });

    setAdded(true);
    resetSelection();
    setTimeout(() => setAdded(false), 2500);
  }, [getItemsToAdd, addItem, product.id, totalPieces, resetSelection]);

  const selectedColorIds = Object.entries(selection.selectedColors)
    .filter(([, sel]) => sel)
    .map(([id]) => id);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Close */}
        <button
          className={styles.closeBtn}
          onClick={onClose}
          type="button"
          aria-label="Fechar"
        >
          ✕
        </button>

        {/* Gallery */}
        <div className={styles.gallery}>
          <PhotoGallery
            color={previewColor}
            activePhotoIndex={activePhotoIndex}
            onPhotoChange={setActivePhotoIndex}
            badges={product.badges}
            reference={product.reference}
          />
        </div>

        {/* Info */}
        <div className={styles.info}>
          <div className={styles.scrollArea}>
            {/* Tag */}
            <div className={styles.tag}>
              <span className={styles.tagDot} />
              {product.collectionLabel}
            </div>

            {/* Name */}
            <h1 className={styles.name}>
              {product.name.split(' ').map((word, i, arr) =>
                i === arr.length - 1
                  ? <span key={i} className={styles.accent}>{word}</span>
                  : word + ' '
              )}
            </h1>

            <p className={styles.subtitle}>{product.shortDescription}</p>

            {/* Price */}
            <div className={styles.priceBlock}>
              <span className={styles.priceTag}>
                {formatCurrency(product.basePrice)}
              </span>
              <div className={styles.priceStack}>
                <span className={styles.priceLabel}>preço unitário</span>
                <span className={styles.priceSub}>varejo & atacado</span>
              </div>
            </div>

            {/* Discount info — per this product's quantity only */}
            <DiscountInfo currentPieces={totalPieces} />

            {/* Order panel */}
            <div className={styles.orderPanel}>
              <h3 className={styles.orderTitle}>
                <span className={styles.orderIcon}>✦</span>
                Monte seu Pedido
              </h3>

              <ColorSelector
                colors={product.colors}
                selectedColors={selection.selectedColors}
                onToggle={toggleColor}
              />

              <SizeGrid
                colors={product.colors}
                selectedColors={selection.selectedColors}
                sizes={product.sizes}
                quantities={selection.quantities}
                activeColorTab={selection.activeColorTab}
                onTabChange={setActiveColorTab}
                onQuantityChange={changeQuantity}
                onQuantitySet={setQuantity}
              />
            </div>

            {/* Composition */}
            <div className={styles.infoBar}>
              <div className={styles.pills}>
                {product.composition.map((comp) => (
                  <span key={comp} className={styles.pill}>{comp}</span>
                ))}
              </div>
              <span className={styles.ref}>Ref: {product.reference}</span>
            </div>
          </div>

          {/* Summary bar */}
          <div className={styles.summary}>
            <div className={styles.summaryLeft}>
              <span className={styles.summaryPieces}>
                {totalPieces} peça{totalPieces !== 1 ? 's' : ''}
              </span>
              {totalPieces > 0 && (
                <>
                  {currentDiscount > 0 && (
                    <span className={styles.summaryOriginal}>
                      {formatCurrency(gross)}
                    </span>
                  )}
                  <span className={styles.summaryTotal}>
                    {formatCurrency(currentDiscount > 0 ? currentFinal : gross)}
                    {currentDiscount > 0 && (
                      <span className={styles.summaryBadge}>{currentDiscount}% OFF</span>
                    )}
                  </span>
                </>
              )}
            </div>

            {added ? (
              <div className={styles.addedFeedback}>
                ✓ Adicionado!
              </div>
            ) : (
              <GoldButton
                onClick={handleAddToCart}
                disabled={totalPieces === 0}
              >
                Adicionar ao Carrinho
              </GoldButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

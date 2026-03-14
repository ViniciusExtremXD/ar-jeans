import { useState, useCallback, useEffect, useRef } from 'react';
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
import { OVERLAY_MOTION_MS, getMotionDuration, lockBodyScroll } from '@/utils/overlayMotion';
import styles from './ProductDetail.module.css';

interface Props {
  productId: string;
  onClose: () => void;
  onAddedToCart?: () => void;
}

type MotionPhase = 'enter' | 'open' | 'closing';

export function ProductDetail({ productId, onClose, onAddedToCart }: Props) {
  const product = getProductById(productId);
  const { addItem } = useCartContext();
  const [phase, setPhase] = useState<MotionPhase>('enter');
  const closeTimerRef = useRef<number | null>(null);
  const enterRafRef = useRef<number | null>(null);
  const enterRafNestedRef = useRef<number | null>(null);

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

  useEffect(() => {
    const releaseScrollLock = lockBodyScroll();

    enterRafRef.current = window.requestAnimationFrame(() => {
      enterRafNestedRef.current = window.requestAnimationFrame(() => {
        setPhase('open');
      });
    });

    return () => {
      releaseScrollLock();

      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }

      if (enterRafRef.current !== null) {
        window.cancelAnimationFrame(enterRafRef.current);
      }

      if (enterRafNestedRef.current !== null) {
        window.cancelAnimationFrame(enterRafNestedRef.current);
      }
    };
  }, []);

  const isClosing = phase === 'closing';

  const requestClose = useCallback((afterClose?: () => void) => {
    if (isClosing) return;

    setPhase('closing');
    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null;
      onClose();
      afterClose?.();
    }, getMotionDuration(OVERLAY_MOTION_MS.modalClose));
  }, [isClosing, onClose]);

  const totalPieces = getTotalPieces();
  const gross = totalPieces * product.basePrice;
  const { discountPercent: currentDiscount, discountAmount: currentDiscountAmt } =
    totalPieces > 0 ? calculateDiscount(gross, totalPieces) : { discountPercent: 0, discountAmount: 0 };
  const currentFinal = gross - currentDiscountAmt;

  const previewColor = product.colors.find((color) => color.id === previewColorId) ?? product.colors[0]!;

  const handleAddToCart = useCallback(() => {
    const items = getItemsToAdd();
    if (items.length === 0 || isClosing) return;

    items.forEach(({ colorId, sizes }) => {
      addItem(product.id, colorId, sizes);
    });

    trackEvent('add_to_cart', {
      productId: product.id,
      pieces: totalPieces,
    });

    resetSelection();
    requestClose();
    onAddedToCart?.();
  }, [getItemsToAdd, isClosing, addItem, product.id, totalPieces, resetSelection, requestClose, onAddedToCart]);

  const overlayClassName = [
    styles.overlay,
    phase === 'open' ? styles.overlayVisible : '',
    isClosing ? styles.overlayClosing : '',
  ].filter(Boolean).join(' ');

  const modalClassName = [
    styles.modal,
    phase === 'open' ? styles.modalVisible : '',
    isClosing ? styles.modalClosing : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={overlayClassName}
      onClick={() => requestClose()}
    >
      <div
        className={modalClassName}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className={styles.closeBtn}
          onClick={() => requestClose()}
          type="button"
          aria-label="Fechar"
        >
          &times;
        </button>

        <div className={styles.gallery}>
          <PhotoGallery
            color={previewColor}
            activePhotoIndex={activePhotoIndex}
            onPhotoChange={setActivePhotoIndex}
            badges={product.badges}
            reference={product.reference}
          />
        </div>

        <div className={styles.info}>
          <div className={styles.scrollArea}>
            <h1 className={styles.name}>
              {product.name.split(' ').map((word, index, words) =>
                index === words.length - 1
                  ? <span key={index} className={styles.accent}>{word}</span>
                  : word + ' '
              )}
            </h1>

            <p className={styles.subtitle}>{product.shortDescription}</p>

            <div className={styles.priceBlock}>
              <span className={styles.priceTag}>
                {formatCurrency(product.basePrice)}
              </span>
              <div className={styles.priceStack}>
                <span className={styles.priceLabel}>preço unitário</span>
                <span className={styles.priceSub}>varejo & atacado</span>
              </div>
            </div>

            <DiscountInfo currentPieces={totalPieces} />

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

            <div className={styles.infoBar}>
              <div className={styles.pills}>
                {product.composition.map((composition) => (
                  <span key={composition} className={styles.pill}>{composition}</span>
                ))}
              </div>
              <span className={styles.ref}>Ref: {product.reference}</span>
            </div>
          </div>

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

            <GoldButton
              onClick={handleAddToCart}
              disabled={totalPieces === 0 || isClosing}
              className={styles.addButton}
            >
              Adicionar ao Carrinho
            </GoldButton>
          </div>
        </div>
      </div>
    </div>
  );
}

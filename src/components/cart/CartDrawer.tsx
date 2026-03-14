import { useEffect, useRef, useState } from 'react';
import { useCartContext } from '@/contexts/CartContext';
import { formatCurrency, formatNumber } from '@/utils/format';
import { buildWhatsAppMessage, sendToWhatsApp } from '@/utils/whatsapp';
import { trackEvent } from '@/utils/analytics';
import { OVERLAY_MOTION_MS, getMotionDuration, lockBodyScroll } from '@/utils/overlayMotion';
import { GoldButton } from '@/components/ui/GoldButton';
import { CartItem } from './CartItem';
import styles from './CartDrawer.module.css';

interface Props {
  open: boolean;
  onClose: () => void;
  onEditProduct: (productId: string) => void;
}

type MotionPhase = 'enter' | 'open' | 'closing';

export function CartDrawer({ open, onClose, onEditProduct }: Props) {
  const { computed, removeItem, updateItemSizes, clearCart } = useCartContext();
  const { items, totalPieces, subtotalBruto, totalDiscount, totalFinal, orderType } = computed;
  const [rendered, setRendered] = useState(open);
  const [phase, setPhase] = useState<MotionPhase>('enter');
  const closeTimerRef = useRef<number | null>(null);
  const enterRafRef = useRef<number | null>(null);
  const enterRafNestedRef = useRef<number | null>(null);

  useEffect(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    if (enterRafRef.current !== null) {
      window.cancelAnimationFrame(enterRafRef.current);
      enterRafRef.current = null;
    }

    if (enterRafNestedRef.current !== null) {
      window.cancelAnimationFrame(enterRafNestedRef.current);
      enterRafNestedRef.current = null;
    }

    if (open) {
      setRendered(true);
      setPhase('enter');

      enterRafRef.current = window.requestAnimationFrame(() => {
        enterRafNestedRef.current = window.requestAnimationFrame(() => {
          setPhase('open');
          enterRafRef.current = null;
          enterRafNestedRef.current = null;
        });
      });

      return;
    }

    if (!rendered) return;

    setPhase('closing');
    closeTimerRef.current = window.setTimeout(() => {
      setRendered(false);
      setPhase('enter');
      closeTimerRef.current = null;
    }, getMotionDuration(OVERLAY_MOTION_MS.drawerClose));
  }, [open, rendered]);

  useEffect(() => {
    if (!rendered) return undefined;

    return lockBodyScroll();
  }, [rendered]);

  useEffect(() => {
    return () => {
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

  const handleSendWhatsApp = () => {
    if (totalPieces === 0) return;
    trackEvent('order_submit', { totalPieces, totalFinal });
    trackEvent('whatsapp_click', { totalPieces });
    const message = buildWhatsAppMessage(computed);
    sendToWhatsApp(message);
  };

  const handleRemove = (itemId: string) => {
    trackEvent('remove_from_cart', { itemId });
    removeItem(itemId);
  };

  if (!rendered) return null;

  const isClosing = phase === 'closing';
  const orderLabel = orderType === 'atacado' ? '🏷️ Atacado' : '🛍️ Varejo';
  const overlayClassName = [
    styles.overlay,
    phase === 'open' ? styles.overlayVisible : '',
    isClosing ? styles.overlayClosing : '',
  ].filter(Boolean).join(' ');

  const drawerClassName = [
    styles.drawer,
    phase === 'open' ? styles.drawerVisible : '',
    isClosing ? styles.drawerClosing : '',
  ].filter(Boolean).join(' ');

  return (
    <>
      <div
        className={overlayClassName}
        onClick={onClose}
      />

      <div className={drawerClassName}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Seu Carrinho</h2>
            <span className={styles.subtitle}>
              {items.length} {items.length === 1 ? 'item' : 'itens'} · {totalPieces} peça{totalPieces !== 1 ? 's' : ''}
            </span>
          </div>
          <button className={styles.closeBtn} onClick={onClose} type="button" aria-label="Fechar carrinho">
            &times;
          </button>
        </div>

        <div className={styles.body}>
          {items.length === 0 ? (
            <div className={styles.empty}>
              <span className={styles.emptyIcon}>🛒</span>
              <p>Seu carrinho está vazio</p>
              <p className={styles.emptyHint}>
                Selecione peças na coleção para montar seu pedido
              </p>
            </div>
          ) : (
            <>
              <div className={styles.itemList}>
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onRemove={() => handleRemove(item.id)}
                    onEdit={() => onEditProduct(item.productId)}
                    onUpdateSizes={(sizes) => updateItemSizes(item.id, sizes)}
                  />
                ))}
              </div>

              <button
                className={styles.clearBtn}
                onClick={clearCart}
                type="button"
              >
                Limpar carrinho
              </button>
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.totals}>
              <div className={styles.totalRow}>
                <span>{orderLabel}</span>
                <span>{totalPieces} peça{totalPieces !== 1 ? 's' : ''}</span>
              </div>
              <div className={styles.totalRow}>
                <span>Subtotal</span>
                <span>{formatCurrency(subtotalBruto)}</span>
              </div>
              {totalDiscount > 0 && (
                <div className={`${styles.totalRow} ${styles.discount}`}>
                  <span>Desconto (atacado)</span>
                  <span>-R$ {formatNumber(totalDiscount)}</span>
                </div>
              )}
              <div className={`${styles.totalRow} ${styles.totalFinal}`}>
                <span>Total</span>
                <span>{formatCurrency(totalFinal)}</span>
              </div>
            </div>

            <GoldButton
              variant="whatsapp"
              fullWidth
              onClick={handleSendWhatsApp}
              disabled={totalPieces === 0}
            >
              Enviar Pedido via WhatsApp
            </GoldButton>
          </div>
        )}
      </div>
    </>
  );
}

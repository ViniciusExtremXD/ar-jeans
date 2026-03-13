import { useCartContext } from '@/contexts/CartContext';
import { formatCurrency, formatNumber } from '@/utils/format';
import { buildWhatsAppMessage, sendToWhatsApp } from '@/utils/whatsapp';
import { trackEvent } from '@/utils/analytics';
import { GoldButton } from '@/components/ui/GoldButton';
import { CartItem } from './CartItem';
import styles from './CartDrawer.module.css';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: Props) {
  const { computed, removeItem, clearCart } = useCartContext();
  const { items, totalPieces, subtotalBruto, totalDiscount, totalFinal, orderType } = computed;

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

  if (!open) return null;

  const orderLabel = orderType === 'atacado' ? '🏷️ Atacado' : '🛍️ Varejo';

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.drawer}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Seu Carrinho</h2>
            <span className={styles.subtitle}>
              {items.length} {items.length === 1 ? 'item' : 'itens'} · {totalPieces} peça{totalPieces !== 1 ? 's' : ''}
            </span>
          </div>
          <button className={styles.closeBtn} onClick={onClose} type="button" aria-label="Fechar carrinho">
            ✕
          </button>
        </div>

        {/* Items */}
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
                  />
                ))}
              </div>

              {/* Clear cart */}
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

        {/* Footer with totals */}
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

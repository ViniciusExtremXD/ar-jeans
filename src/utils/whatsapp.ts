import type { CartComputed } from '@/types/product';
import { BUSINESS_RULES } from '@/data/business-rules';
import { COMPANY_INFO } from '@/data/business-rules';
import { formatNumber } from './format';

/**
 * Monta mensagem estruturada para WhatsApp.
 * Desacoplada da UI — recebe apenas dados computados do carrinho.
 */
export function buildWhatsAppMessage(cart: CartComputed): string {
  const { items, totalPieces, subtotalBruto, totalDiscount, totalFinal, orderType } = cart;

  const orderLabel = orderType === 'atacado' ? 'ATACADO' : 'VAREJO';

  const lines: string[] = [];

  // Cabeçalho
  lines.push(`*PEDIDO ${orderLabel} — ${BUSINESS_RULES.brandName}*`);
  lines.push(`_${BUSINESS_RULES.collectionName}_`);
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  lines.push('');

  // Itens
  lines.push('*Itens do Pedido:*');
  lines.push('');

  items.forEach((item) => {
    const sizesText = Object.entries(item.sizes)
      .filter(([, qty]) => qty > 0)
      .map(([size, qty]) => `${size}: ${qty}`)
      .join(' · ');

    lines.push(`▸ *${item.product.name}*`);
    lines.push(`  Ref: ${item.product.reference}`);
    lines.push(`  Cor: ${item.color.label}`);
    lines.push(`  Tamanhos: ${sizesText}`);

    if (item.discountPercent > 0) {
      lines.push(
        `  ${item.totalPieces} pç × R$ ${formatNumber(item.unitPrice)} (-${item.discountPercent}%) = *R$ ${formatNumber(item.subtotalFinal)}*`
      );
      lines.push(`  _${item.orderType === 'atacado' ? 'Atacado' : 'Varejo'} · ${item.discountPercent}% OFF neste item_`);
    } else {
      lines.push(
        `  ${item.totalPieces} pç × R$ ${formatNumber(item.unitPrice)} = *R$ ${formatNumber(item.subtotal)}*`
      );
    }
    lines.push('');
  });

  // Totais
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  lines.push(`Total de peças: *${totalPieces}*`);
  lines.push(`Subtotal bruto: R$ ${formatNumber(subtotalBruto)}`);

  if (totalDiscount > 0) {
    lines.push(`Desconto (atacado): -R$ ${formatNumber(totalDiscount)}`);
  }

  lines.push(`*TOTAL: R$ ${formatNumber(totalFinal)}*`);
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  lines.push('');
  lines.push('Aguardo confirmação! 🙏');

  lines.push('');
  lines.push(`📍 ${COMPANY_INFO.addressFull}`);
  lines.push(`🔗 instagram.com/${COMPANY_INFO.instagram}`);

  return lines.join('\n');
}

/** Abre WhatsApp com a mensagem pré-preenchida */
export function sendToWhatsApp(message: string): void {
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encoded}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

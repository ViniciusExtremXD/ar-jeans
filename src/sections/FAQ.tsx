import { useState } from 'react';
import { useReveal } from '@/hooks/useReveal';
import styles from './FAQ.module.css';

interface FAQItem {
  q: string;
  a: string;
}

const ITEMS: FAQItem[] = [
  {
    q: 'A AR Jeans vende no varejo?',
    a: 'Sim! Vendemos a partir de 1 peça no varejo. Basta escolher o produto no catálogo, selecionar cor, tamanho e quantidade, e finalizar o pedido pelo WhatsApp.',
  },
  {
    q: 'A AR Jeans vende no atacado para lojistas?',
    a: 'Sim! Atendemos lojistas e revendedores com preço de atacado. A partir de 6 peças, o preço de atacado é aplicado automaticamente — com desconto progressivo de até 20% a partir de 18 peças.',
  },
  {
    q: 'Qual é o pedido mínimo para atacado?',
    a: 'Para pedidos no atacado, o mínimo é de 6 peças. Não há obrigatoriedade de ser o mesmo modelo — você pode combinar modelos diferentes.',
  },
  {
    q: 'Quais tamanhos estão disponíveis?',
    a: 'Trabalhamos com adulto (PP ao GG), plus size (XG, EXG, 1G, 2G, 3G), infantil (1 ao 16) e numeração (36 ao 46). A disponibilidade por tamanho varia por modelo. Consulte via WhatsApp.',
  },
  {
    q: 'Como funciona o pedido?',
    a: 'Você navega pelo catálogo, monta o carrinho com os produtos, cores e tamanhos desejados, e ao finalizar é gerada uma mensagem estruturada para o WhatsApp. Nossa equipe confirma o pedido e combina o pagamento.',
  },
  {
    q: 'Como funciona o pagamento?',
    a: 'O pagamento é combinado diretamente pelo WhatsApp. Aceitamos Pix, transferência e outras formas. Confirme com nossa equipe no momento do pedido.',
  },
  {
    q: 'Como funciona o frete?',
    a: 'Para pedidos de fora de São Paulo, o frete é calculado por transportadora ou Correios. Para clientes em SP, é possível retirar na loja física na Rua Xavantes, 719 ou combinar entrega.',
  },
  {
    q: 'Tem política de troca?',
    a: 'Sim. Aceitamos trocas em até 7 dias corridos mediante nota fiscal. As peças devem estar sem uso e com etiquetas originais. Para acionar, entre em contato pelo WhatsApp.',
  },
  {
    q: 'Atende lojistas do interior e de outros estados?',
    a: 'Sim! Atendemos lojistas em todo o Brasil. O pedido é feito pelo WhatsApp e enviamos por transportadora. Consulte condições de frete para atacado.',
  },
  {
    q: 'Onde fica a loja física?',
    a: 'Nossa loja fica na Rua Xavantes, 719 – Loja 10, São Paulo – SP, CEP 03027-900. Horário de atendimento: Seg–Sex das 9h às 18h e Sáb das 9h às 13h.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const { ref: sectionRef, revealed } = useReveal<HTMLElement>();

  return (
    <section id="faq" ref={sectionRef} className={`${styles.section} reveal ${revealed ? 'revealed' : ''}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.tag}>DÚVIDAS FREQUENTES</span>
          <h2 className={styles.title}>FAQ</h2>
          <p className={styles.subtitle}>
            As perguntas mais comuns sobre compra, tamanhos, pedidos e atendimento.
          </p>
        </div>

        <div className={styles.accordion} role="list">
          {ITEMS.map((item, idx) => (
            <div key={idx} className={`${styles.item} ${open === idx ? styles.itemOpen : ''}`} role="listitem">
              <button
                type="button"
                className={styles.question}
                onClick={() => setOpen(open === idx ? null : idx)}
                aria-expanded={open === idx}
              >
                <span>{item.q}</span>
                <span className={`${styles.arrow} ${open === idx ? styles.arrowOpen : ''}`} aria-hidden="true">
                  ▾
                </span>
              </button>
              <div
                className={styles.answerWrap}
                style={{ '--answer-open': open === idx ? '1' : '0' } as React.CSSProperties}
                aria-hidden={open !== idx}
              >
                <div className={styles.answer}>
                  <p>{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

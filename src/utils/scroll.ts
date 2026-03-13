interface ScrollOptions {
  extraOffset?: number;
}

function getHeaderHeight(): number {
  const header = document.querySelector<HTMLElement>('[data-sticky-header="true"]');
  return header?.offsetHeight ?? 0;
}

export function scrollToSection(sectionId: string, options?: ScrollOptions): void {
  const target = document.getElementById(sectionId);
  if (!target) return;

  const defaultExtraOffset = window.innerWidth <= 640 ? 8 : 14;
  const extraOffset = options?.extraOffset ?? defaultExtraOffset;
  const targetTop = target.getBoundingClientRect().top + window.scrollY;
  const finalTop = Math.max(targetTop - getHeaderHeight() - extraOffset, 0);

  window.scrollTo({ top: finalTop, behavior: 'smooth' });
}

const REDUCED_MOTION_FALLBACK_MS = 24;
const MOTION_MEDIA_QUERY = '(prefers-reduced-motion: reduce)';

export const OVERLAY_MOTION_MS = {
  backdropEnter: 320,
  backdropExit: 240,
  productEnter: 560,
  productExit: 380,
  cartEnter: 1500,
  cartExit: 360,
  contentEnter: 240,
  contentExit: 180,
  handoffOverlap: 90,
  modalClose: 380,
  drawerClose: 360,
} as const;

let scrollLockCount = 0;
let bodyOverflow = '';
let bodyPaddingRight = '';

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }

  return window.matchMedia(MOTION_MEDIA_QUERY).matches;
}

export function getMotionDuration(duration: number): number {
  return prefersReducedMotion() ? REDUCED_MOTION_FALLBACK_MS : duration;
}

export function lockBodyScroll(): () => void {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return () => {};
  }

  const body = document.body;

  if (scrollLockCount === 0) {
    bodyOverflow = body.style.overflow;
    bodyPaddingRight = body.style.paddingRight;

    const scrollbarGap = Math.max(window.innerWidth - document.documentElement.clientWidth, 0);
    const currentPaddingRight = Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0;

    body.style.overflow = 'hidden';
    if (scrollbarGap > 0) {
      body.style.paddingRight = `${currentPaddingRight + scrollbarGap}px`;
    }
  }

  scrollLockCount += 1;

  return () => {
    scrollLockCount = Math.max(0, scrollLockCount - 1);

    if (scrollLockCount === 0) {
      body.style.overflow = bodyOverflow;
      body.style.paddingRight = bodyPaddingRight;
    }
  };
}

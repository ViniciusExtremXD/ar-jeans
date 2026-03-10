import type { AnalyticsEvent } from '@/types/product';

type EventPayload = Record<string, string | number | boolean>;

/**
 * Dispara evento de analytics.
 * Em dev: console.log. Em prod: extensível para GA4, Meta Pixel etc.
 */
export function trackEvent(event: AnalyticsEvent, payload?: EventPayload): void {
  if (import.meta.env.DEV) {
    console.log(`[Analytics] ${event}`, payload ?? '');
  }

  // Extensão futura:
  // window.gtag?.('event', event, payload);
  // window.fbq?.('track', event, payload);
}

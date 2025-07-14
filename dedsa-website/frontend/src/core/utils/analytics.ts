export function trackEvent(name: string, data?: Record<string, unknown>) {
  console.log('Analytics event', name, data);
}

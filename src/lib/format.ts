export function formatPrice(cents: number, freeLabel = 'مجاني'): string {
  if (cents <= 0) return freeLabel;
  return `$${(cents / 100).toFixed(2)}`;
}

export function formatDate(iso: string, lang: 'ar' | 'en' = 'ar'): string {
  const locale = lang === 'ar' ? 'ar-EG' : 'en-US';
  return new Date(iso).toLocaleDateString(locale, {
    year: 'numeric',
    month: lang === 'ar' ? 'long' : 'short',
    day: 'numeric',
  });
}

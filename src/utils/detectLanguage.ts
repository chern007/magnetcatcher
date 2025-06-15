export type LanguageTag = 'en' | 'es' | 'multi' | 'unknown';

/**
 * Tries to infer the language of a torrent stream from its name.
 * Only distinguishes Spanish and English.
 */
export function detectLanguage(name?: string): LanguageTag {
  const n = name?.toLowerCase() ?? '';

  const hasSpanish = /(\besp(?:a[nñ]ol)?|spanish|castellano|latino|vose|sub\.?esp)/.test(n);
  const hasEnglish = /(\beng(?:lish)?|ingles|v\.?o\.?|sub\.?eng)/.test(n);
  const isMulti = /(multi|dual)/.test(n);

  if (isMulti || (hasSpanish && hasEnglish)) return 'multi';
  if (hasSpanish) return 'es';
  if (hasEnglish) return 'en';
  return 'unknown';
}

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { translations, type Language, type Dict } from '@/lib/translations';

type LanguageContextValue = {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  dir: 'rtl' | 'ltr';
  t: Dict;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'ar';
    const stored = window.localStorage.getItem('lang') as Language | null;
    if (stored === 'ar' || stored === 'en') return stored;
    return 'ar';
  });

  const dir: 'rtl' | 'ltr' = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = dir;
    window.localStorage.setItem('lang', lang);
  }, [lang, dir]);

  const setLang = (l: Language) => setLangState(l);
  const toggleLang = () => setLangState((l) => (l === 'ar' ? 'en' : 'ar'));

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, dir, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}

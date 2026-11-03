import { Facebook, Instagram, Linkedin, Mail } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';

export function Footer() {
  const { lang } = useLang();

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/profile.php?id=100066390075022' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
   
    { name: 'Email', icon: Mail, href: 'mailto:muhamed.elbaradei7@gmail.com' },
  ];

  return (
    <footer className="border-t border-black/10 dark:border-white/10 bg-[var(--color-surface)] py-12 text-[var(--color-text-primary)]" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* حقوق النشر والاسم */}
          <div className="text-center md:text-right space-y-1">
            <p className="font-serif text-lg font-semibold text-[var(--color-text-primary)]">
              {lang === 'ar' ? 'محمد البرادعي' : 'Mohamed Elbaradei'}
            </p>
            <p className="text-xs text-[var(--color-text-secondary)]">
              © {new Date().getFullYear()} {lang === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
            </p>
          </div>

          {/* أزرار التواصل الاجتماعي */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  target={item.name === 'Email' ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/5 text-[var(--color-text-primary)] transition-all duration-300 hover:border-[var(--color-bronze)] hover:bg-[var(--color-bronze)] hover:text-black hover:scale-110 shadow-sm"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>

        </div>
      </div>
    </footer>
  );
}
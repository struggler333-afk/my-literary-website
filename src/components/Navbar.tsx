import { useEffect, useState } from 'react';
import { Languages, Menu, Moon, Sun, X, LogIn, LogOut, User } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLang } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';

type NavbarProps = {
  onNavigate: (page: 'site' | 'admin' | 'login') => void;
  currentPage: 'site' | 'admin' | 'login';
  onResetStory?: () => void;
  user?: { email?: string } | null;
};

export function Navbar({ onNavigate, currentPage, onResetStory, user }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const { t, lang, toggleLang } = useLang();
  const { signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // التحقق هل المستخدم الحالي هو الأدمن المعرّف في ملف .env أم لا
  const isAdmin = user?.email && user.email === import.meta.env.VITE_ADMIN_EMAIL;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    handler();
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = [
    { label: t.nav.home, href: '#hero' },
    { label: t.nav.works, href: '#works' },
    { label: t.nav.store, href: '#store' },
    { label: t.nav.contact, href: '#contact' },
    { label: t.nav.about, href: '#about' }
  ];
  
  const transparentMuted = theme === 'dark' ? 'text-white/70 hover:text-[var(--color-bronze)]' : 'text-black/65 hover:text-black';
  const solidMuted = 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]';

  const handleLinkClick = (href: string) => {
    setMenuOpen(false);
    if (onResetStory) {
      onResetStory();
    }
    if (currentPage !== 'site') {
      onNavigate('site');
      window.setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 100);
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBrandClick = () => {
    if (onResetStory) onResetStory();
    onNavigate('site');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onResetStory) onResetStory();
    onNavigate('login');
  };

  const handleSignOut = async () => {
    await signOut();
    onNavigate('site');
  };

  // استخراج اسم المستخدم من البريد الإلكتروني (ما قبل علامة @) أو عرض البريد كاملاً
  const userName = user?.email ? user.email.split('@')[0] : '';

  return (
    <header className={`fixed inset-x-0 top-0 z-40 border-b transition-all duration-300 ${scrolled ? 'border-[var(--color-border)] bg-[var(--color-background)]/90 backdrop-blur-xl' : 'border-transparent bg-transparent'}`}>
      <nav className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-12">
        <button onClick={handleBrandClick} className="group flex items-center gap-3 text-[var(--color-text-primary)]" aria-label={t.nav.home}>
          <img 
            src="/logo.png" 
            alt="محمد البرادعي" 
            className="h-10 w-auto object-contain transition-transform duration-200 hover:scale-105" 
          />
          <span className="text-sm font-medium tracking-tight sm:text-base">{t.nav.brand}</span>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <button key={link.href} onClick={() => handleLinkClick(link.href)} className={`px-4 py-2 text-sm transition-colors ${scrolled ? solidMuted : transparentMuted}`}>
              {link.label}
            </button>
          ))}
          <button onClick={toggleLang} className={`mr-2 inline-flex items-center gap-1.5 border-r border-current/15 px-4 py-2 text-xs transition-colors ${scrolled ? solidMuted : transparentMuted}`} aria-label="Language" title={lang === 'ar' ? 'English' : 'العربية'}>
            <Languages size={16} />
            {lang === 'ar' ? 'EN' : 'ع'}
          </button>
          <button onClick={toggleTheme} className={`p-2 transition-colors ${scrolled ? solidMuted : transparentMuted}`} aria-label={t.nav.toggleTheme}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* حالات عرض الأزرار حسب تسجيل الدخول */}
          {user ? (
            <div className="mr-2 flex items-center gap-2">
              {/* زر لوحة التحكم إذا كان أدمن */}
              {isAdmin && (
                <button onClick={() => { if (onResetStory) onResetStory(); onNavigate('admin'); }} className="bg-[var(--color-bronze)] px-3 py-2 text-xs font-medium text-black transition-colors hover:bg-[var(--color-bronze-hover)]">
                  {t.nav.admin}
                </button>
              )}

              {/* اسم المستخدم */}
              <div className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[var(--color-text-primary)] bg-black/5 dark:bg-white/5 rounded-md">
                <User size={14} className="text-[var(--color-bronze)]" />
                <span>{userName}</span>
              </div>

              {/* زر تسجيل الخروج */}
              <button 
                onClick={handleSignOut} 
                className="inline-flex items-center gap-1 border border-red-500/50 px-3 py-2 text-xs font-medium text-red-600 dark:text-red-400 transition-colors hover:bg-red-50 dark:hover:bg-red-950/30 rounded-md"
                title="تسجيل الخروج"
              >
                <LogOut size={14} />
                <span>{lang === 'ar' ? 'خروج' : 'Logout'}</span>
              </button>
            </div>
          ) : (
            /* زر تسجيل الدخول للزوار */
            <button 
              type="button"
              onClick={handleLoginClick} 
              className="mr-2 inline-flex cursor-pointer items-center gap-1.5 bg-[var(--color-bronze)] px-4 py-2 text-xs font-medium text-black transition-colors hover:bg-[var(--color-bronze-hover)]"
            >
              <LogIn size={14} />
              {lang === 'ar' ? 'تسجيل الدخول' : 'Login'}
            </button>
          )}
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <button onClick={toggleLang} className={`p-2 text-xs transition-colors ${scrolled ? solidMuted : transparentMuted}`} aria-label="Language">{lang === 'ar' ? 'EN' : 'ع'}</button>
          <button onClick={toggleTheme} className={`p-2 transition-colors ${scrolled ? solidMuted : transparentMuted}`} aria-label={t.nav.toggleTheme}>{theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}</button>
          <button onClick={() => setMenuOpen((open) => !open)} className={`p-2 transition-colors ${scrolled ? solidMuted : transparentMuted}`} aria-label={t.nav.menu}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-background)] px-6 py-5 md:hidden">
          <div className="flex flex-col items-stretch gap-1 text-right">
            {links.map((link) => <button key={link.href} onClick={() => handleLinkClick(link.href)} className="border-b border-[var(--color-border)] py-3 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]">{link.label}</button>)}
            
            {user ? (
              <div className="mt-3 flex flex-col gap-2">
                {isAdmin && (
                  <button onClick={() => { setMenuOpen(false); if (onResetStory) onResetStory(); onNavigate('admin'); }} className="bg-[var(--color-bronze)] px-4 py-3 text-sm font-medium text-black text-center">
                    {t.nav.admin}
                  </button>
                )}
                <div className="py-2 px-3 text-sm font-medium text-[var(--color-text-primary)] bg-black/5 dark:bg-white/5 text-center rounded">
                  {userName}
                </div>
                <button onClick={() => { setMenuOpen(false); handleSignOut(); }} className="border border-red-500/50 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 text-center rounded">
                  {lang === 'ar' ? 'تسجيل الخروج' : 'Logout'}
                </button>
              </div>
            ) : (
              <button onClick={(e) => { setMenuOpen(false); handleLoginClick(e); }} className="mt-3 bg-[var(--color-bronze)] px-4 py-3 text-sm font-medium text-black text-center">
                {lang === 'ar' ? 'تسجيل الدخول' : 'Login'}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
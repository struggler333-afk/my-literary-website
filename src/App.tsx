import { useState } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Works } from '@/components/sections/Works';
import { Store } from '@/components/sections/Store';
import { Contact } from '@/components/sections/Contact';
import { About } from '@/components/sections/About';
import { Reflections } from '@/components/sections/Reflections';
import { Footer } from '@/components/sections/Footer';
import { AuthScreen } from '@/components/admin/AuthScreen';
import { Dashboard } from '@/components/admin/Dashboard';
import { ArrowRight, Calendar, BookOpen } from 'lucide-react';
import { type Story } from '@/lib/supabase';
import { formatDate } from '@/lib/format';
import { categoryMap, type Dict } from '@/lib/translations';
import { useLang } from '@/context/LanguageContext';

type Page = 'site' | 'admin' | 'login';

function translateCategory(category: string, t: Dict): string {
  const key = categoryMap[category];
  return key ? t.categories[key] : category;
}

function StoryView({ story, onBack }: { story: Story; onBack: () => void }) {
  const { t, lang } = useLang();

  return (
    <main className="min-h-screen bg-[var(--color-ivory)] pt-32 pb-24 text-[var(--color-ivory-text)] dark:bg-[var(--color-background)] dark:text-[var(--color-text-primary)] sm:pt-40" dir="rtl">
      <article className="mx-auto max-w-4xl px-6 sm:px-10 text-right">
        <button 
          onClick={onBack}
          className="group mb-10 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-bronze)] transition-colors hover:text-[var(--color-text-primary)]"
        >
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          <span>العودة إلى الأعمال والخواطر</span>
        </button>

        <div className="mb-6 flex items-center justify-start gap-3 text-sm text-[var(--color-text-secondary)]">
          <span className="border border-[var(--color-bronze)]/50 px-3 py-1 text-xs text-[var(--color-bronze)]">
            {translateCategory(story.category, t)}
          </span>
          <span className="flex items-center gap-1.5"><Calendar size={14} />{formatDate(story.created_at, lang)}</span>
        </div>

        <h1 className="font-serif text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl mb-8">
          {story.title}
        </h1>

        <div className="mb-10 overflow-hidden rounded-sm bg-[var(--color-surface)]">
          {story.cover_image_url ? (
            <img
              src={story.cover_image_url}
              alt={story.title}
              className="w-full max-h-[35rem] object-cover shadow-md"
            />
          ) : (
            <div className="flex h-96 w-full items-center justify-center bg-[linear-gradient(135deg,#242421,#393832)]">
              <div className="flex h-20 w-20 items-center justify-center border border-[var(--color-bronze)]/50 text-[var(--color-bronze)]">
                <BookOpen size={30} strokeWidth={1.2} />
              </div>
            </div>
          )}
        </div>

        {story.excerpt && (
          <p className="literary-copy mb-10 border-r-2 border-[var(--color-bronze)] pr-6 text-xl italic leading-[2] text-[var(--color-ivory-text)] dark:text-[var(--color-text-primary)]">
            {story.excerpt}
          </p>
        )}

        <div className="literary-copy whitespace-pre-wrap text-lg sm:text-xl leading-[2.2] text-[var(--color-ivory-text)] dark:text-[var(--color-text-primary)]">
          {story.body}
        </div>
        
        <div className="mt-16 border-t border-black/10 dark:border-white/10 pt-8">
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-2 bg-[var(--color-bronze)] px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-[var(--color-bronze-hover)]"
          >
            العودة لقائمة الأعمال
          </button>
        </div>
      </article>
    </main>
  );
}

function AppContent() {
  const { session, loading } = useAuth();
  const [page, setPage] = useState<Page>('site');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  const navigate = (p: Page) => {
    setPage(p);
    setSelectedStory(null);
    window.scrollTo(0, 0);
  };

  const userEmail = session?.user?.email?.trim().toLowerCase() || '';
  const adminEmail = (import.meta.env.VITE_ADMIN_EMAIL || '').trim().toLowerCase();
  const isAdmin = userEmail === adminEmail;

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)] transition-colors flex flex-col justify-between">
      <Navbar 
        onNavigate={navigate} 
        currentPage={page} 
        onResetStory={() => setSelectedStory(null)} 
        user={session?.user} 
      />

      <div className="flex-grow">
        {page === 'login' ? (
          /* عرض شاشة تسجيل الدخول بشكل مباشر وصريح عند الضغط على زر تسجيل الدخول */
          <AuthScreen 
            onBack={() => navigate('site')} 
            onLoginSuccess={(loggedInAsAdmin) => {
              if (loggedInAsAdmin) {
                navigate('admin');
              } else {
                navigate('site');
              }
            }}
          />
        ) : page === 'admin' ? (
          loading ? (
            <div className="min-h-screen flex items-center justify-center pt-16">
              <div className="w-8 h-8 border-2 border-amber-700 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : session ? (
            isAdmin ? (
              <Dashboard onBack={() => navigate('site')} />
            ) : (
              <>
                <Hero />
                <Works onSelectStory={(story) => { setSelectedStory(story); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
                <Reflections />
                <Store />
                <About />
                <Contact />
              </>
            )
          ) : (
            <AuthScreen 
              onBack={() => navigate('site')} 
              onLoginSuccess={(loggedInAsAdmin) => {
                if (loggedInAsAdmin) {
                  navigate('admin');
                } else {
                  navigate('site');
                }
              }}
            />
          )
        ) : selectedStory ? (
          <StoryView 
            story={selectedStory} 
            onBack={() => { setSelectedStory(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
          />
        ) : (
          <>
            <Hero />
            <Works onSelectStory={(story) => { setSelectedStory(story); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
            <Reflections />
            <Store />
            <About />
            <Contact />
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
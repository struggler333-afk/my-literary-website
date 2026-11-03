import { ArrowDown, ArrowLeft, BookOpen, MoveUpLeft } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';

export function Hero() {
  const { t } = useLang();

  return (
    <section id="hero" className="relative isolate min-h-screen overflow-hidden bg-[var(--color-background)] text-[var(--color-text-primary)]">
      <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(21,21,21,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(21,21,21,0.05)_1px,transparent_1px)] [background-size:56px_56px] dark:opacity-100 dark:[background-image:linear-gradient(rgba(250,248,243,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(250,248,243,0.035)_1px,transparent_1px)]" />
      <div className="pointer-events-none absolute left-0 top-1/3 h-64 w-64 rounded-full bg-[var(--color-bronze)]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-1/2 w-1/2 bg-gradient-to-tl from-[var(--color-bronze)]/10 to-transparent" />

      <div className="relative mx-auto grid min-h-screen max-w-[90rem] items-center gap-8 px-6 pb-16 pt-32 sm:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.85fr)] lg:gap-8 lg:px-12 lg:pb-10 lg:pt-36">
        <div className="relative z-10 order-2 max-w-3xl text-right lg:order-1 pt-6">
          <div className="mb-4 flex items-center justify-end gap-3 text-sm text-[var(--color-text-secondary)] motion-safe:animate-fade-in">
            <span className="h-px w-12 bg-[var(--color-bronze)]" />
            <span>{t.hero.tagline}</span>
          </div>
          <p className="mb-3 text-xs font-medium tracking-[0.18em] text-[var(--color-bronze)] sm:text-sm">01 / AUTHOR · STORYTELLER</p>
          
          {/* اسم الكاتب */}
          <h1 className="max-w-3xl font-serif text-[clamp(3rem,7vw,6.2rem)] font-semibold leading-[1.1] tracking-[-0.03em] motion-safe:animate-fade-up">
            {t.hero.titleLine1}
          </h1>
          
          {/* الجملة الترويجية بمسافة علوية مريحة وواضحة */}
          <p className="mt-6 max-w-2xl font-serif text-[clamp(1.2rem,2.4vw,2.2rem)] leading-[1.4] text-[var(--color-bronze)] motion-safe:animate-fade-up" style={{ animationDelay: '0.12s', opacity: 0 }}>
            {t.hero.titleLine2}
          </p>

          <div className="mt-8 max-w-xl border-r-2 border-[var(--color-bronze)] pr-5 motion-safe:animate-fade-up" style={{ animationDelay: '0.24s', opacity: 0 }}>
            <p className="literary-copy text-lg leading-[1.9] text-[var(--color-text-secondary)] sm:text-xl">{t.hero.subtitle}</p>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-start gap-3 motion-safe:animate-fade-up" style={{ animationDelay: '0.36s', opacity: 0 }}>
            <button onClick={() => document.querySelector('#works')?.scrollIntoView({ behavior: 'smooth' })} className="group inline-flex items-center gap-3 bg-[var(--color-bronze)] px-6 py-3.5 text-sm font-medium text-black transition-colors hover:bg-[var(--color-bronze-hover)]">
              <BookOpen size={18} />
              {t.hero.explore}
              <ArrowLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-1" />
            </button>
            <button onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center gap-3 border border-[var(--color-border)] px-6 py-3.5 text-sm font-medium text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-bronze)] hover:text-[var(--color-bronze)]">
              {t.hero.visitStore}
              <MoveUpLeft size={16} />
            </button>
          </div>
        </div>

        <div className="relative order-1 flex min-h-[25rem] items-end justify-center lg:order-2 lg:min-h-[42rem]">
          <div className="absolute bottom-8 left-1/2 h-[76%] w-[72%] -translate-x-1/2 border border-[var(--color-bronze)]/40" />
          <div className="absolute bottom-0 left-1/2 h-[84%] w-[72%] -translate-x-[42%] bg-[var(--color-bronze)]/10" />
          <img src="/images/PhotoRoom-20261028_184549.png" alt="صورة محمد البرادعي، كاتب مصري وحكّاء" width="892" height="1200" fetchPriority="high" decoding="async" className="relative z-10 h-[28rem] w-auto max-w-full object-contain object-bottom motion-safe:animate-fade-up sm:h-[34rem] lg:h-[44rem]" style={{ animationDelay: '0.1s', opacity: 0 }} />
          <span className="absolute bottom-10 left-2 text-[10px] tracking-[0.18em] text-[var(--color-text-secondary)] [writing-mode:vertical-rl]">MOHAMED EL BARADEI</span>
        </div>
      </div>

      <button onClick={() => document.querySelector('#works')?.scrollIntoView({ behavior: 'smooth' })} className="absolute bottom-7 left-1/2 -translate-x-1/2 text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-bronze)] motion-safe:animate-bounce" aria-label={t.hero.scrollDown}>
        <ArrowDown size={20} strokeWidth={1.5} />
      </button>
    </section>
  );
}
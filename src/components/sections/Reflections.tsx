import { useEffect, useState } from 'react';
import { ArrowUpLeft } from 'lucide-react';
import { supabase, type Story } from '@/lib/supabase';
import { useLang } from '@/context/LanguageContext';

export function Reflections() {
  const { t } = useLang();
  const [reflections, setReflections] = useState<Story[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('stories')
        .select('*')
        .eq('published', true)
        .eq('category', 'تأمل')
        .order('created_at', { ascending: false })
        .limit(3);
      setReflections(data ?? []);
    };
    void load();
  }, []);

  if (reflections.length === 0) return null;

  return (
    <section id="reflections" className="bg-[var(--color-background)] px-6 py-24 text-[var(--color-text-primary)] sm:px-10 sm:py-32 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-end justify-between gap-6 border-b border-[var(--color-border)] pb-6">
          <div className="text-right">
            <p className="mb-4 text-sm font-medium tracking-[0.12em] text-[var(--color-bronze)]">{t.reflections.label}</p>
            <h2 className="font-serif text-3xl font-semibold sm:text-4xl">{t.reflections.title}</h2>
          </div>
          <span className="hidden text-xs text-[var(--color-text-secondary)] sm:block">{t.reflections.note}</span>
        </div>
        <div className="grid gap-0 md:grid-cols-3">
          {reflections.map((reflection, index) => (
            <article key={reflection.id} className={`group border-[var(--color-border)] px-0 py-7 text-right md:px-7 md:py-3 ${index > 0 ? 'border-t md:border-r md:border-t-0' : ''}`}>
              <span className="text-xs text-[var(--color-bronze)]">0{index + 1}</span>
              <h3 className="mt-8 font-serif text-2xl leading-tight transition-colors group-hover:text-[var(--color-bronze)]">{reflection.title}</h3>
              <p className="literary-copy mt-4 line-clamp-4 text-lg leading-[1.9] text-[var(--color-text-secondary)]">{reflection.excerpt}</p>
              <button type="button" onClick={() => document.querySelector('#works')?.scrollIntoView({ behavior: 'smooth' })} className="mt-7 inline-flex items-center gap-2 text-sm text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-bronze)]">
                {t.reflections.read}
                <ArrowUpLeft size={15} />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

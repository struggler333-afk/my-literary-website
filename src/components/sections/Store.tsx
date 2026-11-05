import { useEffect, useState } from 'react';
import { BookMarked, Download, ExternalLink, ShoppingBag } from 'lucide-react';
import { supabase, type Book } from '@/lib/supabase';
import { formatPrice } from '@/lib/format';
import { Modal } from '@/components/ui/Modal';
import { useLang } from '@/context/LanguageContext';

export function Store() {
  const { t } = useLang();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState<Book | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data, error: loadError } = await supabase
        .from('books')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
      if (loadError) setError(true);
      setBooks(data ?? []);
      setLoading(false);
    };
    void load();
  }, []);

  return (
    <section id="store" className="bg-[var(--color-background-elevated)] py-24 text-[var(--color-text-primary)] sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        <div className="mb-14 flex flex-col gap-5 border-b border-white/10 pb-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl text-right">
            <p className="mb-4 text-sm font-medium tracking-[0.12em] text-[var(--color-bronze)]">{t.store.label}</p>
            <h2 className="font-serif text-3xl font-semibold leading-tight sm:text-4xl">{t.store.title}</h2>
          </div>
          <p className="max-w-md text-right text-base leading-[1.9] text-[var(--color-text-secondary)]">{t.store.desc}</p>
        </div>

        {loading ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => <div key={item} className="h-96 animate-pulse bg-white/5" />)}
          </div>
        ) : error ? (
          <p className="border border-[var(--color-error)]/40 p-8 text-center text-[var(--color-error)]">{t.store.empty}</p>
        ) : books.length === 0 ? (
          <p className="py-12 text-center font-serif text-xl text-[var(--color-text-secondary)]">{t.store.empty}</p>
        ) : (
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <article key={book.id} className="group text-right">
                <button type="button" onClick={() => setSelected(book)} className="block w-full text-right outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-bronze)]">
                  <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-surface)]">
                    {book.cover_image_url ? (
                      <img src={book.cover_image_url} alt={book.title} loading="lazy" decoding="async" className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.03]" />
                    ) : (
                      <div className="flex h-full items-center justify-center"><BookMarked className="text-[var(--color-bronze)]" size={48} strokeWidth={1} /></div>
                    )}
                    {book.price_cents === 0 && <span className="absolute left-4 top-4 bg-[var(--color-ivory)] px-3 py-1 text-xs font-medium text-[var(--color-ivory-text)]">{t.store.free}</span>}
                  </div>
                  <div className="border-b border-white/10 pb-5 pt-5">
                    <h3 className="font-serif text-2xl font-semibold transition-colors group-hover:text-[var(--color-bronze-hover)]">{book.title}</h3>
                    {book.author && <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{t.store.by} {book.author}</p>}
                    <p className="literary-copy mt-3 line-clamp-3 text-base leading-[1.8] text-[var(--color-text-secondary)]">{book.description}</p>
                    <div className="mt-5 flex items-center justify-between"><span className="font-serif text-xl text-[var(--color-bronze)]">{formatPrice(book.price_cents, t.store.free)}</span><span className="text-sm text-[var(--color-bronze-hover)]">{book.price_cents === 0 ? t.store.getBook : t.store.viewOptions}</span></div>
                  </div>
                </button>
              </article>
            ))}
          </div>
        )}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.title} maxWidth="max-w-md">
        {selected && (
          <div className="space-y-6 text-right">
            <div className="flex gap-5" dir="rtl">
              <div className="relative aspect-[3/4] h-40 w-30 shrink-0 overflow-hidden bg-[var(--color-surface)]">
                {selected.cover_image_url ? <img src={selected.cover_image_url} alt={selected.title} className="h-full w-full object-contain" /> : <div className="flex h-full items-center justify-center"><BookMarked className="text-[var(--color-bronze)]" size={28} /></div>}
              </div>
              <div className="flex-1">
                {selected.author && <p className="mb-2 text-sm text-[var(--color-text-secondary)]">{t.store.by} {selected.author}</p>}
                <p className="literary-copy text-base leading-[1.9] text-[var(--color-ivory-text)] dark:text-[var(--color-text-primary)]">{selected.description}</p>
              </div>
            </div>
            <div className="border-y border-black/10 py-4 dark:border-white/10"><p className="text-sm text-[var(--color-text-secondary)]">{t.store.price}</p><p className="mt-1 font-serif text-3xl text-[var(--color-bronze)]">{formatPrice(selected.price_cents, t.store.free)}</p></div>
            <div className="flex flex-col gap-3">
              {selected.price_cents === 0 && selected.download_url && <a href={selected.download_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[var(--color-bronze)] px-5 py-3 font-medium text-[var(--color-ivory-text)] transition-colors hover:bg-[var(--color-bronze-hover)]"><Download size={18} />{t.store.downloadFree}</a>}
              {selected.price_cents > 0 && selected.buy_url && <a href={selected.buy_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[var(--color-bronze)] px-5 py-3 font-medium text-[var(--color-ivory-text)] transition-colors hover:bg-[var(--color-bronze-hover)]"><ShoppingBag size={18} />{t.store.buyNow}<ExternalLink size={14} /></a>}
              {selected.price_cents > 0 && selected.download_url && <a href={selected.download_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-black/15 px-5 py-3 font-medium text-[var(--color-ivory-text)] transition-colors hover:border-[var(--color-bronze)] dark:border-white/15 dark:text-[var(--color-text-primary)]"><Download size={18} />{t.store.downloadSample}</a>}
              {!selected.download_url && !selected.buy_url && <p className="py-4 text-center text-sm italic text-[var(--color-text-secondary)]">{t.store.comingSoon}</p>}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { BookOpen, Calendar, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { supabase, type Story } from '@/lib/supabase';
import { formatDate } from '@/lib/format';
import { categoryMap, type Dict } from '@/lib/translations';
import { useLang } from '@/context/LanguageContext';

function translateCategory(category: string, t: Dict): string {
  const key = categoryMap[category];
  return key ? t.categories[key] : category;
}

function StoryCard({ story, onSelect }: { story: Story; onSelect: (story: Story) => void }) {
  const { lang } = useLang();
  const categoryLabel = translateCategory(story.category, useLang().t);

  return (
    <article
      tabIndex={0}
      role="button"
      onClick={() => onSelect(story)}
      onKeyDown={(event: KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onSelect(story);
        }
      }}
      className="group cursor-pointer flex flex-col w-[300px] sm:w-[340px] lg:w-[370px] bg-white dark:bg-[#181715] border-2 border-black/10 dark:border-white/10 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-[var(--color-bronze)] hover:bg-[#f6f1e7] dark:hover:bg-[#23211c] hover:shadow-2xl outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-bronze)] text-right flex-shrink-0"
    >
      <div className="relative overflow-hidden aspect-[3/4] bg-[#eae5db] dark:bg-[#22201c] transition-colors duration-300 group-hover:bg-[#f0eae0] dark:group-hover:bg-[#2c2924]">
        {story.cover_image_url ? (
          <img
            src={story.cover_image_url}
            alt={story.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[var(--color-bronze)]">
            <BookOpen size={36} strokeWidth={1.2} />
          </div>
        )}
        {categoryLabel && (
          <span className="absolute left-3 top-3 border border-white/20 bg-black/70 px-3 py-1 text-xs text-white backdrop-blur-sm">
            {categoryLabel}
          </span>
        )}
      </div>

      <div className="flex flex-col flex-grow p-5 text-right transition-colors duration-300">
        <h3 className="font-serif text-xl font-semibold leading-snug transition-colors duration-200 text-gray-900 dark:text-white group-hover:text-[var(--color-bronze)] mb-2 line-clamp-1">
          {story.title}
        </h3>
        <p className="literary-copy line-clamp-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white mb-4 flex-grow transition-colors duration-200">
          {story.excerpt}
        </p>
        <div className="flex items-center justify-start gap-2 text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 pt-3 border-t border-black/5 dark:border-white/5 transition-colors duration-200">
          <Calendar size={13} />
          <span>{formatDate(story.created_at, lang)}</span>
        </div>
      </div>
    </article>
  );
}

export function Works({ onSelectStory }: { onSelectStory: (story: Story) => void }) {
  const { t } = useLang();
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 390;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const load = async () => {
      const { data, error: loadError } = await supabase
        .from('stories')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
      if (loadError) setError(true);
      setStories(data ?? []);
      setLoading(false);
    };
    void load();
  }, []);

  const categories = useMemo(() => Array.from(new Set(stories.map((story) => story.category))), [stories]);
  const filteredStories = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return stories.filter((story) => {
      const matchesCategory = !category || story.category === category;
      const searchable = `${story.title} ${story.excerpt} ${story.body}`.toLocaleLowerCase();
      return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [category, query, stories]);

  return (
    <section id="works" className="bg-[var(--color-ivory)] py-24 text-[var(--color-ivory-text)] dark:bg-[var(--color-background)] dark:text-[var(--color-text-primary)] sm:py-32 overflow-hidden" dir="rtl">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        <div className="mb-10 flex flex-col gap-8 border-b border-black/10 pb-10 dark:border-white/10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl text-right">
            <span className="mb-3 block text-sm font-medium tracking-[0.12em] text-[var(--color-bronze)]">{t.works.label}</span>
            <h2 className="font-serif text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">{t.works.title}</h2>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="relative block min-w-64">
              <Search size={17} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t.works.search}
                className="w-full border border-black/15 bg-white/50 py-3 pr-10 pl-4 text-sm text-[var(--color-ivory-text)] placeholder:text-black/45 focus:border-[var(--color-bronze)] focus:outline-none dark:border-white/15 dark:bg-white/5 dark:text-[var(--color-text-primary)] dark:placeholder:text-white/45 text-right"
                aria-label={t.works.search}
              />
            </label>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="border border-black/15 bg-white/50 px-4 py-3 text-sm text-[var(--color-ivory-text)] focus:border-[var(--color-bronze)] focus:outline-none dark:border-white/15 dark:bg-white/5 dark:text-[var(--color-text-primary)] text-right"
              aria-label={t.works.all}
            >
              <option value="">{t.works.all}</option>
              {categories.map((item) => <option key={item} value={item}>{translateCategory(item, t)}</option>)}
            </select>
          </div>
        </div>

        <div className="mb-8 flex items-center justify-between">
          <p className="text-sm text-[var(--color-text-secondary)]">
            عدد الأعمال الظاهرة: {filteredStories.length}
          </p>

          <div className="flex items-center gap-3.5">
            <button
              onClick={() => scroll('right')}
              className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--color-bronze)] bg-[var(--color-surface)] text-[var(--color-text-primary)] transition-all hover:bg-[var(--color-bronze)] hover:text-black shadow-lg hover:scale-105 cursor-pointer"
              aria-label="Previous"
            >
              <ChevronRight size={28} strokeWidth={2.2} />
            </button>
            <button
              onClick={() => scroll('left')}
              className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--color-bronze)] bg-[var(--color-surface)] text-[var(--color-text-primary)] transition-all hover:bg-[var(--color-bronze)] hover:text-black shadow-lg hover:scale-105 cursor-pointer"
              aria-label="Next"
            >
              <ChevronLeft size={28} strokeWidth={2.2} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex gap-6 overflow-hidden">
            {[1, 2, 3].map((item) => <div key={item} className="w-[340px] h-80 animate-pulse bg-black/5 dark:bg-white/5 flex-shrink-0" />)}
          </div>
        ) : error ? (
          <p className="border border-[var(--color-error)]/40 p-8 text-center text-[var(--color-error)]">{t.works.error}</p>
        ) : filteredStories.length === 0 ? (
          <p className="py-12 text-center font-serif text-xl text-[var(--color-text-secondary)]">{t.works.empty}</p>
        ) : (
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory focus:outline-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredStories.map((story) => (
              <div key={story.id} className="snap-start flex-shrink-0">
                <StoryCard story={story} onSelect={onSelectStory} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
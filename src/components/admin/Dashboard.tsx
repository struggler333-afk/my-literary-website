import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, BookOpen, BookMarked, Mail, LogOut, Eye, EyeOff, CheckCircle2, Circle, ArrowLeft } from 'lucide-react';
import { supabase, type Story, type Book, type Message } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { useLang } from '@/context/LanguageContext';
import { formatDate, formatPrice } from '@/lib/format';
import { Button } from '@/components/ui/Button';
import { StoryEditor } from './StoryEditor';
import { BookEditor } from './BookEditor';
import { ConfirmDialog } from './ConfirmDialog';

type Tab = 'stories' | 'books' | 'messages';
type DashboardProps = { onBack: () => void };

export function Dashboard({ onBack }: DashboardProps) {
  const { signOut, user } = useAuth();
  const { t, lang } = useLang();
  const [tab, setTab] = useState<Tab>('stories');

  const [stories, setStories] = useState<Story[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  const [storyEditor, setStoryEditor] = useState<{ open: boolean; story: Story | null }>({ open: false, story: null });
  const [bookEditor, setBookEditor] = useState<{ open: boolean; book: Book | null }>({ open: false, book: null });
  const [confirm, setConfirm] = useState<{ open: boolean; id: string; table: string; label: string }>({ open: false, id: '', table: '', label: '' });

  const loadStories = async () => {
    const { data } = await supabase.from('stories').select('*').order('created_at', { ascending: false });
    setStories(data ?? []);
  };
  const loadBooks = async () => {
    const { data } = await supabase.from('books').select('*').order('created_at', { ascending: false });
    setBooks(data ?? []);
  };
  const loadMessages = async () => {
    const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
    setMessages(data ?? []);
  };

  useEffect(() => {
    loadStories();
    loadBooks();
    loadMessages();
  }, []);

  const handleDelete = async () => {
    const { id, table, label } = confirm;
    await supabase.from(table).delete().eq('id', id);
    setConfirm({ open: false, id: '', table: '', label: '' });
    if (table === 'stories') loadStories();
    if (table === 'books') loadBooks();
    if (table === 'messages') loadMessages();
    void label;
  };

  const toggleStoryPublished = async (story: Story) => {
    await supabase.from('stories').update({ published: !story.published }).eq('id', story.id);
    loadStories();
  };
  const toggleBookPublished = async (book: Book) => {
    await supabase.from('books').update({ published: !book.published }).eq('id', book.id);
    loadBooks();
  };
  const toggleMessageRead = async (msg: Message) => {
    await supabase.from('messages').update({ read: !msg.read }).eq('id', msg.id);
    loadMessages();
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  const tabs: { key: Tab; label: string; icon: typeof BookOpen; count?: number }[] = [
    { key: 'stories', label: t.dash.stories, icon: BookOpen, count: stories.length },
    { key: 'books', label: t.dash.books, icon: BookMarked, count: books.length },
    { key: 'messages', label: t.dash.messages, icon: Mail, count: unreadCount || undefined },
  ];

  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-950 pt-16">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif text-3xl text-ink-900 dark:text-ink-50 font-semibold">{t.dash.title}</h1>
            <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">
              {t.dash.signedInAs} {user?.email}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" onClick={onBack}>
              <ArrowLeft size={16} /> {t.dash.viewSite}
            </Button>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut size={16} /> {t.dash.signOut}
            </Button>
          </div>
        </div>

        <div className="flex gap-1 mb-6 border-b border-ink-200 dark:border-ink-700 overflow-x-auto">
          {tabs.map((tabItem) => (
            <button
              key={tabItem.key}
              onClick={() => setTab(tabItem.key)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                tab === tabItem.key
                  ? 'border-amber-700 dark:border-amber-500 text-amber-700 dark:text-amber-500'
                  : 'border-transparent text-ink-500 dark:text-ink-400 hover:text-ink-800 dark:hover:text-ink-200'
              }`}
            >
              <tabItem.icon size={18} />
              {tabItem.label}
              {tabItem.count !== undefined && (
                <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-ink-200 dark:bg-ink-700 text-ink-700 dark:text-ink-200">
                  {tabItem.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {tab === 'stories' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-serif text-2xl text-ink-800 dark:text-ink-100">{t.dash.manageStories}</h2>
              <Button size="sm" onClick={() => setStoryEditor({ open: true, story: null })}>
                <Plus size={16} /> {t.dash.newStory}
              </Button>
            </div>
            {stories.length === 0 ? (
              <EmptyState message={t.dash.noStories} />
            ) : (
              <div className="space-y-3">
                {stories.map((s) => (
                  <Row
                    key={s.id}
                    title={s.title}
                    subtitle={`${s.category} · ${formatDate(s.created_at, lang)}`}
                    published={s.published}
                    publishedLabel={t.dash.published}
                    draftLabel={t.dash.draft}
                    publishTitle={s.published ? t.dash.unpublish : t.dash.publish}
                    editTitle={t.dash.edit}
                    deleteTitle={t.dash.delete}
                    onTogglePublish={() => toggleStoryPublished(s)}
                    onEdit={() => setStoryEditor({ open: true, story: s })}
                    onDelete={() => setConfirm({ open: true, id: s.id, table: 'stories', label: s.title })}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'books' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-serif text-2xl text-ink-800 dark:text-ink-100">{t.dash.manageBooks}</h2>
              <Button size="sm" onClick={() => setBookEditor({ open: true, book: null })}>
                <Plus size={16} /> {t.dash.newBook}
              </Button>
            </div>
            {books.length === 0 ? (
              <EmptyState message={t.dash.noBooks} />
            ) : (
              <div className="space-y-3">
                {books.map((b) => (
                  <Row
                    key={b.id}
                    title={b.title}
                    subtitle={`${b.author || '—'} · ${formatPrice(b.price_cents, t.store.free)} · ${formatDate(b.created_at, lang)}`}
                    published={b.published}
                    publishedLabel={t.dash.published}
                    draftLabel={t.dash.draft}
                    publishTitle={b.published ? t.dash.unpublish : t.dash.publish}
                    editTitle={t.dash.edit}
                    deleteTitle={t.dash.delete}
                    onTogglePublish={() => toggleBookPublished(b)}
                    onEdit={() => setBookEditor({ open: true, book: b })}
                    onDelete={() => setConfirm({ open: true, id: b.id, table: 'books', label: b.title })}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'messages' && (
          <div>
            <h2 className="font-serif text-2xl text-ink-800 dark:text-ink-100 mb-4">{t.dash.contactMessages}</h2>
            {messages.length === 0 ? (
              <EmptyState message={t.dash.noMessages} />
            ) : (
              <div className="space-y-3">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`rounded-xl border p-5 transition-colors ${
                      m.read
                        ? 'bg-white dark:bg-ink-900 border-ink-200 dark:border-ink-700'
                        : 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {m.read ? (
                            <CheckCircle2 size={16} className="text-ink-400" />
                          ) : (
                            <Circle size={16} className="text-amber-600 dark:text-amber-500" />
                          )}
                          <span className="font-medium text-ink-900 dark:text-ink-50">{m.name}</span>
                          <span className="text-xs text-ink-400">· {formatDate(m.created_at, lang)}</span>
                        </div>
                        <p className="text-sm text-ink-600 dark:text-ink-400 mb-2" dir="ltr">{m.email}</p>
                        <p className="text-sm text-ink-700 dark:text-ink-200 leading-relaxed">{m.message}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => toggleMessageRead(m)}
                          className="p-2 rounded-lg text-ink-500 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
                          title={m.read ? t.dash.markUnread : t.dash.markRead}
                        >
                          {m.read ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                        <button
                          onClick={() => setConfirm({ open: true, id: m.id, table: 'messages', label: m.name })}
                          className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                          title={t.dash.delete}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <StoryEditor
        open={storyEditor.open}
        story={storyEditor.story}
        onClose={() => setStoryEditor({ open: false, story: null })}
        onSaved={() => { setStoryEditor({ open: false, story: null }); loadStories(); }}
      />
      <BookEditor
        open={bookEditor.open}
        book={bookEditor.book}
        onClose={() => setBookEditor({ open: false, book: null })}
        onSaved={() => { setBookEditor({ open: false, book: null }); loadBooks(); }}
      />
      <ConfirmDialog
        open={confirm.open}
        title={t.confirm.title}
        message={t.dash.deleteMessage(confirm.label)}
        onConfirm={handleDelete}
        onCancel={() => setConfirm({ open: false, id: '', table: '', label: '' })}
      />
    </div>
  );
}

function Row({
  title,
  subtitle,
  published,
  publishedLabel,
  draftLabel,
  publishTitle,
  editTitle,
  deleteTitle,
  onTogglePublish,
  onEdit,
  onDelete,
}: {
  title: string;
  subtitle: string;
  published: boolean;
  publishedLabel: string;
  draftLabel: string;
  publishTitle: string;
  editTitle: string;
  deleteTitle: string;
  onTogglePublish: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-700 p-4 hover:shadow-sm transition-shadow">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-ink-900 dark:text-ink-50 truncate">{title}</span>
          <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
            published
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              : 'bg-ink-200 text-ink-500 dark:bg-ink-700 dark:text-ink-400'
          }`}>
            {published ? publishedLabel : draftLabel}
          </span>
        </div>
        <p className="text-xs text-ink-500 dark:text-ink-400 mt-1 truncate">{subtitle}</p>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={onTogglePublish}
          className="p-2 rounded-lg text-ink-500 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
          title={publishTitle}
        >
          {published ? <Eye size={16} /> : <EyeOff size={16} />}
        </button>
        <button
          onClick={onEdit}
          className="p-2 rounded-lg text-ink-500 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
          title={editTitle}
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={onDelete}
          className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
          title={deleteTitle}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-dashed border-ink-300 dark:border-ink-600 p-12 text-center">
      <p className="text-ink-500 dark:text-ink-400">{message}</p>
    </div>
  );
}

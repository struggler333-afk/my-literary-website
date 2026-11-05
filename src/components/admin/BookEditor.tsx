import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { ImagePlus, Trash2, Upload } from 'lucide-react';
import { supabase, type Book } from '@/lib/supabase';
import { Input, Textarea } from '@/components/ui/Field';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { useLang } from '@/context/LanguageContext';

type BookEditorProps = {
  open: boolean;
  book: Book | null;
  onClose: () => void;
  onSaved: () => void;
};

type BookForm = {
  title: string;
  author: string;
  description: string;
  price_cents: number;
  cover_image_url: string | null;
  download_url: string | null;
  buy_url: string | null;
  published: boolean;
};

const empty: BookForm = {
  title: '',
  author: '',
  description: '',
  price_cents: 0,
  cover_image_url: null,
  download_url: '',
  buy_url: '',
  published: false,
};

const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const maxImageSize = 5 * 1024 * 1024;

function getStoragePath(url: string | null): string | null {
  if (!url) return null;
  const marker = '/storage/v1/object/public/story-covers/';
  const markerIndex = url.indexOf(marker);
  return markerIndex === -1 ? null : decodeURIComponent(url.slice(markerIndex + marker.length));
}

export function BookEditor({ open, book, onClose, onSaved }: BookEditorProps) {
  const { t } = useLang();
  const [form, setForm] = useState<BookForm>(empty);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const isEditing = !!book;

  useEffect(() => {
    if (!open) return;
    setForm(book ? {
      title: book.title || '',
      author: book.author || '',
      description: book.description || '',
      price_cents: book.price_cents || 0,
      cover_image_url: book.cover_image_url || null,
      download_url: book.download_url || '',
      buy_url: book.buy_url || '',
      published: !!book.published,
    } : empty);
    setSelectedFile(null);
    setPreviewUrl(null);
    setError('');
  }, [open, book]);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (!allowedImageTypes.includes(file.type) || file.size > maxImageSize) {
      setError('يرجى اختيار صورة صحيحة (أقل من 5 ميجابايت)');
      return;
    }
    setError('');
    setSelectedFile(file);
  };

  const removeCover = () => {
    setSelectedFile(null);
    setForm({ ...form, cover_image_url: null });
    setError('');
  };

  const uploadCover = async (file: File): Promise<string | null> => {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) return null;
    const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const path = `${userData.user.id}/${crypto.randomUUID()}.${extension}`;
    const { error: uploadError } = await supabase.storage
      .from('story-covers')
      .upload(path, file, { cacheControl: '3600', contentType: file.type, upsert: false });
    if (uploadError) return null;
    return supabase.storage.from('story-covers').getPublicUrl(path).data.publicUrl;
  };

  const deleteCover = async (url: string | null) => {
    const path = getStoragePath(url);
    if (!path) return;
    const { error: deleteError } = await supabase.storage.from('story-covers').remove([path]);
    if (deleteError) console.error('book cover cleanup failed', deleteError);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    const oldCoverUrl = book?.cover_image_url ?? null;
    let coverImageUrl = form.cover_image_url;
    let uploadedCoverUrl: string | null = null;

    if (selectedFile) {
      uploadedCoverUrl = await uploadCover(selectedFile);
      if (!uploadedCoverUrl) {
        setError('فشل رفع الصورة، تأكد من الاتصال أو حجم الملف');
        setBusy(false);
        return;
      }
      coverImageUrl = uploadedCoverUrl;
    }

    const payload = {
      title: form.title.trim(),
      author: form.author.trim(),
      description: form.description.trim(),
      price_cents: Number(form.price_cents) || 0,
      cover_image_url: coverImageUrl?.trim() || null,
      download_url: form.download_url.trim() || null,
      buy_url: form.buy_url.trim() || null,
      published: form.published,
    };

    if (!payload.title) {
      if (uploadedCoverUrl) await deleteCover(uploadedCoverUrl);
      setError('عنوان الكتاب مطلوب');
      setBusy(false);
      return;
    }

    const { error: dbError } = isEditing
      ? await supabase.from('books').update(payload).eq('id', book!.id)
      : await supabase.from('books').insert(payload);

    if (dbError) {
      if (uploadedCoverUrl) await deleteCover(uploadedCoverUrl);
      console.error('book save failed', dbError);
      setError(dbError.message);
      setBusy(false);
      return;
    }

    if (oldCoverUrl && oldCoverUrl !== payload.cover_image_url) {
      await deleteCover(oldCoverUrl);
    }
    setBusy(false);
    onSaved();
  };

  const displayedCover = previewUrl ?? form.cover_image_url;

  return (
    <Modal open={open} onClose={onClose} title={isEditing ? t.bookEditor.edit : t.bookEditor.new} maxWidth="max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label={t.bookEditor.titleLabel}
          value={form.title}
          onChange={(event) => setForm({ ...form, title: event.target.value })}
          placeholder={t.bookEditor.titlePlaceholder}
          disabled={busy}
        />
        <Input
          label={t.bookEditor.author}
          value={form.author}
          onChange={(event) => setForm({ ...form, author: event.target.value })}
          placeholder={t.bookEditor.authorPlaceholder}
          disabled={busy}
        />
        <Textarea
          label={t.bookEditor.desc}
          value={form.description}
          onChange={(event) => setForm({ ...form, description: event.target.value })}
          placeholder={t.bookEditor.descPlaceholder}
          rows={3}
          disabled={busy}
        />

        <div className="grid sm:grid-cols-2 gap-5 items-end">
          <Input
            label={t.bookEditor.price}
            type="number"
            value={form.price_cents}
            onChange={(event) => setForm({ ...form, price_cents: Number(event.target.value) })}
            placeholder="0"
            disabled={busy}
            dir="ltr"
          />

          <div className="space-y-2">
            <span className="block text-sm font-medium text-ink-700 dark:text-ink-200">صورة الغلاف</span>
            <label className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-ink-300 dark:border-ink-600 px-4 py-3 text-sm text-ink-600 dark:text-ink-300 hover:border-amber-600 hover:text-amber-700 dark:hover:text-amber-400 transition-colors cursor-pointer">
              <Upload size={17} />
              <span>اختر صورة الغلاف</span>
              <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={handleFileChange} disabled={busy} className="sr-only" />
            </label>
          </div>
        </div>

        {displayedCover ? (
          <div className="relative overflow-hidden rounded-xl border border-ink-200 dark:border-ink-700 bg-ink-100 dark:bg-ink-800">
            <img src={displayedCover} alt="غلاف الكتاب" className="h-44 w-full object-contain" />
            <div className="absolute inset-x-0 bottom-0 flex justify-end bg-gradient-to-t from-black/70 to-transparent p-3 pt-8">
              <button type="button" onClick={removeCover} disabled={busy} className="inline-flex items-center gap-2 rounded-lg bg-white/90 px-3 py-2 text-sm font-medium text-red-700 hover:bg-white disabled:opacity-50">
                <Trash2 size={16} />
                إزالة الصورة
              </button>
            </div>
          </div>
        ) : (
          <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-ink-200 dark:border-ink-700 bg-ink-50 dark:bg-ink-800/50 text-ink-400">
            <div className="text-center">
              <ImagePlus className="mx-auto mb-2" size={26} />
              <p className="text-sm">لم يتم اختيار صورة الغلاف</p>
            </div>
          </div>
        )}

        <Input
          label={t.bookEditor.downloadUrl}
          value={form.download_url}
          onChange={(event) => setForm({ ...form, download_url: event.target.value })}
          placeholder="https://..."
          disabled={busy}
          dir="ltr"
        />
        <Input
          label={t.bookEditor.buyUrl}
          value={form.buy_url}
          onChange={(event) => setForm({ ...form, buy_url: event.target.value })}
          placeholder="https://..."
          disabled={busy}
          dir="ltr"
        />
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(event) => setForm({ ...form, published: event.target.checked })}
            className="w-5 h-5 rounded border-ink-300 text-amber-700 focus:ring-amber-500"
            disabled={busy}
          />
          <span className="text-sm text-ink-700 dark:text-ink-200">{t.bookEditor.published}</span>
        </label>

        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="ghost" type="button" onClick={onClose} disabled={busy}>{t.bookEditor.cancel}</Button>
          <Button type="submit" disabled={busy}>{busy ? t.bookEditor.saving : isEditing ? t.bookEditor.save : t.bookEditor.create}</Button>
        </div>
      </form>
    </Modal>
  );
}
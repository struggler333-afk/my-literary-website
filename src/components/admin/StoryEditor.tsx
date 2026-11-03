import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { ImagePlus, Trash2, Upload } from 'lucide-react';
import { supabase, type Story } from '@/lib/supabase';
import { Input, Textarea, Select } from '@/components/ui/Field';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { useLang } from '@/context/LanguageContext';

type StoryEditorProps = {
  open: boolean;
  story: Story | null;
  onClose: () => void;
  onSaved: () => void;
};

type StoryForm = {
  title: string;
  excerpt: string;
  body: string;
  category: string;
  cover_image_url: string | null;
  published: boolean;
};

const empty: StoryForm = {
  title: '',
  excerpt: '',
  body: '',
  category: 'مقال',
  cover_image_url: null,
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

export function StoryEditor({ open, story, onClose, onSaved }: StoryEditorProps) {
  const { t } = useLang();
  const [form, setForm] = useState<StoryForm>(empty);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const isEditing = !!story;

  useEffect(() => {
    if (!open) return;
    setForm(story ? {
      title: story.title,
      excerpt: story.excerpt,
      body: story.body,
      category: story.category,
      cover_image_url: story.cover_image_url,
      published: story.published,
    } : empty);
    setSelectedFile(null);
    setPreviewUrl(null);
    setError('');
  }, [open, story]);

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
      setError(t.storyEditor.uploadError);
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
    if (deleteError) console.error('story cover cleanup failed', deleteError);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    const oldCoverUrl = story?.cover_image_url ?? null;
    let coverImageUrl = form.cover_image_url;
    let uploadedCoverUrl: string | null = null;

    if (selectedFile) {
      uploadedCoverUrl = await uploadCover(selectedFile);
      if (!uploadedCoverUrl) {
        setError(t.storyEditor.uploadError);
        setBusy(false);
        return;
      }
      coverImageUrl = uploadedCoverUrl;
    }

    const payload = {
      title: form.title.trim(),
      excerpt: form.excerpt.trim(),
      body: form.body.trim(),
      category: form.category,
      cover_image_url: coverImageUrl?.trim() || null,
      published: form.published,
    };

    if (!payload.title || !payload.excerpt) {
      if (uploadedCoverUrl) await deleteCover(uploadedCoverUrl);
      setError(t.storyEditor.errorRequired);
      setBusy(false);
      return;
    }

    const { error: dbError } = isEditing
      ? await supabase.from('stories').update(payload).eq('id', story!.id)
      : await supabase.from('stories').insert(payload);

    if (dbError) {
      if (uploadedCoverUrl) await deleteCover(uploadedCoverUrl);
      console.error('story save failed', dbError);
      setError(t.storyEditor.saveError);
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
    <Modal open={open} onClose={onClose} title={isEditing ? t.storyEditor.edit : t.storyEditor.new} maxWidth="max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label={t.storyEditor.titleLabel}
          value={form.title}
          onChange={(event) => setForm({ ...form, title: event.target.value })}
          placeholder={t.storyEditor.titlePlaceholder}
          disabled={busy}
        />
        <div className="grid sm:grid-cols-2 gap-5">
          <Select
            label={t.storyEditor.category}
            value={form.category}
            onChange={(event) => setForm({ ...form, category: event.target.value })}
            disabled={busy}
          >
            <option>مقال</option>
            <option>قصة قصيرة</option>
            <option>قصيدة</option>
            <option>مقتطف رواية</option>
            <option>تأمل</option>
          </Select>
          <div className="space-y-2">
            <span className="block text-sm font-medium text-ink-700 dark:text-ink-200">{t.storyEditor.coverUpload}</span>
            <label className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-ink-300 dark:border-ink-600 px-4 py-3 text-sm text-ink-600 dark:text-ink-300 hover:border-amber-600 hover:text-amber-700 dark:hover:text-amber-400 transition-colors cursor-pointer">
              <Upload size={17} />
              <span>{t.storyEditor.coverUrl}</span>
              <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={handleFileChange} disabled={busy} className="sr-only" />
            </label>
            <p className="text-xs text-ink-400">{t.storyEditor.coverHint}</p>
          </div>
        </div>

        {displayedCover ? (
          <div className="relative overflow-hidden rounded-xl border border-ink-200 dark:border-ink-700 bg-ink-100 dark:bg-ink-800">
            <img src={displayedCover} alt={t.storyEditor.coverUpload} className="h-44 w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 flex justify-end bg-gradient-to-t from-black/70 to-transparent p-3 pt-8">
              <button type="button" onClick={removeCover} disabled={busy} className="inline-flex items-center gap-2 rounded-lg bg-white/90 px-3 py-2 text-sm font-medium text-red-700 hover:bg-white disabled:opacity-50">
                <Trash2 size={16} />
                {t.storyEditor.removeCover}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-ink-200 dark:border-ink-700 bg-ink-50 dark:bg-ink-800/50 text-ink-400">
            <div className="text-center">
              <ImagePlus className="mx-auto mb-2" size={26} />
              <p className="text-sm">{t.storyEditor.coverUpload}</p>
            </div>
          </div>
        )}

        <Textarea
          label={t.storyEditor.excerpt}
          value={form.excerpt}
          onChange={(event) => setForm({ ...form, excerpt: event.target.value })}
          placeholder={t.storyEditor.excerptPlaceholder}
          rows={2}
          disabled={busy}
        />
        <Textarea
          label={t.storyEditor.body}
          value={form.body}
          onChange={(event) => setForm({ ...form, body: event.target.value })}
          placeholder={t.storyEditor.bodyPlaceholder}
          rows={8}
          disabled={busy}
        />
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(event) => setForm({ ...form, published: event.target.checked })}
            className="w-5 h-5 rounded border-ink-300 text-amber-700 focus:ring-amber-500"
            disabled={busy}
          />
          <span className="text-sm text-ink-700 dark:text-ink-200">{t.storyEditor.published}</span>
        </label>

        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="ghost" type="button" onClick={onClose} disabled={busy}>{t.storyEditor.cancel}</Button>
          <Button type="submit" disabled={busy}>{busy ? t.storyEditor.saving : isEditing ? t.storyEditor.save : t.storyEditor.create}</Button>
        </div>
      </form>
    </Modal>
  );
}

import { useState } from 'react';
import { LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLang } from '@/context/LanguageContext';
import { Input } from '@/components/ui/Field';
import { Button } from '@/components/ui/Button';

type AuthScreenProps = {
  onBack: () => void;
  onLoginSuccess?: (isAdmin: boolean) => void;
};

export function AuthScreen({ onBack, onLoginSuccess }: AuthScreenProps) {
  const { signIn, signUp } = useAuth();
  const { t } = useLang();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    const fn = mode === 'signin' ? signIn : signUp;
    const { error } = await fn(email.trim(), password);
    setBusy(false);

    if (error) {
      setError(error);
    } else {
      // التحقق مما إذا كان البريد المدخل هو بريد الأدمن
      const trimmedEmail = email.trim().toLowerCase();
      const adminEmail = (import.meta.env.VITE_ADMIN_EMAIL || '').trim().toLowerCase();
      const isAdmin = trimmedEmail === adminEmail;

      if (onLoginSuccess) {
        onLoginSuccess(isAdmin);
      }
    }
  };

  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-950 flex items-center justify-center px-6 pt-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 mb-4">
            <img
              src="/logo.png"
              alt={t.nav.brand}
              className="h-14 w-14 object-contain"
            />
          </div>
          <h1 className="font-serif text-3xl text-ink-900 dark:text-ink-50 font-semibold">
            {mode === 'signin' ? 'تسجيل الدخول' : t.auth.createAccount}
          </h1>
          <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">
            {mode === 'signin' ? 'أدخل بريدك الإلكتروني للمتابعة' : t.auth.signUpDesc}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 bg-white dark:bg-ink-900 rounded-2xl border border-ink-200 dark:border-ink-700 p-8 shadow-sm">
          <Input
            label={t.auth.email}
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            disabled={busy}
            dir="ltr"
          />
          <Input
            label={t.auth.password}
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            disabled={busy}
            minLength={6}
            dir="ltr"
          />

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <Button type="submit" size="lg" disabled={busy} className="w-full">
            {busy ? t.auth.pleaseWait : (
              <>
                {mode === 'signin' ? <LogIn size={18} /> : <UserPlus size={18} />}
                {mode === 'signin' ? t.auth.signIn : t.auth.signUp}
              </>
            )}
          </Button>

          <div className="text-center text-sm text-ink-500 dark:text-ink-400">
            {mode === 'signin' ? t.auth.noAccount : t.auth.hasAccount}
            <button
              type="button"
              onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(''); }}
              className="text-amber-700 dark:text-amber-500 font-medium hover:underline mx-1"
            >
              {mode === 'signin' ? t.auth.signUpLink : t.auth.signInLink}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <button onClick={onBack} className="text-sm text-ink-400 hover:text-ink-600 dark:hover:text-ink-200 transition-colors">
            {t.auth.backToSite}
          </button>
        </div>
      </div>
    </div>
  );
}
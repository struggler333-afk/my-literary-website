import React, { useState } from 'react';
import { ArrowUpLeft, CheckCircle2, Mail, MapPin, Send } from 'lucide-react';
import { Input, Textarea } from '@/components/ui/Field';
import { Button } from '@/components/ui/Button';
import { useLang } from '@/context/LanguageContext';

export function Contact() {
  const { t, lang } = useLang();
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(false);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("https://formspree.io/f/mljjnrjd", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSucceeded(true);
        setSubmitting(false);
        setTimeout(() => {
          setSucceeded(false);
        }, 6000);
        (e.target as HTMLFormElement).reset();
      } else {
        setError(true);
        setSubmitting(false);
      }
    } catch (err) {
      setError(true);
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-[var(--color-surface)] py-24 text-[var(--color-text-primary)] sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div className={`text-${lang === 'ar' ? 'right' : 'left'}`}>
            <p className="mb-4 text-sm font-medium tracking-[0.12em] text-[var(--color-bronze)]">{t.contact.label}</p>
            <h2 className="font-serif text-4xl font-semibold leading-tight sm:text-5xl">{t.contact.title}</h2>
            <p className="literary-copy mt-7 max-w-md text-lg leading-[1.9] text-[var(--color-text-secondary)]">{t.contact.desc}</p>
            
            <div className="mt-10 space-y-5 border-t border-[var(--color-border)] pt-6">
              {/* البريد الإلكتروني */}
              <div className="flex items-center gap-4" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                <Mail size={18} className="text-[var(--color-bronze)]" />
                <div>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    {lang === 'ar' ? 'البريد الإلكتروني / Email' : 'Email / البريد الإلكتروني'}
                  </p>
                  <p className="text-sm font-medium" dir="ltr">muhamed.elbaradei7@gmail.com</p>
                </div>
              </div>

              {/* المقر / العنوان */}
              <div className="flex items-center gap-4" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                <MapPin size={18} className="text-[var(--color-bronze)]" />
                <div>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    {lang === 'ar' ? 'المقر / Location' : 'Location / المقر'}
                  </p>
                  <p className="text-sm font-medium">
                    {lang === 'ar' ? 'القاهره - جمهوريه مصر العربيه' : 'Cairo - Arab Republic of Egypt'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="border-t border-[var(--color-border)] pt-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <div className="grid gap-5 sm:grid-cols-2">
              <Input 
                label={t.contact.name} 
                id="name" 
                name="name"
                required 
                placeholder={t.contact.namePlaceholder} 
                disabled={submitting}
              />
              <Input 
                label={t.contact.emailLabel} 
                id="email" 
                type="email" 
                name="email"
                required 
                placeholder={t.contact.emailPlaceholder} 
                disabled={submitting}
                dir="ltr" 
              />
            </div>
            
            <div className="mt-5">
              <Textarea 
                label={t.contact.message} 
                id="message" 
                name="message"
                required 
                placeholder={t.contact.messagePlaceholder} 
                disabled={submitting}
                rows={6} 
              />
            </div>

            {succeeded && (
              <div className="mt-4 flex items-center gap-2 text-sm text-[var(--color-success)] bg-green-50 dark:bg-green-950/30 p-3 rounded-md border border-green-200 dark:border-green-800">
                <CheckCircle2 size={18} className="text-green-600" />
                <span>{t.contact.sent || "شكراً لك! تم إرسال رسالتك بنجاح وسأقوم بالرد عليك قريباً."}</span>
              </div>
            )}

            {error && (
              <div className="mt-4 text-sm text-[var(--color-error)] bg-red-50 p-3 rounded-md border border-red-200">
                عذراً، حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.
              </div>
            )}

            <Button 
              type="submit" 
              size="lg" 
              disabled={submitting} 
              className="mt-6 bg-[var(--color-bronze)] text-black hover:bg-[var(--color-bronze-hover)]"
            >
              {submitting ? (t.contact.sending || "جاري الإرسال...") : <><Send size={18} />{t.contact.send}<ArrowUpLeft size={16} /></>}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
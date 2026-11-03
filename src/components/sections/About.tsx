import { ArrowDownLeft } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';

export function About() {
  const { lang, t } = useLang();

  return (
    <section id="about" className="bg-[var(--color-background)] py-24 text-[var(--color-text-primary)] sm:py-32" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 sm:px-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24 lg:px-12">
        {/* الصورة الشخصية */}
        <div className="relative mx-auto w-full max-w-sm lg:mx-0">
          <div className="absolute -bottom-5 -right-5 h-full w-full border border-[var(--color-bronze)]/60" />
          <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-surface)]">
            <img 
              src="/images/PhotoRoom-20261028_184549.png" 
              alt="صورة محمد البرادعي" 
              loading="lazy" 
              decoding="async" 
              width="892" 
              height="1200" 
              className="h-full w-full object-contain object-bottom" 
            />
          </div>
        </div>

        {/* محتوى التعريف وتنسيق الخطوط الجديد */}
        <div className="text-right">
          <p className="mb-2 text-sm font-medium tracking-[0.12em] text-[var(--color-bronze)]">
            {lang === 'ar' ? 'عن الكاتب' : 'About the Author'}
          </p>

          {/* الاسم بحجم كبير وبارز وفخم */}
          <h2 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl text-[var(--color-text-primary)] mb-3">
            {lang === 'ar' ? 'محمد البرادعي' : 'Mohamed Elbaradei'}
          </h2>

          {/* التخصص كعنوان فرعي مميز */}
          <p className="text-lg sm:text-xl font-medium text-[var(--color-bronze)] mb-6">
            {lang === 'ar' ? 'كاتب ومهندس برمجيات مصري' : 'Egyptian Writer & Software Engineer'}
          </p>

          {/* النص الأدبي والتعريف */}
          <div className="literary-copy space-y-4 max-w-2xl text-base sm:text-lg leading-[1.8] text-[var(--color-text-secondary)] font-serif">
            {lang === 'ar' ? (
              <>
                <p>
                  أؤمن أن وراء كل إنسان حكاية لا نعرفها، وأن أكثر اللحظات تأثيرًا في حياتنا قد تكون تلك التي لم ننتبه إليها وقت حدوثها.
                </p>
                <p>
                  أنا محمد البرادعي، كاتب ومهندس برمجيات، جمعت بين عالمين مختلفين في ظاهرهما؛ عالم المنطق الذي علّمني كيف أفكك الأشياء وأبحث عن أسبابها، وعالم الكتابة الذي منحني مساحة لاستكشاف الإنسان وما يدور خلف كلماته وتصرفاته.
                </p>
                <p>
                  أكتب القصص والحكايات الإنسانية، وأتنقل بين الدراما والفانتازيا والكوميديا والتأملات، محاولًا أن أرى العالم من زوايا مختلفة، وأن ألتقط من تفاصيل الحياة الصغيرة أسئلة أكبر مما تبدو عليه.
                </p>
                <p>
                  لا أبحث عن حكايات تمنح القارئ إجابات جاهزة، بل عن حكايات تترك داخله شيئًا يستحق التفكير، أو شعورًا يصعب نسيانه، أو أثرًا يجعله يرى مشهدًا مألوفًا بطريقة مختلفة.
                </p>
                <p className="font-semibold text-[var(--color-text-primary)] pt-3 border-t border-black/10 dark:border-white/10">
                  فالكتابة بالنسبة لي ليست مجرد حكاية تُروى، بل نافذة نرى من خلالها أنفسنا والعالم.
                </p>
              </>
            ) : (
              <>
                <p>
                  I believe that behind every human being lies a story we do not know, and that the most influential moments in our lives are often those we failed to notice when they occurred.
                </p>
                <p>
                  I am Mohamed Elbaradei, a writer and software engineer bridging two seemingly distinct worlds: the world of logic that taught me how to dissect things and search for their causes, and the world of writing that granted me the space to explore human nature and what lies behind words and actions.
                </p>
                <p>
                  I write human stories and narratives, moving fluidly between drama, fantasy, comedy, and reflection, striving to see the world from different angles and capture questions within life's smallest details that are far larger than they appear.
                </p>
                <p>
                  I do not seek stories that offer readers ready-made answers, but rather stories that leave behind something worth pondering, a feeling hard to forget, or an imprint that lets them see a familiar scene in an entirely new light.
                </p>
                <p className="font-semibold text-[var(--color-text-primary)] pt-3 border-t border-black/10 dark:border-white/10">
                  For me, writing is not merely a tale to be told, but a window through which we see ourselves and the world.
                </p>
              </>
            )}
          </div>

          <a href="#contact" className="mt-8 inline-flex items-center gap-3 border-b border-[var(--color-bronze)] pb-2 text-sm text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-bronze)]">
            {t.nav.contact}
            <ArrowDownLeft size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
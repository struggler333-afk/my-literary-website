export type Language = 'ar' | 'en';

export type Dict = {
  nav: {
    brand: string;
    home: string;
    works: string;
    store: string;
    contact: string;
    about: string;
    admin: string;
    toggleTheme: string;
    menu: string;
  };
  hero: {
    tagline: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    explore: string;
    visitStore: string;
    scrollDown: string;
  };
  about: {
    label: string;
    title: string;
    role: string;
    body: string;
  };
  reflections: {
    label: string;
    title: string;
    note: string;
    read: string;
  };
  works: {
    label: string;
    title: string;
    empty: string;
    search: string;
    all: string;
    results: (count: number) => string;
    error: string;
  };
  store: {
    label: string;
    title: string;
    desc: string;
    empty: string;
    free: string;
    getBook: string;
    viewOptions: string;
    price: string;
    downloadFree: string;
    buyNow: string;
    downloadSample: string;
    comingSoon: string;
    by: string;
  };
  contact: {
    label: string;
    title: string;
    desc: string;
    email: string;
    basedIn: string;
    location: string;
    name: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    send: string;
    sending: string;
    sent: string;
    errorFields: string;
    errorSend: string;
  };
  footer: {
    home: string;
    works: string;
    store: string;
    contact: string;
    rights: string;
  };
  auth: {
    adminSignIn: string;
    createAccount: string;
    signInDesc: string;
    signUpDesc: string;
    email: string;
    password: string;
    signIn: string;
    signUp: string;
    pleaseWait: string;
    noAccount: string;
    hasAccount: string;
    signUpLink: string;
    signInLink: string;
    backToSite: string;
  };
  dash: {
    title: string;
    signedInAs: string;
    viewSite: string;
    signOut: string;
    stories: string;
    books: string;
    messages: string;
    manageStories: string;
    newStory: string;
    manageBooks: string;
    newBook: string;
    contactMessages: string;
    published: string;
    draft: string;
    publish: string;
    unpublish: string;
    edit: string;
    delete: string;
    markRead: string;
    markUnread: string;
    noStories: string;
    noBooks: string;
    noMessages: string;
    deleteMessage: (label: string) => string;
  };
  confirm: {
    title: string;
    delete: string;
    cancel: string;
  };
  storyEditor: {
    edit: string;
    new: string;
    titleLabel: string;
    titlePlaceholder: string;
    category: string;
    coverUrl: string;
    coverUpload: string;
    coverHint: string;
    removeCover: string;
    uploadError: string;
    saveError: string;
    excerpt: string;
    excerptPlaceholder: string;
    body: string;
    bodyPlaceholder: string;
    published: string;
    cancel: string;
    save: string;
    create: string;
    saving: string;
    errorRequired: string;
  };
  categories: {
    essay: string;
    shortStory: string;
    poem: string;
    novelExcerpt: string;
    reflection: string;
  };
  bookEditor: {
    edit: string;
    new: string;
    titleLabel: string;
    titlePlaceholder: string;
    author: string;
    authorPlaceholder: string;
    desc: string;
    descPlaceholder: string;
    price: string;
    coverUrl: string;
    downloadUrl: string;
    buyUrl: string;
    published: string;
    cancel: string;
    save: string;
    create: string;
    saving: string;
    errorRequired: string;
  };
  format: {
    free: string;
  };
};

const ar: Dict = {
  nav: {
    brand: 'محمد البرادعى',
    home: 'الرئيسية',
    works: 'الأعمال',
    store: 'المتجر',
    contact: 'تواصل',
    about: 'عن الكاتب',
    admin: 'لوحة التحكم',
    toggleTheme: 'تبديل الوضع',
    menu: 'القائمة',
  },
  hero: {
    tagline: 'حكايات عن الإنسان وما يخفيه',
    titleLine1: 'محمد البرادعي',
    titleLine2: 'حين تكشف الحكاية ما تخفيه الحياة',
    subtitle: 'أكتب عن الإنسان حين يواجه نفسه، وعن الحكايات الصغيرة التي تكشف ما تخفيه الحياة، وعن تلك اللحظات التي تبدو عابرة، ثم يتضح أنها غيّرت كل شيء.',
    explore: 'اكتشف القصص',
    visitStore: 'تعرّف على الكاتب',
    scrollDown: 'انتقل للأسفل',
  },
  about: {
    label: 'عن الكاتب',
    title: 'كاتب مصري وحكّاء',
    role: 'محمد البرادعي',
    body: 'أكتب عن الإنسان حين يواجه نفسه، وعن الحكايات الصغيرة التي تكشف ما تخفيه الحياة، وعن تلك اللحظات التي تبدو عابرة، ثم يتضح أنها غيّرت كل شيء.',
  },
  reflections: {
    label: 'تأملات',
    title: 'ما يبقى بعد اللحظة',
    note: 'أفكار قصيرة · ملاحظات · أسئلة مفتوحة',
    read: 'اقرأ التأمل',
  },
  works: {
    label: 'المكتبة',
    title: 'قصص تترك أثرها',
    empty: 'لا توجد أعمال منشورة بعد. تابعنا قريباً.',
    search: 'ابحث في القصص والتأملات',
    all: 'كل الأعمال',
    results: (count: number) => `${count} أعمال منشورة`,
    error: 'تعذر تحميل الأعمال الآن. حاول مرة أخرى لاحقاً.',
  },
  store: {
    label: 'المتجر',
    title: 'الكتب الإلكترونية والمجموعات',
    desc: 'حمّل القصص المجانية أو اشترِ المجموعات الكاملة. كل كتاب متوفر للتحميل الفوري.',
    empty: 'لا توجد كتب متاحة بعد. تابعنا قريباً.',
    free: 'مجاني',
    getBook: 'احصل على الكتاب',
    viewOptions: 'عرض الخيارات',
    price: 'السعر',
    downloadFree: 'تحميل مجاني',
    buyNow: 'اشترِ الآن',
    downloadSample: 'تحميل المقتطف',
    comingSoon: 'قريباً — تابعنا للتعرّف على التوفر.',
    by: 'بقلم',
  },
  contact: {
    label: 'تواصل معنا',
    title: 'تواصل',
    desc: 'سواء كنت ترغب في مناقشة قراءة أدبية، أو الاستفسار عن تعاون، أو ببساطة مشاركة أفكارك حول قصة — يسعدني أن أسمع منك.',
    email: 'البريد الإلكتروني',
    basedIn: 'المقر',
    location: 'الرياض، المملكة العربية السعودية',
    name: 'الاسم',
    namePlaceholder: 'الاسم الكامل',
    emailLabel: 'البريد الإلكتروني',
    emailPlaceholder: 'example@email.com',
    message: 'الرسالة',
    messagePlaceholder: 'شاركنا أفكارك...',
    send: 'إرسال الرسالة',
    sending: 'جارٍ الإرسال...',
    sent: 'شكراً لك! تم إرسال رسالتك بنجاح.',
    errorFields: 'يرجى تعبئة جميع الحقول.',
    errorSend: 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',
  },
  footer: {
    home: 'الرئيسية',
    works: 'الأعمال',
    store: 'المتجر',
    contact: 'تواصل',
    rights: 'جميع الحقوق محفوظة.',
  },
  auth: {
    adminSignIn: 'تسجيل دخول المشرف',
    createAccount: 'إنشاء حساب',
    signInDesc: 'سجّل الدخول لإدارة أعمالك وكتبك.',
    signUpDesc: 'أنشئ حساباً للوصول إلى لوحة التحكم.',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    signIn: 'تسجيل الدخول',
    signUp: 'إنشاء حساب',
    pleaseWait: 'يرجى الانتظار...',
    noAccount: 'ليس لديك حساب؟ ',
    hasAccount: 'لديك حساب بالفعل؟ ',
    signUpLink: 'إنشاء حساب',
    signInLink: 'تسجيل الدخول',
    backToSite: '← العودة للموقع',
  },
  dash: {
    title: 'لوحة التحكم',
    signedInAs: 'مسجّل الدخول كـ',
    viewSite: 'عرض الموقع',
    signOut: 'تسجيل الخروج',
    stories: 'الأعمال',
    books: 'الكتب',
    messages: 'الرسائل',
    manageStories: 'إدارة الأعمال',
    newStory: 'عمل جديد',
    manageBooks: 'إدارة الكتب',
    newBook: 'كتاب جديد',
    contactMessages: 'رسائل التواصل',
    published: 'منشور',
    draft: 'مسودة',
    publish: 'نشر',
    unpublish: 'إلغاء النشر',
    edit: 'تعديل',
    delete: 'حذف',
    markRead: 'وضع كمقروء',
    markUnread: 'وضع كغير مقروء',
    noStories: 'لا توجد أعمال بعد. أنشئ عملك الأول.',
    noBooks: 'لا توجد كتب بعد. أضف كتابك الأول.',
    noMessages: 'لا توجد رسائل بعد.',
    deleteMessage: (label: string) => `هل أنت متأكد من حذف "${label}"؟ لا يمكن التراجع عن هذا الإجراء.`,
  },
  confirm: {
    title: 'حذف؟',
    delete: 'حذف',
    cancel: 'إلغاء',
  },
  storyEditor: {
    edit: 'تعديل عمل',
    new: 'عمل جديد',
    titleLabel: 'العنوان',
    titlePlaceholder: 'عنوان العمل',
    category: 'التصنيف',
    coverUrl: 'اختيار صورة',
    coverUpload: 'صورة الغلاف',
    coverHint: 'PNG أو JPG أو WEBP — حتى 5 ميجابايت',
    removeCover: 'حذف صورة الغلاف',
    uploadError: 'تعذر رفع الصورة. اختر صورة صالحة وحاول مرة أخرى.',
    saveError: 'تعذر حفظ العمل. حاول مرة أخرى.',
    excerpt: 'المقتطف',
    excerptPlaceholder: 'ملخص قصير يظهر على البطاقة...',
    body: 'النص الكامل',
    bodyPlaceholder: 'النص الكامل للعمل...',
    published: 'منشور (ظاهر على الموقع العام)',
    cancel: 'إلغاء',
    save: 'حفظ التغييرات',
    create: 'إنشاء العمل',
    saving: 'جارٍ الحفظ...',
    errorRequired: 'العنوان والمقتطف مطلوبان.',
  },
  categories: {
    essay: 'مقال',
    shortStory: 'قصة قصيرة',
    poem: 'قصيدة',
    novelExcerpt: 'مقتطف رواية',
    reflection: 'تأمل',
  },
  bookEditor: {
    edit: 'تعديل كتاب',
    new: 'كتاب جديد',
    titleLabel: 'العنوان',
    titlePlaceholder: 'عنوان الكتاب',
    author: 'المؤلف',
    authorPlaceholder: 'محمد البرادعى',
    desc: 'الوصف',
    descPlaceholder: 'وصف الكتاب...',
    price: 'السعر (بالسنت، 0 = مجاني)',
    coverUrl: 'رابط صورة الغلاف',
    downloadUrl: 'رابط التحميل (للمجاني أو المقتطف)',
    buyUrl: 'رابط الشراء (رابط خارجي)',
    published: 'منشور (ظاهر في المتجر)',
    cancel: 'إلغاء',
    save: 'حفظ التغييرات',
    create: 'إنشاء الكتاب',
    saving: 'جارٍ الحفظ...',
    errorRequired: 'العنوان مطلوب.',
  },
  format: {
    free: 'مجاني',
  },
};

const en: Dict = {
  nav: {
    brand: 'Mohamed ElBaradei',
    home: 'Home',
    works: 'Works',
    store: 'Store',
    contact: 'Contact',
    about: 'About',
    admin: 'Dashboard',
    toggleTheme: 'Toggle theme',
    menu: 'Menu',
  },
  hero: {
    tagline: 'Stories of what it means to be human',
    titleLine1: 'Mohamed ElBaradei',
    titleLine2: 'When a story reveals what life conceals',
    subtitle: 'I write about the human being facing himself, the small stories that reveal what life conceals, and the moments that seem passing until we discover they changed everything.',
    explore: 'Discover the Stories',
    visitStore: 'Meet the Author',
    scrollDown: 'Scroll down',
  },
  about: {
    label: 'About the author',
    title: 'Egyptian writer and storyteller',
    role: 'Mohamed ElBaradei',
    body: 'I write about the human being facing himself, the small stories that reveal what life conceals, and the moments that seem passing until we discover they changed everything.',
  },
  reflections: {
    label: 'Reflections',
    title: 'What remains after the moment',
    note: 'Short thoughts · observations · open questions',
    read: 'Read reflection',
  },
  works: {
    label: 'The Library',
    title: 'Stories that linger',
    empty: 'No works published yet. Check back soon.',
    search: 'Search stories and reflections',
    all: 'All works',
    results: (count: number) => `${count} published works`,
    error: 'The works could not be loaded right now. Please try again later.',
  },
  store: {
    label: 'The Bookstore',
    title: 'E-Books & Collections',
    desc: 'Download free stories or purchase complete collections. Every book is available instantly.',
    empty: 'No books available yet. Check back soon.',
    free: 'Free',
    getBook: 'Get Book',
    viewOptions: 'View Options',
    price: 'Price',
    downloadFree: 'Download Free',
    buyNow: 'Buy Now',
    downloadSample: 'Download Sample',
    comingSoon: 'Coming soon — check back for availability.',
    by: 'by',
  },
  contact: {
    label: 'Get in Touch',
    title: 'Contact',
    desc: "Whether you'd like to discuss a reading, inquire about collaborations, or simply share your thoughts on a story — I'd love to hear from you.",
    email: 'Email',
    basedIn: 'Based in',
    location: 'Riyadh, Saudi Arabia',
    name: 'Your Name',
    namePlaceholder: 'Jane Doe',
    emailLabel: 'Email Address',
    emailPlaceholder: 'jane@example.com',
    message: 'Message',
    messagePlaceholder: 'Share your thoughts...',
    send: 'Send Message',
    sending: 'Sending...',
    sent: 'Thank you! Your message has been sent.',
    errorFields: 'Please fill in all fields.',
    errorSend: 'Something went wrong. Please try again.',
  },
  footer: {
    home: 'Home',
    works: 'Works',
    store: 'Bookstore',
    contact: 'Contact',
    rights: 'All rights reserved.',
  },
  auth: {
    adminSignIn: 'Admin Sign In',
    createAccount: 'Create Account',
    signInDesc: 'Sign in to manage your stories and books.',
    signUpDesc: 'Create an account to access the dashboard.',
    email: 'Email',
    password: 'Password',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    pleaseWait: 'Please wait...',
    noAccount: "Don't have an account? ",
    hasAccount: 'Already have an account? ',
    signUpLink: 'Sign up',
    signInLink: 'Sign in',
    backToSite: '← Back to site',
  },
  dash: {
    title: 'Dashboard',
    signedInAs: 'Signed in as',
    viewSite: 'View Site',
    signOut: 'Sign Out',
    stories: 'Stories',
    books: 'Books',
    messages: 'Messages',
    manageStories: 'Manage Stories',
    newStory: 'New Story',
    manageBooks: 'Manage Books',
    newBook: 'New Book',
    contactMessages: 'Contact Messages',
    published: 'Published',
    draft: 'Draft',
    publish: 'Publish',
    unpublish: 'Unpublish',
    edit: 'Edit',
    delete: 'Delete',
    markRead: 'Mark read',
    markUnread: 'Mark unread',
    noStories: 'No stories yet. Create your first one.',
    noBooks: 'No books yet. Add your first e-book.',
    noMessages: 'No messages yet.',
    deleteMessage: (label: string) => `Are you sure you want to delete "${label}"? This cannot be undone.`,
  },
  confirm: {
    title: 'Delete?',
    delete: 'Delete',
    cancel: 'Cancel',
  },
  storyEditor: {
    edit: 'Edit Story',
    new: 'New Story',
    titleLabel: 'Title',
    titlePlaceholder: 'Story title',
    category: 'Category',
    coverUrl: 'Choose image',
    coverUpload: 'Cover image',
    coverHint: 'PNG, JPG, or WEBP — up to 5 MB',
    removeCover: 'Remove cover image',
    uploadError: 'The image could not be uploaded. Choose a valid image and try again.',
    saveError: 'The story could not be saved. Please try again.',
    excerpt: 'Excerpt',
    excerptPlaceholder: 'A short summary shown on the card...',
    body: 'Body',
    bodyPlaceholder: 'The full text of the work...',
    published: 'Published (visible on the public site)',
    cancel: 'Cancel',
    save: 'Save Changes',
    create: 'Create Story',
    saving: 'Saving...',
    errorRequired: 'Title and excerpt are required.',
  },
  categories: {
    essay: 'Essay',
    shortStory: 'Short Story',
    poem: 'Poem',
    novelExcerpt: 'Novel Excerpt',
    reflection: 'Reflection',
  },
  bookEditor: {
    edit: 'Edit Book',
    new: 'New Book',
    titleLabel: 'Title',
    titlePlaceholder: 'Book title',
    author: 'Author',
    authorPlaceholder: 'Mohamed ElBaradei',
    desc: 'Description',
    descPlaceholder: 'Book description...',
    price: 'Price (in cents, 0 = free)',
    coverUrl: 'Cover Image URL',
    downloadUrl: 'Download URL (for free or sample)',
    buyUrl: 'Buy URL (external link)',
    published: 'Published (visible in the bookstore)',
    cancel: 'Cancel',
    save: 'Save Changes',
    create: 'Create Book',
    saving: 'Saving...',
    errorRequired: 'Title is required.',
  },
  format: {
    free: 'Free',
  },
};

export const translations: Record<Language, Dict> = { ar, en };

export const categoryMap: Record<string, keyof Dict['categories']> = {
  'مقال': 'essay',
  'قصة قصيرة': 'shortStory',
  'قصيدة': 'poem',
  'مقتطف رواية': 'novelExcerpt',
  'تأمل': 'reflection',
  'Essay': 'essay',
  'Short Story': 'shortStory',
  'Poem': 'poem',
  'Novel Excerpt': 'novelExcerpt',
  'Reflection': 'reflection',
};

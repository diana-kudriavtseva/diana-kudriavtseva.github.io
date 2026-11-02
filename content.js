/* =====================================================================
   CONTENT.JS — УСЕ, ЩО ВИ РЕДАГУЄТЕ, ЗНАХОДИТЬСЯ ТУТ
   ---------------------------------------------------------------------
   • Дизайн і код (style.css, script.js) чіпати не потрібно.
   • Значення, що починаються з "YOUR_", — це заглушки. Поки заглушка
     не замінена, відповідний елемент НЕ показується на сайті
     (жодних «мертвих» посилань чи порожніх плеєрів).
   • Щоб побачити, які слоти ще порожні, відкрийте сайт з ?setup в кінці
     адреси, наприклад:  index.html?setup
   • demo: true — позначка демо-зображення (Unsplash, не роботи автора).
     Коли вставляєте власне фото чи обкладинку — видаліть цей рядок
     або поставте demo: false.
   ===================================================================== */

const UNSPLASH = (id, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

window.PORTFOLIO_CONTENT = {

  /* ---------- 1. ВЛАСНИК ---------- */
  owner: {
    name: "Diana Kudriavtseva",   // Ім'я та прізвище
    photo: "media/photos/about-diana.jpg",   // портрет у блоці «Про мене» (порожньо = без фото)
    photoAlt: "Діана сидить на стільці в білому одязі, чорно-біле фото",
    wordmark: "PORTFOLIO",        // Напис зліва вгорі
    role: "Відеограф і контент-креатор",
    bio: "Я — відеограф і контент-креатор. Люблю створювати візуальні історії, які викликають емоції та залишають відчуття.",
    worksWith: ["брендами та бізнесами", "людьми та експертами", "подіями та проєктами", "beauty & lifestyle"],
    formats: ["відео різних форматів", "фото для брендів і соцмереж", "монтаж та базова обробка"],
  },

  /* ---------- 2. КОНТАКТИ ---------- */
  contacts: {
    instagram: "https://instagram.com/just_kudriavtseva",
    email:     "YOUR_EMAIL",           // name@gmail.com
    telegram:  "YOUR_TELEGRAM_URL",    // https://t.me/username
  },

  /* ---------- 3. ПЕРШИЙ ЕКРАН ---------- */
  hero: {
    eyebrow: "VIDEOGRAPHY & PHOTOGRAPHY",
    headline: "Seeing beauty<br>in details.",
    text: "Створюю відео та фото, які передають атмосферу, емоції та сенси.",
    cta: "Дивитись портфоліо",
    image: "media/photos/hero-cream-shoulder.jpg",
    imageAlt: "Мазок крему на плечі, рука притримує вафельний халат",
    imagePosition: "50% 34%",       // яку частину кадру тримати в центрі (необов'язково)
    showreelUrl: "VIDEO_URL",       // посилання на шоурил (MP4 / YouTube / Vimeo / Google Drive)
    showreelDuration: "",           // напр. "01:24"
    backgroundLoop: "",             // необов'язково: короткий беззвучний MP4, що грає замість фото
  },

  /* ---------- 4. ВІДЕО (5 категорій) ----------
     thumbnail — обкладинка (VIDEO_THUMBNAIL_URL)
     url       — саме відео (VIDEO_URL): MP4-файл, YouTube, Vimeo або Google Drive
     Можна додати кілька відео в одну категорію — масив items.
     Перше відео з масиву стає обкладинкою картки, решта гортаються в плеєрі. */
  videoIntro: "Різні формати, одна ціль — створювати живий і якісний контент.",
  videos: [
    {
      category: "Процедури",
      description: "Процеси, деталі, етапи роботи та результат.",
      items: [
        { title: "Догляд за волоссям", thumbnail: "media/posters/procedure-kydra-hair.jpg", url: "media/videos/procedure-kydra-hair.mp4", duration: "00:40", caption: "Kydra le salon", vertical: true },
        { title: "Масаж обличчя", thumbnail: "media/posters/procedure-face-massage.jpg", url: "media/videos/procedure-face-massage.mp4", duration: "00:42", caption: "Ahentsiia Krasy", vertical: true },
        { title: "Консультація трихолога", thumbnail: "media/posters/talk-trichology-consultation.jpg", url: "media/videos/talk-trichology-consultation.mp4", duration: "00:45", caption: "", vertical: true },
        { title: "Плазмотерапія", thumbnail: "media/posters/procedure-plasma.jpg", url: "media/videos/procedure-plasma.mp4", duration: "00:36", caption: "", vertical: true },
        { title: "Ендосфера", thumbnail: "media/posters/procedure-endosphere.jpg", url: "media/videos/procedure-endosphere.mp4", duration: "00:24", caption: "Благодатна", vertical: true },
      ],
    },
    {
      category: "Репортажні",
      description: "Події, живі моменти, люди та історії.",
      items: [
        { title: "Подія в салоні", thumbnail: "media/posters/report-salon-event.jpg", url: "media/videos/report-salon-event.mp4", duration: "00:46", caption: "", vertical: true },
        { title: "Навчальний день", thumbnail: "media/posters/report-training-day.jpg", url: "media/videos/report-training-day.mp4", duration: "00:23", caption: "", vertical: true },
      ],
    },
    {
      category: "Розмовні",
      description: "Інтерв'ю, діалоги, експертний контент.",
      items: [
        { title: "Інтерв'ю з гостею", thumbnail: "media/posters/talk-guest-interview.jpg", url: "media/videos/talk-guest-interview.mp4", duration: "01:02", caption: "", vertical: true, position: "50% 0%" },
        { title: "Інтерв'ю в салоні", thumbnail: "media/posters/talk-salon-interview.jpg", url: "media/videos/talk-salon-interview.mp4", duration: "01:32", caption: "", vertical: true },
      ],
    },
    {
      category: "Mood-відео",
      description: "Атмосфера, естетика, настрій і візуальні історії.",
      items: [
        { title: "Крем Corpus", thumbnail: "media/posters/mood-corpus-cream.jpg", url: "media/videos/mood-corpus-cream.mp4", duration: "00:18", caption: "", vertical: true },
        { title: "Чайний ритуал", thumbnail: "media/posters/mood-tea-ritual.jpg", url: "media/videos/mood-tea-ritual.mp4", duration: "00:23", caption: "Ahentsiia Krasy", vertical: true },
        { title: "Повільний ранок", thumbnail: "media/posters/mood-slow-morning.jpg", url: "media/videos/mood-slow-morning.mp4", duration: "00:46", caption: "", vertical: true },
        { title: "Нефритова маска", thumbnail: "media/posters/procedure-jade-candle.jpg", url: "media/videos/procedure-jade-candle.mp4", duration: "00:18", caption: "Ahentsiia Krasy", vertical: true },
      ],
    },
    {
      category: "Презентація процедур",
      description: "Сторітелінг про процедуру: відчуття, атмосфера та результат.",
      items: [
        { title: "Догляд за тілом", thumbnail: "media/posters/procedure-body-jade.jpg", url: "media/videos/procedure-body-jade.mp4", duration: "01:05", caption: "Ahentsiia Krasy", vertical: true },
        { title: "Сон і стрес", thumbnail: "media/posters/talk-sleep-stress.jpg", url: "media/videos/talk-sleep-stress.mp4", duration: "01:02", caption: "", vertical: true },
        { title: "Глибоке розслаблення", thumbnail: "media/posters/talk-deep-relaxation.jpg", url: "media/videos/talk-deep-relaxation.mp4", duration: "00:47", caption: "", vertical: true },
      ],
    },
  ],

  /* ---------- 5. ФОТО (3 категорії) ----------
     Перші 4 фото кожної категорії формують колаж; усі фото гортаються в лайтбоксі.
     layout: "stack" (велике + 2 праворуч) або "split" (велике + 1 + 2 маленькі). */
  photoIntro: "У кожному кадрі — деталі, світло, текстури та настрій.",
  photos: [
    {
      category: "Предметна зйомка",
      description: "Косметика, баночки, текстури, упаковки, деталі продукту.",
      layout: "stack",
      items: [
        { src: "media/photos/product-darling-spf.jpg", alt: "Рожевий флакон Darling SPF 30 у краплях води на блакитному тлі", caption: "Darling · Protect-Me SPF 30" },
        { src: "media/photos/product-jackhenry-santal.jpg", alt: "Дезодорант jack henry Santal Musk на шматочках сандалового дерева, бежеве тло", caption: "jack henry · Santal Musk" },
        { src: "media/photos/product-kevinmurphy.jpg", alt: "Шампунь і кондиціонер Kevin Murphy Repair-Me у смугах денного світла", caption: "Kevin Murphy · Repair-Me" },
        { src: "media/photos/product-rejuran-set.jpg", alt: "Набір Rejuran: зволожувач, крем для очей, патчі та концентрат на світлому тлі", caption: "Rejuran" },
        { src: "media/photos/product-rejuran-mirror.jpg", alt: "Баночка патчів Rejuran Renew Eye Patch біля дзеркала", caption: "Rejuran · Renew Eye Patch" },
        { src: "media/photos/product-nubea-solenium.jpg", alt: "Флакон Nubea Solenium у руці", caption: "Nubea · Solenium" },
        { src: "media/photos/product-kydra-blonde.jpg", alt: "Фарби Kydra Blonde Beauty й окисник на тлі чорної раковини", caption: "Kydra le salon · Blonde Beauty" },
        { src: "media/photos/product-kydra-signature.jpg", alt: "Kydra Signature: міст, крем для рук і масажна щітка на золотому підносі біля свічки", caption: "Kydra le salon · Signature" },
        { src: "media/photos/product-kydra-dore.jpg", alt: "Флакон Kydra Doré у смузі сонячного світла на темному тлі", caption: "Kydra le salon · Doré" },
        { src: "media/photos/product-olaplex.jpg", alt: "Набір Olaplex на чорному шовку", caption: "Olaplex" },
        { src: "media/photos/product-corpus-jar.jpg", alt: "Баночка Corpus N° Vert у складках вафельного рушника", caption: "Corpus · N° Vert" },
        { src: "media/photos/product-cream-shoulder.jpg", alt: "Мазок крему на плечі, вафельний халат", caption: "" },
        { src: "media/photos/product-darling-duo.jpg", alt: "Два флакони Darling SPF 50 і SPF 30 у краплях води", caption: "Darling · Protect-Me SPF 50 і SPF 30" },
        { src: "media/photos/product-jackhenry-bodywash.jpg", alt: "Гель для душу jack henry, що спирається на металевий каркас", caption: "jack henry · body wash", position: "40% 60%" },
        { src: "media/photos/product-isclinical-serum.jpg", alt: "Сироватка iS Clinical у руках з червоним манікюром", caption: "iS Clinical · Hydra-Cool Serum" },
        { src: "media/photos/product-janmarini-gel.jpg", alt: "Очищувальний гель Jan Marini з піною в руках, вафельний халат", caption: "Jan Marini · C-Esta Cleansing Gel" },
        { src: "media/photos/product-kydra-delicatesse.jpg", alt: "Тюбик Kydra délicatesse у руках на чорному тлі", caption: "Kydra le salon · délicatesse" },
        { src: "media/photos/product-jackhenry-deodorant.jpg", alt: "Дезодорант jack henry, видимий крізь розрив у білому папері", caption: "jack henry · deodorant" },
        { src: "media/photos/product-napura-hair.jpg", alt: "Фарби Napura In Nuance на хвилі каштанового волосся", caption: "Napura · In Nuance" },
        { src: "media/photos/product-corpus-bodybutter.jpg", alt: "Олія для тіла Corpus N° Green наноситься на руку", caption: "Corpus · N° Green" },
      ],
    },
    {
      category: "Процедури",
      description: "Процес роботи, руки майстра, інструменти, деталі та результат.",
      layout: "split",
      items: [
        { src: "media/photos/procedure-massage-back-warm.jpg", alt: "Руки майстра під час масажу спини, тепле світло", caption: "" },
        { src: "media/photos/procedure-dinolite-hair.jpg", alt: "Огляд пасма волосся цифровим мікроскопом", caption: "" },
        { src: "media/photos/procedure-body-roller.jpg", alt: "Апаратний масаж тіла роликовою насадкою", caption: "" },
        { src: "media/photos/procedure-akiro-blade.jpg", alt: "Майстриня тримає металевий скребок Akiro Blade", caption: "", position: "50% 60%" },
        { src: "media/photos/procedure-scalp-injection.jpg", alt: "Ін'єкційна процедура для шкіри голови, руки в рукавичках", caption: "" },
        { src: "media/photos/procedure-roller-device.jpg", alt: "Насадка апарата з підсвіткою в руках майстрині", caption: "", position: "50% 45%" },
        { src: "media/photos/procedure-led-mask.jpg", alt: "LED-терапія: обличчя під зеленим світлом апарата", caption: "" },
        { src: "media/photos/procedure-back-massage.jpg", alt: "Рука майстра на плечі під час масажу", caption: "", position: "50% 55%" },
        { src: "media/photos/procedure-dry-brush.jpg", alt: "Сухий масаж щіткою по спині", caption: "" },
        { src: "media/photos/procedure-jade-mask.jpg", alt: "Нефритова маска для очей і дерев'яні палички на білому рушнику", caption: "Ahentsiia Krasy" },
        { src: "media/photos/procedure-face-massage.jpg", alt: "Масаж обличчя: руки майстра на обличчі клієнтки", caption: "Ahentsiia Krasy", position: "40% 50%" },
      ],
    },
    {
      category: "Люди",
      description: "Портрети, емоції, природні моменти, робота з моделлю.",
      layout: "stack",
      items: [
        { src: "media/photos/people-kydra-master.jpg", alt: "Портрет майстрині салону Kydra у чорній уніформі", caption: "Kydra le salon", position: "50% 25%" },
        { src: "media/photos/people-cosmetologist.jpg", alt: "Портрет косметологині за робочим столом з ноутбуком", caption: "", position: "50% 30%" },
        { src: "media/photos/people-specialist.jpg", alt: "Усміхнений фахівець у білій формі в кабінеті", caption: "", position: "50% 25%" },
        { src: "media/photos/procedure-trichology.jpg", alt: "Трихолог оглядає шкіру голови камерою-дерматоскопом", caption: "", position: "50% 40%" },
        { src: "media/photos/procedure-body-device.jpg", alt: "Апаратна процедура для тіла", caption: "", position: "50% 30%" },
        { src: "media/photos/people-blonde-sweater.jpg", alt: "Портрет дівчини у пухнастому светрі", caption: "", position: "50% 30%" },
        { src: "media/photos/people-relax-airpods.jpg", alt: "Дівчина з заплющеними очима лежить на кушетці, майстер вставляє навушник", caption: "" },
      ],
    },
  ],

  /* ---------- 6. БРЕНДИ ----------
     clients — салони/студії, для яких знято контент
     brands  — бренди, чию продукцію знято (без клієнтських стосунків)
     Порожні списки = секція не показується. */
  brandsIntro: "Бренди, чию продукцію я знімала.",
  clients: [],
  brands: ["Olaplex", "Kevin Murphy", "Rejuran", "jack henry", "Darling", "iS Clinical", "Jan Marini", "Nubea", "Corpus", "Napura"],

  /* ---------- 7. ПІДВАЛ ---------- */
  footer: {
    closing: "Let’s create something beautiful together.",
    year: "",          // порожньо = поточний рік автоматично
  },

  /* ---------- 8. НАЛАШТУВАННЯ ---------- */
  settings: {
    setupMode: false,  // true = завжди показувати мітки порожніх слотів (на публічному сайті тримайте false)
    filmGrade: true,   // теплий «плівковий» тон для демо-зображень (на ваші роботи не впливає)
  },
};

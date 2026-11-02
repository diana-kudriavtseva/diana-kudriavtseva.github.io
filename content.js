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
    photo: "about-diana.jpg",   // портрет у блоці «Про мене» (порожньо = без фото)
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
    telegram:  "https://t.me/dikudryavtseva",
  },

  /* ---------- 3. ПЕРШИЙ ЕКРАН ---------- */
  hero: {
    eyebrow: "VIDEOGRAPHY & PHOTOGRAPHY",
    headline: "Seeing beauty<br>in details.",
    text: "Створюю відео та фото, які передають атмосферу, емоції та сенси.",
    cta: "Дивитись портфоліо",
    image: "hero-cream-shoulder.jpg",
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
        { title: "Догляд за волоссям", thumbnail: "poster-procedure-kydra-hair.jpg", url: "procedure-kydra-hair.mp4", duration: "00:40", caption: "Kydra le salon", vertical: true },
        { title: "Масаж обличчя", thumbnail: "poster-procedure-face-massage.jpg", url: "procedure-face-massage.mp4", duration: "00:42", caption: "Ahentsiia Krasy", vertical: true },
        { title: "Консультація трихолога", thumbnail: "poster-talk-trichology-consultation.jpg", url: "talk-trichology-consultation.mp4", duration: "00:45", caption: "", vertical: true },
        { title: "Плазмотерапія", thumbnail: "poster-procedure-plasma.jpg", url: "procedure-plasma.mp4", duration: "00:36", caption: "", vertical: true },
        { title: "Ендосфера", thumbnail: "poster-procedure-endosphere.jpg", url: "procedure-endosphere.mp4", duration: "00:24", caption: "Благодатна", vertical: true },
      ],
    },
    {
      category: "Репортажні",
      description: "Події, живі моменти, люди та історії.",
      items: [
        { title: "Подія в салоні", thumbnail: "poster-report-salon-event.jpg", url: "report-salon-event.mp4", duration: "00:46", caption: "", vertical: true },
        { title: "Навчальний день", thumbnail: "poster-report-training-day.jpg", url: "report-training-day.mp4", duration: "00:23", caption: "", vertical: true },
      ],
    },
    {
      category: "Розмовні",
      description: "Інтерв'ю, діалоги, експертний контент.",
      items: [
        { title: "Інтерв'ю з гостею", thumbnail: "poster-talk-guest-interview.jpg", url: "talk-guest-interview.mp4", duration: "01:02", caption: "", vertical: true, position: "50% 0%" },
        { title: "Інтерв'ю в салоні", thumbnail: "poster-talk-salon-interview.jpg", url: "talk-salon-interview.mp4", duration: "01:32", caption: "", vertical: true },
      ],
    },
    {
      category: "Mood-відео",
      description: "Атмосфера, естетика, настрій і візуальні історії.",
      items: [
        { title: "Крем Corpus", thumbnail: "poster-mood-corpus-cream.jpg", url: "mood-corpus-cream.mp4", duration: "00:18", caption: "", vertical: true },
        { title: "Чайний ритуал", thumbnail: "poster-mood-tea-ritual.jpg", url: "mood-tea-ritual.mp4", duration: "00:23", caption: "Ahentsiia Krasy", vertical: true },
        { title: "Повільний ранок", thumbnail: "poster-mood-slow-morning.jpg", url: "mood-slow-morning.mp4", duration: "00:46", caption: "", vertical: true },
        { title: "Нефритова маска", thumbnail: "poster-procedure-jade-candle.jpg", url: "procedure-jade-candle.mp4", duration: "00:18", caption: "Ahentsiia Krasy", vertical: true },
      ],
    },
    {
      category: "Презентація процедур",
      description: "Сторітелінг про процедуру: відчуття, атмосфера та результат.",
      items: [
        { title: "Догляд за тілом", thumbnail: "poster-procedure-body-jade.jpg", url: "procedure-body-jade.mp4", duration: "01:05", caption: "Ahentsiia Krasy", vertical: true },
        { title: "Сон і стрес", thumbnail: "poster-talk-sleep-stress.jpg", url: "talk-sleep-stress.mp4", duration: "01:02", caption: "", vertical: true },
        { title: "Глибоке розслаблення", thumbnail: "poster-talk-deep-relaxation.jpg", url: "talk-deep-relaxation.mp4", duration: "00:47", caption: "", vertical: true },
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
        { src: "product-darling-spf.jpg", alt: "Рожевий флакон Darling SPF 30 у краплях води на блакитному тлі", caption: "Darling · Protect-Me SPF 30" },
        { src: "product-jackhenry-santal.jpg", alt: "Дезодорант jack henry Santal Musk на шматочках сандалового дерева, бежеве тло", caption: "jack henry · Santal Musk" },
        { src: "product-kevinmurphy.jpg", alt: "Шампунь і кондиціонер Kevin Murphy Repair-Me у смугах денного світла", caption: "Kevin Murphy · Repair-Me" },
        { src: "product-rejuran-set.jpg", alt: "Набір Rejuran: зволожувач, крем для очей, патчі та концентрат на світлому тлі", caption: "Rejuran" },
        { src: "product-rejuran-mirror.jpg", alt: "Баночка патчів Rejuran Renew Eye Patch біля дзеркала", caption: "Rejuran · Renew Eye Patch" },
        { src: "product-nubea-solenium.jpg", alt: "Флакон Nubea Solenium у руці", caption: "Nubea · Solenium" },
        { src: "product-kydra-blonde.jpg", alt: "Фарби Kydra Blonde Beauty й окисник на тлі чорної раковини", caption: "Kydra le salon · Blonde Beauty" },
        { src: "product-kydra-signature.jpg", alt: "Kydra Signature: міст, крем для рук і масажна щітка на золотому підносі біля свічки", caption: "Kydra le salon · Signature" },
        { src: "product-kydra-dore.jpg", alt: "Флакон Kydra Doré у смузі сонячного світла на темному тлі", caption: "Kydra le salon · Doré" },
        { src: "product-olaplex.jpg", alt: "Набір Olaplex на чорному шовку", caption: "Olaplex" },
        { src: "product-corpus-jar.jpg", alt: "Баночка Corpus N° Vert у складках вафельного рушника", caption: "Corpus · N° Vert" },
        { src: "product-cream-shoulder.jpg", alt: "Мазок крему на плечі, вафельний халат", caption: "" },
        { src: "product-darling-duo.jpg", alt: "Два флакони Darling SPF 50 і SPF 30 у краплях води", caption: "Darling · Protect-Me SPF 50 і SPF 30" },
        { src: "product-jackhenry-bodywash.jpg", alt: "Гель для душу jack henry, що спирається на металевий каркас", caption: "jack henry · body wash", position: "40% 60%" },
        { src: "product-isclinical-serum.jpg", alt: "Сироватка iS Clinical у руках з червоним манікюром", caption: "iS Clinical · Hydra-Cool Serum" },
        { src: "product-janmarini-gel.jpg", alt: "Очищувальний гель Jan Marini з піною в руках, вафельний халат", caption: "Jan Marini · C-Esta Cleansing Gel" },
        { src: "product-kydra-delicatesse.jpg", alt: "Тюбик Kydra délicatesse у руках на чорному тлі", caption: "Kydra le salon · délicatesse" },
        { src: "product-jackhenry-deodorant.jpg", alt: "Дезодорант jack henry, видимий крізь розрив у білому папері", caption: "jack henry · deodorant" },
        { src: "product-napura-hair.jpg", alt: "Фарби Napura In Nuance на хвилі каштанового волосся", caption: "Napura · In Nuance" },
        { src: "product-corpus-bodybutter.jpg", alt: "Олія для тіла Corpus N° Green наноситься на руку", caption: "Corpus · N° Green" },
      ],
    },
    {
      category: "Процедури",
      description: "Процес роботи, руки майстра, інструменти, деталі та результат.",
      layout: "split",
      items: [
        { src: "procedure-massage-back-warm.jpg", alt: "Руки майстра під час масажу спини, тепле світло", caption: "" },
        { src: "procedure-dinolite-hair.jpg", alt: "Огляд пасма волосся цифровим мікроскопом", caption: "" },
        { src: "procedure-body-roller.jpg", alt: "Апаратний масаж тіла роликовою насадкою", caption: "" },
        { src: "procedure-akiro-blade.jpg", alt: "Майстриня тримає металевий скребок Akiro Blade", caption: "", position: "50% 60%" },
        { src: "procedure-scalp-injection.jpg", alt: "Ін'єкційна процедура для шкіри голови, руки в рукавичках", caption: "" },
        { src: "procedure-roller-device.jpg", alt: "Насадка апарата з підсвіткою в руках майстрині", caption: "", position: "50% 45%" },
        { src: "procedure-led-mask.jpg", alt: "LED-терапія: обличчя під зеленим світлом апарата", caption: "" },
        { src: "procedure-back-massage.jpg", alt: "Рука майстра на плечі під час масажу", caption: "", position: "50% 55%" },
        { src: "procedure-dry-brush.jpg", alt: "Сухий масаж щіткою по спині", caption: "" },
        { src: "procedure-jade-mask.jpg", alt: "Нефритова маска для очей і дерев'яні палички на білому рушнику", caption: "Ahentsiia Krasy" },
        { src: "procedure-face-massage.jpg", alt: "Масаж обличчя: руки майстра на обличчі клієнтки", caption: "Ahentsiia Krasy", position: "40% 50%" },
      ],
    },
    {
      category: "Люди",
      description: "Портрети, емоції, природні моменти, робота з моделлю.",
      layout: "stack",
      items: [
        { src: "people-kydra-master.jpg", alt: "Портрет майстрині салону Kydra у чорній уніформі", caption: "Kydra le salon", position: "50% 25%" },
        { src: "people-cosmetologist.jpg", alt: "Портрет косметологині за робочим столом з ноутбуком", caption: "", position: "50% 30%" },
        { src: "people-specialist.jpg", alt: "Усміхнений фахівець у білій формі в кабінеті", caption: "", position: "50% 25%" },
        { src: "procedure-trichology.jpg", alt: "Трихолог оглядає шкіру голови камерою-дерматоскопом", caption: "", position: "50% 40%" },
        { src: "procedure-body-device.jpg", alt: "Апаратна процедура для тіла", caption: "", position: "50% 30%" },
        { src: "people-blonde-sweater.jpg", alt: "Портрет дівчини у пухнастому светрі", caption: "", position: "50% 30%" },
        { src: "people-relax-airpods.jpg", alt: "Дівчина з заплющеними очима лежить на кушетці, майстер вставляє навушник", caption: "" },
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

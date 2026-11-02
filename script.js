/* =====================================================================
   PORTFOLIO — script.js
   Логіка сайту. Контент редагується у content.js, не тут.
   ===================================================================== */
(() => {
  "use strict";

  const C = window.PORTFOLIO_CONTENT;
  if (!C) { console.warn("content.js не знайдено"); return; }

  const root = document.documentElement;
  const params = new URLSearchParams(location.search);
  const SETUP = params.has("setup") || Boolean(C.settings && C.settings.setupMode);
  const GRADE = !C.settings || C.settings.filmGrade !== false;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduceMotion && "IntersectionObserver" in window) root.classList.add("js-motion");
  if (SETUP) root.classList.add("is-setup");

  const missing = [];

  /* ---------------- helpers ---------------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const isEmpty = (v) => {
    if (v === undefined || v === null) return true;
    const s = String(v).trim();
    return s === "" || /^YOUR_[A-Z_]+$/.test(s) || /^(VIDEO_URL|VIDEO_THUMBNAIL_URL|PHOTO_URL)$/.test(s);
  };

  const getPath = (obj, path) => path.split(".").reduce((o, k) => (o ? o[k] : undefined), obj);

  function el(tag, attrs = {}, ...children) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v === false || v === null || v === undefined) continue;
      if (k === "class") node.className = v;
      else if (k === "text") node.textContent = v;
      else if (k === "html") node.innerHTML = v;
      else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
      else if (k === "style") node.style.cssText = v;
      else node.setAttribute(k, v === true ? "" : v);
    }
    for (const c of children.flat()) {
      if (c === null || c === undefined || c === false) continue;
      node.append(c.nodeType ? c : document.createTextNode(String(c)));
    }
    return node;
  }

  const pad2 = (n) => String(n).padStart(2, "0");

  function fallback(text) {
    return el("div", { class: "media-fallback", role: "img", "aria-label": text }, text);
  }

  /** Зображення з lazy-loading та акуратним фолбеком замість «битої» іконки */
  function makeImg({ src, alt = "", demo = false, eager = false, label = "Зображення", position = "" }) {
    if (isEmpty(src)) return fallback(SETUP ? `${label}: додайте посилання` : label);
    const img = el("img", {
      src, alt,
      loading: eager ? "eager" : "lazy",
      decoding: "async",
      fetchpriority: eager ? "high" : false,
      class: demo && GRADE ? "is-demo-graded" : false,
      style: position ? `object-position:${position}` : false,
    });
    img.addEventListener("error", () => img.replaceWith(fallback("Зображення не завантажилось")), { once: true });
    return img;
  }

  const tag = (text, inline = false) => el("span", { class: "slot-tag" + (inline ? " slot-tag--inline" : ""), text });

  /* ---------------- текстові прив'язки ---------------- */
  $$("[data-bind]").forEach((n) => {
    const v = getPath(C, n.dataset.bind);
    if (v !== undefined) n.textContent = v;
  });
  $$("[data-bind-html]").forEach((n) => {
    const v = getPath(C, n.dataset.bindHtml);
    if (v !== undefined) n.innerHTML = v;
  });

  /* ---------------- власник ---------------- */
  const owner = C.owner || {};
  const hasName = !isEmpty(owner.name);
  if (hasName) {
    const nameEl = $("#about-name");
    nameEl.textContent = owner.name;
    nameEl.hidden = false;
    document.title = `${owner.name} — Videography & Photography`;
  } else {
    missing.push("Ім'я (owner.name)");
  }
  const year = (C.footer && C.footer.year) || new Date().getFullYear();
  $("#copyright").textContent = `© ${year}${hasName ? " " + owner.name : ""}`;

  if (!isEmpty(owner.photo)) {
    const fig = $("#about-photo");
    fig.append(makeImg({ src: owner.photo, alt: owner.photoAlt || (hasName ? owner.name : "Портрет"), label: "Портрет" }));
    fig.hidden = false;
    $("#about").classList.add("has-photo");
  }

  (owner.worksWith || []).forEach((t) => $("#works-with").append(el("li", { text: t })));
  (owner.formats || []).forEach((t) => $("#formats").append(el("li", { text: t })));

  /* ---------------- бренди ---------------- */
  const clients = (C.clients || []).filter((x) => !isEmpty(x));
  const brands = (C.brands || []).filter((x) => !isEmpty(x));
  clients.forEach((t) => $("#clients-list").append(el("li", { text: t })));
  brands.forEach((t) => $("#brands-list").append(el("li", { text: t })));
  $("#clients-group").hidden = !clients.length;
  $("#brands-group").hidden = !brands.length;
  $("#brands").hidden = !clients.length && !brands.length;

  /* ---------------- контакти ---------------- */
  const ICONS = {
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".6" fill="currentColor"/></svg>',
    email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1"/><path d="m3.5 6 8.5 7 8.5-7"/></svg>',
    telegram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M21 4 3 11l6 2.2M21 4l-3 16-9-6.8M21 4 9 13.2V19l3.2-3.3"/></svg>',
  };

  function contactLink(kind, raw) {
    const v = String(raw).trim();
    if (kind === "email") {
      const addr = v.replace(/^mailto:/i, "");
      return { href: `mailto:${addr}`, label: addr, name: "Email", external: false };
    }
    if (kind === "instagram") {
      const href = v.startsWith("@") ? `https://instagram.com/${v.slice(1)}` : v;
      return { href, label: href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""), name: "Instagram", external: true };
    }
    const href = v.startsWith("@") ? `https://t.me/${v.slice(1)}` : v;
    return { href, label: href.replace(/^https?:\/\//, "").replace(/\/$/, ""), name: "Telegram", external: true };
  }

  const contacts = C.contacts || {};
  let contactCount = 0;
  [["instagram", "YOUR_INSTAGRAM_URL"], ["email", "YOUR_EMAIL"], ["telegram", "YOUR_TELEGRAM_URL"]].forEach(([kind, ph]) => {
    const value = contacts[kind];
    if (isEmpty(value)) {
      missing.push(`${kind[0].toUpperCase() + kind.slice(1)} (${ph})`);
      if (SETUP) {
        $("#about-contacts").append(el("li", { class: "slot-empty", html: `${ICONS[kind]}` }, " ", tag(ph, true)));
      }
      return;
    }
    contactCount++;
    const c = contactLink(kind, value);
    const ext = c.external ? { target: "_blank", rel: "noopener" } : {};
    $("#about-contacts").append(el("li", {}, el("a", { href: c.href, ...ext, html: ICONS[kind] }, c.label)));
    $("#footer-contacts").append(el("li", {}, el("a", { href: c.href, ...ext }, c.name)));
  });
  if (!contactCount && !SETUP) {
    $("#about-contacts-col").hidden = true;
    $("#footer-contacts").hidden = true;
  }

  /* ---------------- розбір посилань на відео ---------------- */
  function parseVideo(url) {
    const u = String(url).trim();
    let m;
    if ((m = u.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/))) {
      return { kind: "iframe", vertical: /\/shorts\//.test(u),
        src: `https://www.youtube-nocookie.com/embed/${m[1]}?autoplay=1&rel=0&modestbranding=1&playsinline=1` };
    }
    if ((m = u.match(/vimeo\.com\/(?:video\/)?(\d+)(?:\/([\da-f]+))?/))) {
      return { kind: "iframe", src: `https://player.vimeo.com/video/${m[1]}?autoplay=1&dnt=1${m[2] ? "&h=" + m[2] : ""}` };
    }
    if ((m = u.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]+)/))) {
      return { kind: "iframe", src: `https://drive.google.com/file/d/${m[1]}/preview` };
    }
    return { kind: "file", src: u };
  }

  /* ---------------- модальні вікна: спільне ---------------- */
  let lastFocus = null;
  let openLayer = null;

  function lockScroll(lock) { document.body.classList.toggle("is-locked", lock); }

  function openLayerEl(node) {
    lastFocus = document.activeElement;
    node.hidden = false;
    requestAnimationFrame(() => node.classList.add("is-open"));
    lockScroll(true);
    openLayer = node;
    const first = node.querySelector("button[data-close]");
    if (first) first.focus({ preventScroll: true });
  }

  function closeLayerEl(node, after) {
    node.classList.remove("is-open");
    const done = () => { node.hidden = true; if (after) after(); };
    if (reduceMotion) done(); else setTimeout(done, 300);
    lockScroll(false);
    openLayer = null;
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }

  function trapFocus(e, node) {
    const f = $$("button:not([hidden]), [href], iframe, video[controls], [tabindex]:not([tabindex='-1'])", node)
      .filter((x) => x.offsetParent !== null || x.tagName === "IFRAME");
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* ---------------- відеоплеєр ---------------- */
  const vModal = $("#video-modal");
  const player = $("#player");
  const vState = { list: [], idx: 0, category: "" };

  function renderVideo() {
    const item = vState.list[vState.idx];
    const parsed = parseVideo(item.url);
    player.innerHTML = "";
    player.classList.toggle("is-vertical", Boolean(item.vertical || parsed.vertical));

    if (parsed.kind === "iframe") {
      player.append(el("iframe", {
        src: parsed.src, title: item.title || vState.category,
        allow: "autoplay; fullscreen; picture-in-picture; encrypted-media",
        allowfullscreen: true, referrerpolicy: "strict-origin-when-cross-origin",
      }));
    } else {
      const v = el("video", { src: parsed.src, poster: isEmpty(item.thumbnail) ? false : item.thumbnail, controls: true, autoplay: true, playsinline: true, preload: "metadata" });
      v.addEventListener("loadedmetadata", () => {
        if (!item.vertical && v.videoHeight > v.videoWidth) player.classList.add("is-vertical");
      });
      v.addEventListener("error", () => {
        player.innerHTML = "";
        player.append(fallback(SETUP
          ? "Не вдалося відтворити файл. Перевірте посилання у content.js (потрібен прямий лінк на MP4)."
          : "Відео тимчасово недоступне."));
      });
      player.append(v);
    }

    $("#video-modal-title").textContent = item.title || vState.category;
    $("#video-modal-caption").textContent = [item.caption, item.duration].filter(Boolean).join("  ·  ");
    const many = vState.list.length > 1;
    $("#video-modal-nav").hidden = !many;
    if (many) $("#video-modal-count").textContent = `${vState.idx + 1} / ${vState.list.length}`;
  }

  function openVideo(list, idx = 0, category = "") {
    Object.assign(vState, { list, idx, category });
    renderVideo();
    openLayerEl(vModal);
  }

  function stepVideo(d) {
    vState.idx = (vState.idx + d + vState.list.length) % vState.list.length;
    renderVideo();
  }

  vModal.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) closeLayerEl(vModal, () => { player.innerHTML = ""; });
    if (e.target.closest("[data-video-prev]")) stepVideo(-1);
    if (e.target.closest("[data-video-next]")) stepVideo(1);
  });

  /* ---------------- HERO ---------------- */
  const hero = C.hero || {};
  const heroMedia = $("#hero-media");
  if (!isEmpty(hero.backgroundLoop)) {
    heroMedia.prepend(el("video", {
      src: hero.backgroundLoop, autoplay: !reduceMotion, muted: true, loop: true, playsinline: true,
      poster: isEmpty(hero.image) ? false : hero.image, "aria-hidden": "true",
    }));
    const vid = heroMedia.querySelector("video");
    vid.muted = true;
  } else {
    heroMedia.prepend(makeImg({ src: hero.image, alt: hero.imageAlt || "", demo: hero.demo, eager: true, label: "Головне фото", position: hero.imagePosition }));
  }

  const showreelBtn = $("#showreel-play");
  if (!isEmpty(hero.showreelUrl)) {
    showreelBtn.hidden = false;
    showreelBtn.addEventListener("click", () =>
      openVideo([{ title: "Showreel", url: hero.showreelUrl, duration: hero.showreelDuration }], 0, "Showreel"));
    $("#showreel-duration").textContent = hero.showreelDuration || "";
  } else {
    $("#showreel-duration").textContent = "Незабаром";
    missing.push("Шоурил (hero.showreelUrl)");
    if (SETUP) { heroMedia.classList.add("slot-empty"); heroMedia.append(tag("SHOWREEL: VIDEO_URL")); }
  }

  /* ---------------- VIDEO ---------------- */
  /* Беззвучне прев'ю при наведенні (тільки миша, тільки MP4, без reduced-motion) */
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  function attachPreview(card, thumb, item) {
    if (!canHover || reduceMotion || parseVideo(item.url).kind !== "file") return;
    let v = null, timer = null;
    card.addEventListener("mouseenter", () => {
      timer = setTimeout(() => {
        if (!v) {
          v = el("video", { class: "thumb-preview", src: item.url, muted: true, loop: true, playsinline: true, preload: "none", "aria-hidden": "true" });
          v.muted = true;
          v.addEventListener("playing", () => { v.classList.add("is-on"); card.classList.add("is-previewing"); });
          thumb.append(v);
        }
        v.play().catch(() => {});
      }, 250);
    });
    card.addEventListener("mouseleave", () => {
      clearTimeout(timer);
      if (v) { v.pause(); v.classList.remove("is-on"); card.classList.remove("is-previewing"); }
    });
  }

  const videoGrid = $("#video-grid");
  let demoCount = hero.demo ? 1 : 0;

  (C.videos || []).forEach((cat, i) => {
    const items = (cat.items || []);
    const playable = items.filter((it) => !isEmpty(it.url));
    const cover = items[0] || {};
    if (cover.demo) demoCount++;

    const card = el("article", { class: "video-card reveal" + (playable.length ? " is-playable" : ""), style: `--d:${i * 0.08}s` });
    const thumb = el("div", { class: "thumb" },
      makeImg({ src: cover.thumbnail, alt: cover.title ? `Обкладинка: ${cover.title}` : `Обкладинка категорії ${cat.category}`, demo: cover.demo, label: "Обкладинка" , position: cover.position }));
    if (playable.length) {
      thumb.append(el("span", { class: "play", "aria-hidden": "true" }, el("span", { class: "play-icon" })));
      attachPreview(card, thumb, playable[0]);
    }

    if (!playable.length) {
      missing.push(`Відео: ${cat.category} (VIDEO_URL)`);
      if (SETUP) { thumb.classList.add("slot-empty"); thumb.append(tag("VIDEO_URL не задано")); }
    } else if (SETUP && cover.demo) {
      thumb.append(tag("Демо-обкладинка"));
    }

    // стрічка з усіма роликами категорії — видно, що всередині
    let strip = null;
    if (playable.length > 1) {
      strip = el("div", { class: "reel-strip", role: "list", "aria-label": `Ролики: ${cat.category}`, style: `--n:${Math.max(4, playable.length)}` });
      playable.forEach((it, k) => {
        strip.append(el("button", {
          class: "reel-chip" + (k === 0 ? " is-cover" : ""), type: "button", role: "listitem",
          title: it.title || "", "aria-label": `Дивитись: ${it.title || cat.category}`,
          onclick: () => openVideo(playable, k, cat.category),
        }, makeImg({ src: it.thumbnail, alt: "", label: "" }), el("span", { class: "reel-chip-time", text: it.duration || "" })));
      });
    }

    card.append(
      thumb,
      strip,
      el("h3", { class: "card-label" }, el("span", { class: "card-num", text: `${pad2(i + 1)} /` }), el("span", { text: cat.category })),
      el("p", { class: "card-desc", text: cat.description }),
    );

    if (playable.length) {
      card.append(el("button", {
        class: "card-cta", type: "button",
        "aria-label": `Переглянути відео: ${cat.category}`,
        onclick: () => openVideo(playable, 0, cat.category),
      }, playable.length > 1 ? `Переглянути (${playable.length})` : "Переглянути", el("span", { class: "arrow", "aria-hidden": "true" })));
    } else {
      card.append(el("p", { class: "card-soon", text: "Відео незабаром" }));
    }
    videoGrid.append(card);
  });

  /* ---------------- PHOTO ---------------- */
  const photoGrid = $("#photo-grid");
  const lb = $("#lightbox");
  const lbImg = $("#lb-img");
  const lbState = { list: [], idx: 0, category: "" };

  (C.photos || []).forEach((cat, i) => {
    const all = cat.items || [];
    const list = all.filter((p) => !isEmpty(p.src));
    all.forEach((p) => { if (p.demo) demoCount++; });
    const emptyCount = all.length - list.length;
    if (emptyCount) missing.push(`Фото: ${cat.category} — порожніх слотів ${emptyCount} (PHOTO_URL)`);
    if (!list.length && !SETUP) return;

    const layout = cat.layout === "split" ? "split" : "stack";
    const visible = layout === "split" ? 4 : 3;
    const shown = (SETUP ? all : list).slice(0, visible);
    const collage = el("div", { class: `collage collage--${layout}` });

    shown.forEach((p, j) => {
      const empty = isEmpty(p.src);
      const tile = el(empty ? "div" : "button", empty ? { class: "tile slot-empty" } : {
        class: "tile", type: "button",
        "aria-label": `Відкрити фото: ${p.alt || cat.category}`,
        onclick: () => openLightbox(list, list.indexOf(p), cat.category),
      }, makeImg({ src: p.src, alt: p.alt || "", demo: p.demo, label: "Фото", position: p.position }));
      if (SETUP && (empty || p.demo)) tile.append(tag(empty ? "PHOTO_URL" : "Демо"));
      const extra = list.length - visible;
      if (j === shown.length - 1 && extra > 0) tile.append(el("span", { class: "tile-more", "aria-hidden": "true", text: `+${extra}` }));
      collage.append(tile);
    });

    const block = el("article", { class: "photo-cat reveal", style: `--d:${i * 0.1}s` },
      collage,
      el("h3", { class: "card-label" }, el("span", { class: "card-num", text: `${pad2(i + 1)} /` }), el("span", { text: cat.category })),
      el("p", { class: "card-desc", text: cat.description }),
    );
    if (list.length) {
      block.append(el("button", {
        class: "card-cta", type: "button",
        "aria-label": `Переглянути фото: ${cat.category}`,
        onclick: () => openLightbox(list, 0, cat.category),
      }, "Переглянути", el("span", { class: "arrow", "aria-hidden": "true" })));
    }
    photoGrid.append(block);
  });

  if (demoCount) missing.push(`Демо-зображення на сайті: ${demoCount} — замініть своїми`);

  /* ---------------- LIGHTBOX ---------------- */
  function renderLightbox() {
    const p = lbState.list[lbState.idx];
    lbImg.classList.add("is-loading");
    lbImg.onload = () => lbImg.classList.remove("is-loading");
    lbImg.onerror = () => { lbImg.classList.remove("is-loading"); $("#lb-text").textContent = "Зображення не завантажилось"; };
    lbImg.src = p.src;
    lbImg.alt = p.alt || "";
    lbImg.classList.toggle("is-demo-graded", Boolean(p.demo && GRADE));
    $("#lb-category").textContent = lbState.category;
    $("#lb-text").textContent = p.caption || (p.demo ? "Демо-зображення · Unsplash" : "");
    $("#lb-count").textContent = `${lbState.idx + 1} / ${lbState.list.length}`;
    const many = lbState.list.length > 1;
    $$(".lb-arrow", lb).forEach((b) => { b.hidden = !many; });
    // попереднє завантаження сусідів
    [1, -1].forEach((d) => {
      const n = lbState.list[(lbState.idx + d + lbState.list.length) % lbState.list.length];
      if (n) { const im = new Image(); im.src = n.src; }
    });
  }

  function openLightbox(list, idx, category) {
    Object.assign(lbState, { list, idx: Math.max(0, idx), category });
    renderLightbox();
    openLayerEl(lb);
  }
  function stepLightbox(d) {
    lbState.idx = (lbState.idx + d + lbState.list.length) % lbState.list.length;
    renderLightbox();
  }

  lb.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) return closeLayerEl(lb);
    if (e.target.closest("[data-lb-prev]")) return stepLightbox(-1);
    if (e.target.closest("[data-lb-next]")) return stepLightbox(1);
    if (e.target === lb || e.target.classList.contains("lb-figure")) closeLayerEl(lb); // клік поза фото
  });

  let touchX = null;
  lb.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50 && lbState.list.length > 1) stepLightbox(dx < 0 ? 1 : -1);
    touchX = null;
  }, { passive: true });

  /* ---------------- клавіатура ---------------- */
  document.addEventListener("keydown", (e) => {
    if (openLayer === lb) {
      if (e.key === "Escape") closeLayerEl(lb);
      else if (e.key === "ArrowRight") stepLightbox(1);
      else if (e.key === "ArrowLeft") stepLightbox(-1);
      else if (e.key === "Tab") trapFocus(e, lb);
    } else if (openLayer === vModal) {
      if (e.key === "Escape") closeLayerEl(vModal, () => { player.innerHTML = ""; });
      else if (e.key === "Tab") trapFocus(e, vModal);
    } else if (e.key === "Escape" && navList.classList.contains("is-open")) {
      setNav(false); navToggle.focus();
    }
  });

  /* ---------------- навігація ---------------- */
  const header = $(".site-header");
  const navToggle = $(".nav-toggle");
  const navList = $("#nav-list");

  function setNav(open) {
    navToggle.setAttribute("aria-expanded", String(open));
    navList.classList.toggle("is-open", open);
    lockScroll(open);
  }
  navToggle.addEventListener("click", () => setNav(navToggle.getAttribute("aria-expanded") !== "true"));
  navList.addEventListener("click", (e) => { if (e.target.closest("a") && navList.classList.contains("is-open")) setNav(false); });
  window.matchMedia("(min-width: 861px)").addEventListener("change", (e) => { if (e.matches) setNav(false); });

  const onScroll = () => header.classList.toggle("is-solid", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if ("IntersectionObserver" in window) {
    const links = new Map($$(".nav-list a").map((a) => [a.getAttribute("href").slice(1), a]));
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        const a = links.get(en.target.id);
        if (a && en.isIntersecting) {
          links.forEach((x) => x.classList.remove("is-active"));
          a.classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["video", "photo", "about", "contact"].forEach((id) => { const s = document.getElementById(id); if (s) spy.observe(s); });
  }

  /* ---------------- поява секцій ---------------- */
  $$(".section-intro, .about-photo, .about-intro, .about-col").forEach((n, i) => {
    n.classList.add("reveal");
    if (n.classList.contains("about-col")) n.style.setProperty("--d", `${(i % 4) * 0.08}s`);
  });
  if (root.classList.contains("js-motion")) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    $$(".reveal").forEach((n) => io.observe(n));
  }

  /* ---------------- режим налаштування ---------------- */
  if (SETUP) {
    const panel = $("#setup-panel");
    panel.hidden = false;
    panel.append(
      el("h2", { text: "Режим налаштування" }),
      el("p", { text: missing.length ? "Що ще потрібно заповнити в content.js:" : "Усе заповнено. Відкрийте сайт без ?setup." }),
      el("ul", {}, missing.map((m) => el("li", { text: m }))),
      el("button", { type: "button", onclick: () => { panel.hidden = true; } }, "Сховати панель"),
    );
  }
})();

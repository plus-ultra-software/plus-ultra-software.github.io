/* ============================================================
   Plus Ultra Software — main.js
   · Hamburger / drawer
   · Language switcher (EN / IS)
   · Cookie consent
   · Scroll-spy active link
   · Navbar scroll shadow
   ============================================================ */

(function () {
  'use strict';

  /* ── Translations ────────────────────────────────────────── */
  const i18n = {
    en: {
      'nav.home':             'Home',
      'nav.services':         'Services',
      'nav.about':            'About Us',
      'nav.contact':          'Contact Us',
      'lang.label':           'EN',
      'hero.eyebrow':         'Software Development & Professional Services',
      'hero.line1':           'Go Further.',
      'hero.line2':           'Move Faster.',
      'hero.line3':           'Think Smarter.',
      'hero.sub':             'We build software and deliver professional services that help organisations reach further than they thought possible.',
      'hero.cta':             'Discover Our Services',
      'services.label':       'What We Do',
      'services.title':       'Our Services',
      'services.sub':         'Tailored software and consulting built around your goals.',
      'svc1.title':           'Custom Software Development',
      'svc1.desc':            'Bespoke applications designed and engineered from the ground up to solve your specific challenges.',
      'svc2.title':           'Professional Services',
      'svc2.desc':            'Expert consulting, project delivery, and technical leadership to accelerate your most critical initiatives.',
      'svc3.title':           'Digital Transformation',
      'svc3.desc':            'End-to-end strategy and execution to modernise your systems, processes, and ways of working.',
      'about.label':          'Our Story',
      'about.title':          'About Us',
      'about.p1':             'Plus Ultra Software was founded on a simple belief: great software changes everything. We combine deep technical expertise with genuine business understanding to deliver solutions that move organisations forward.',
      'about.p2':             'Our name is drawn from the Latin motto meaning "further beyond" — a commitment to going past the limits of what seems possible, every time.',
      'val1.title':           'Quality First',
      'val1.desc':            'We hold ourselves to the highest standards in every line of code and every deliverable.',
      'val2.title':           'Client-Centred',
      'val2.desc':            'We align fully with your goals and measure our success by your outcomes.',
      'val3.title':           'Always Improving',
      'val3.desc':            'We invest continuously in our people, tools, and processes.',
      'contact.label':        'Get In Touch',
      'contact.title':        'Contact Us',
      'contact.sub':          'Tell us about your project and we\'ll get back to you within one business day.',
      'form.name':            'Full Name',
      'form.email':           'Email Address',
      'form.phone':           'Phone Number',
      'form.message':         'Message',
      'form.submit':          'Send Message',
      'footer.copy':          '© 2026 Plus Ultra Software. All rights reserved.',
      'cookie.msg':           '<strong>We use cookies.</strong> We use cookies to improve your experience on our site. You can accept all cookies or reject non-essential ones.',
      'cookie.accept':        'Accept All',
      'cookie.reject':        'Reject Non-Essential',
      'drawer.menu':          'Menu',
    },
    is: {
      'nav.home':             'Heim',
      'nav.services':         'Þjónusta',
      'nav.about':            'Um Okkur',
      'nav.contact':          'Hafðu Samband',
      'lang.label':           'IS',
      'hero.eyebrow':         'Hugbúnaðargerð og ráðgjafaþjónusta',
      'hero.line1':           'Náðu lengra og',
      'hero.line2':           'hraðar.',
      'hero.line3':           'Betur.',
      'hero.sub':             'Við smíðum hugbúnað og veitum faglega þjónustu ásamt því að deila reynslu okkar af verkefnum erlendis.',
      'hero.cta':             'Skoðaðu hvað við bjóðum upp á',
      'services.label':       'Hvað við gerum',
      'services.title':       'Þjónusta',
      'services.sub':         'Sérsniðinn hugbúnaður og ráðgjöf byggt á þörfum þínum.',
      'svc1.title':           'Sérsniðinn Hugbúnaður',
      'svc1.desc':            'Hugbúnaður forritaður frá grunni til að leysa þín vandamál.',
      'svc2.title':           'Rekstrarráðgjöf',
      'svc2.desc':            'Sérfræðiráðgjöf í tengslum við rekstur hugbúnaðarkerfa. Deilum reynslu okkar úr verkefnum erlendis til að gera þitt umhverfi betra.',
      'svc3.title':           'Stafræn Umbreyting',
      'svc3.desc':            'Heildstæð stefna og framkvæmd til að nútímavæða kerfi, ferla og vinnulag.',
      'about.label':          'Saga Okkar',
      'about.title':          'Um Okkur',
      'about.p1':             'Plus Ultra Software var stofnað á einfaldri trú: frábær hugbúnaður breytir öllu. Við sameinum djúpa tæknilega sérfræðiþekkingu við raunverulegan viðskiptaskilning til að skila lausnum sem færa fyrirtæki áfram.',
      'about.p2':             'Nafn okkar er dregið af latneska mottóinu sem þýðir "lengra þar yfrá" — skuldbinding um að fara umfram þær takmarkanir sem mögulegar virðast.',
      'val1.title':           'Gæði Fyrst',
      'val1.desc':            'Við setjum okkur hæstu staðla í hverri kóðalínu og hverju afhendingarlykli.',
      'val2.title':           'Viðskiptavinurinn Fyrst',
      'val2.desc':            'Við stillum okkur að markmiðum þínum og mælum árangur okkar eftir niðurstöðum þínum.',
      'val3.title':           'Alltaf að Bæta',
      'val3.desc':            'Við fjárfestum stöðugt í fólki okkar, verkfærum og ferlum.',
      'contact.label':        'Hafðu Samband',
      'contact.title':        'Samband',
      'contact.sub':          'Segðu okkur frá verkefninu þínu og við svörum innan eins virkis dags.',
      'form.name':            'Fullt Nafn',
      'form.email':           'Netfang',
      'form.phone':           'Símanúmer',
      'form.message':         'Skilaboð',
      'form.submit':          'Senda Skilaboð',
      'footer.copy':          '© 2026 Plus Ultra Software. Öll réttindi áskilin.',
      'cookie.msg':           '<strong>Við notum vafrakökur.</strong> Við notum vafrakökur til að bæta upplifun þína. Þú getur samþykkt allar vafrakökur eða hafnað ónauðsynlegum.',
      'cookie.accept':        'Samþykkja Allt',
      'cookie.reject':        'Hafna Ónauðsynlegum',
      'drawer.menu':          'Valmynd',
    }
  };

  /* ── State ───────────────────────────────────────────────── */
  let currentLang = localStorage.getItem('pus_lang') || 'en';

  /* ── DOM refs ────────────────────────────────────────────── */
  const navbar         = document.getElementById('navbar');
  const hamburger      = document.getElementById('hamburger');
  const drawer         = document.getElementById('drawer');
  const drawerOverlay  = document.getElementById('drawerOverlay');
  const drawerClose    = document.getElementById('drawerClose');
  const langBtn        = document.getElementById('langBtn');
  const langSwitcher   = document.getElementById('langSwitcher');
  const cookieBanner   = document.getElementById('cookieBanner');
  const cookieAccept   = document.getElementById('cookieAccept');
  const cookieReject   = document.getElementById('cookieReject');
  const drawerLinks    = document.querySelectorAll('.pus-drawer__links a');

  /* ── Apply translations ──────────────────────────────────── */
  function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem('pus_lang', lang);
    const t = i18n[lang];

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (t[key] !== undefined) {
        el.innerHTML = t[key];
      }
    });

    document.documentElement.lang = lang;

    /* update active state in lang dropdown */
    document.querySelectorAll('.pus-lang__dropdown button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    /* close dropdown */
    langSwitcher.classList.remove('open');
    langBtn.setAttribute('aria-expanded', 'false');
  }

  /* ── Language switcher ───────────────────────────────────── */
  langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = langSwitcher.classList.toggle('open');
    langBtn.setAttribute('aria-expanded', isOpen);
  });

  document.querySelectorAll('.pus-lang__dropdown button').forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.dataset.lang));
  });

  document.addEventListener('click', (e) => {
    if (!langSwitcher.contains(e.target)) {
      langSwitcher.classList.remove('open');
      langBtn.setAttribute('aria-expanded', 'false');
    }
  });

  /* ── Hamburger / Drawer ──────────────────────────────────── */
  function openDrawer() {
    drawer.classList.add('is-open');
    hamburger.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('drawer-open');
    drawerClose.focus();
  }

  function closeDrawer() {
    drawer.classList.remove('is-open');
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('drawer-open');
    hamburger.focus();
  }

  hamburger.addEventListener('click', () => {
    drawer.classList.contains('is-open') ? closeDrawer() : openDrawer();
  });

  drawerClose.addEventListener('click', closeDrawer);
  drawerOverlay.addEventListener('click', closeDrawer);

  /* close on ESC */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeDrawer();
  });

  /* close drawer and smooth-scroll when a link is clicked */
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => closeDrawer());
  });

  /* ── Navbar scroll shadow ────────────────────────────────── */
  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
    updateActiveLink();
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Scroll-spy ──────────────────────────────────────────── */
  const sections = ['home', 'services', 'about', 'contact'];

  function updateActiveLink() {
    const scrollY = window.scrollY + 100;
    let current = sections[0];

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) current = id;
    });

    drawerLinks.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', href === current);
    });
  }

  /* ── Cookie consent ──────────────────────────────────────── */
  function hideCookieBanner() {
    cookieBanner.classList.remove('is-visible');
    setTimeout(() => { cookieBanner.style.display = 'none'; }, 500);
  }

  cookieAccept.addEventListener('click', () => {
    localStorage.setItem('pus_cookies', 'accepted');
    hideCookieBanner();
  });

  cookieReject.addEventListener('click', () => {
    localStorage.setItem('pus_cookies', 'rejected');
    hideCookieBanner();
  });

  /* ── Init ────────────────────────────────────────────────── */
  function init() {
    /* language */
    applyLang(currentLang);

    /* cookie banner — show if no prior decision */
    if (!localStorage.getItem('pus_cookies')) {
      setTimeout(() => cookieBanner.classList.add('is-visible'), 1200);
    }

    /* initial scroll state */
    onScroll();
  }

  document.addEventListener('DOMContentLoaded', init);

})();

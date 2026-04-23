(function () {
  'use strict';

  // ── Character sets ──────────────────────────────────────
  const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
  const NUMBERS   = '0123456789';
  // Symbols present on a standard US keyboard, excluding quotes to avoid shell/context issues
  const SYMBOLS   = '!@#$%^&*()-_=+[]{}|;:,./<>?~';

  // ── App state ───────────────────────────────────────────
  const state = {
    length:    16,
    uppercase: true,
    lowercase: true,
    numbers:   true,
    symbols:   false,
    password:  '',
  };

  // ── Crypto helpers ──────────────────────────────────────
  function randomIndex(max) {
    // Rejection sampling to avoid modulo bias
    const limit = Math.floor(0x100000000 / max) * max;
    const buf = new Uint32Array(1);
    let val;
    do { crypto.getRandomValues(buf); val = buf[0]; } while (val >= limit);
    return val % max;
  }

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = randomIndex(i + 1);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  // ── Password generation ─────────────────────────────────
  function generate() {
    const pools = [];
    if (state.uppercase) pools.push(UPPERCASE);
    if (state.lowercase) pools.push(LOWERCASE);
    if (state.numbers)   pools.push(NUMBERS);
    if (state.symbols)   pools.push(SYMBOLS);

    if (!pools.length) return '';

    const charset = pools.join('');
    const len = state.length;
    const result = [];

    // Guarantee at least one character from each active pool
    for (const pool of pools) {
      result.push(pool[randomIndex(pool.length)]);
    }

    // Fill remaining slots from the full charset
    while (result.length < len) {
      result.push(charset[randomIndex(charset.length)]);
    }

    shuffleArray(result);
    return result.join('');
  }

  // ── Render helpers ──────────────────────────────────────
  const HTML_ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };

  function passwordToHTML(pw) {
    return pw.split('').map(ch => {
      if (/[0-9]/.test(ch)) return `<span class="pw-digit">${ch}</span>`;
      return HTML_ESCAPES[ch] ?? ch;
    }).join('');
  }

  function setSliderFill(slider) {
    const pct = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.background =
      `linear-gradient(to right, #2B7DE9 ${pct}%, rgba(255,255,255,0.08) ${pct}%)`;
  }

  // ── DOM construction ────────────────────────────────────
  function buildNav() {
    const nav = document.createElement('nav');
    nav.innerHTML = `
      <a class="pus-logo" href="/">
        <img class="pus-logo__mark" src="/password-generator/assets/orbit-mark.svg" alt="Plus Ultra Software" width="42" height="42" aria-hidden="true" />
        <div class="pus-logo__text">
          <span class="pus-logo__name">Plus Ultra</span>
          <span class="pus-logo__sub">Software</span>
        </div>
      </a>`;
    return nav;
  }

  function buildMain() {
    const main = document.createElement('main');
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <p class="card__eyebrow">Security Tool</p>
      <h1 class="card__title">Password Generator</h1>

      <div class="pw-display-wrap">
        <div class="pw-display pw-display--placeholder" id="pw-display" aria-live="polite" aria-label="Generated password">
          Click generate to create a password
        </div>
        <button class="btn-copy" id="btn-copy" aria-label="Copy password to clipboard" disabled>
          <svg id="icon-copy" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="9" y="9" width="13" height="13" rx="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
          <svg id="icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display:none">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <span class="copy-tooltip" aria-hidden="true">Copied!</span>
        </button>
      </div>

      <div class="divider"></div>

      <div class="control-row">
        <div class="control-label">
          <span class="control-label__text">Length</span>
          <span class="control-label__value" id="length-value">${state.length}</span>
        </div>
        <input type="range" id="length-slider"
               min="4" max="50" value="${state.length}"
               aria-label="Password length" />
      </div>

      <div class="options-grid" role="group" aria-label="Character types">
        <div class="option active" data-key="uppercase" role="checkbox" aria-checked="true" tabindex="0">
          <span class="option__label">Uppercase</span>
          <span class="toggle" aria-hidden="true"></span>
        </div>
        <div class="option active" data-key="lowercase" role="checkbox" aria-checked="true" tabindex="0">
          <span class="option__label">Lowercase</span>
          <span class="toggle" aria-hidden="true"></span>
        </div>
        <div class="option active" data-key="numbers" role="checkbox" aria-checked="true" tabindex="0">
          <span class="option__label">Numbers</span>
          <span class="toggle" aria-hidden="true"></span>
        </div>
        <div class="option" data-key="symbols" role="checkbox" aria-checked="false" tabindex="0">
          <span class="option__label">Symbols</span>
          <span class="toggle" aria-hidden="true"></span>
        </div>
      </div>

      <p class="error-msg" id="error-msg" role="alert">
        Select at least one character type
      </p>

      <button class="btn-generate" id="btn-generate">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
        </svg>
        Generate Password
      </button>`;

    main.appendChild(card);
    return main;
  }

  function buildFooter() {
    const footer = document.createElement('footer');
    footer.innerHTML = `<span>© 2026 Plus Ultra Software. All rights reserved.</span>`;
    return footer;
  }

  // ── Event handlers ──────────────────────────────────────
  function onGenerate() {
    const hasType = state.uppercase || state.lowercase || state.numbers || state.symbols;
    if (!hasType) {
      document.getElementById('error-msg').classList.add('visible');
      return;
    }
    document.getElementById('error-msg').classList.remove('visible');

    state.password = generate();

    const display = document.getElementById('pw-display');
    display.classList.remove('pw-display--placeholder');
    display.innerHTML = passwordToHTML(state.password);

    const copyBtn = document.getElementById('btn-copy');
    copyBtn.disabled = false;
    copyBtn.setAttribute('aria-disabled', 'false');
  }

  function onCopy() {
    if (!state.password) return;
    navigator.clipboard.writeText(state.password).then(() => {
      const btn      = document.getElementById('btn-copy');
      const iconCopy = document.getElementById('icon-copy');
      const iconCheck = document.getElementById('icon-check');

      btn.classList.add('copied');
      iconCopy.style.display = 'none';
      iconCheck.style.display = '';

      setTimeout(() => {
        btn.classList.remove('copied');
        iconCopy.style.display = '';
        iconCheck.style.display = 'none';
      }, 2000);
    });
  }

  function onOptionToggle(el) {
    const key = el.dataset.key;
    state[key] = !state[key];
    el.classList.toggle('active', state[key]);
    el.setAttribute('aria-checked', String(state[key]));

    // Clear error when user enables a type
    if (state[key]) {
      document.getElementById('error-msg').classList.remove('visible');
    }
  }

  // ── Wire events ─────────────────────────────────────────
  function wireEvents() {
    const slider = document.getElementById('length-slider');
    slider.addEventListener('input', () => {
      state.length = Number(slider.value);
      document.getElementById('length-value').textContent = state.length;
      setSliderFill(slider);
    });
    setSliderFill(slider);

    document.querySelectorAll('.option').forEach(el => {
      el.addEventListener('click', () => onOptionToggle(el));
      el.addEventListener('keydown', e => {
        if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); onOptionToggle(el); }
      });
    });

    document.getElementById('btn-generate').addEventListener('click', onGenerate);
    document.getElementById('btn-copy').addEventListener('click', onCopy);
  }

  // ── Init ────────────────────────────────────────────────
  function init() {
    document.body.appendChild(buildNav());
    document.body.appendChild(buildMain());
    document.body.appendChild(buildFooter());
    wireEvents();
    onGenerate();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

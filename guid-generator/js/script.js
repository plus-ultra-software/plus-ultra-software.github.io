(function () {
  'use strict';

  // ── App state ───────────────────────────────────────────
  const state = {
    count:     1,
    hyphens:   true,
    braces:    false,
    uppercase: false,
    quotes:    false,
    commas:    false
  };

  // ── GUID Generator ──────────────────────────────────────
  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, 
            v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  function generate() {
    const guids = [];
    for (let i = 0; i < state.count; i++) {
      let guid = generateUUID();

      if (!state.hyphens) {
        guid = guid.replace(/-/g, '');
      }
      if (state.uppercase) {
        guid = guid.toUpperCase();
      }
      if (state.braces) {
        guid = `{${guid}}`;
      }
      if (state.quotes) {
        guid = `"${guid}"`;
      }
      guids.push(guid);
    }

    return state.commas ? guids.join(',\n') : guids.join('\n');
  }

  // ── Event handlers ──────────────────────────────────────
  function onGenerate() {
    const output = document.getElementById('guid-output');
    output.value = generate();
    
    // Enable copy button
    const copyBtn = document.getElementById('btn-copy');
    copyBtn.disabled = false;
    copyBtn.setAttribute('aria-disabled', 'false');
  }

  function onCopy() {
    const output = document.getElementById('guid-output');
    if (!output.value) return;

    navigator.clipboard.writeText(output.value).then(() => {
      const btn = document.getElementById('btn-copy');
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
    }).catch(err => {
      // Fallback
      output.select();
      document.execCommand('copy');
      window.getSelection().removeAllRanges();
      
      const btn = document.getElementById('btn-copy');
      btn.classList.add('copied');
      setTimeout(() => {
        btn.classList.remove('copied');
      }, 2000);
    });
  }

  function onOptionToggle(el) {
    const key = el.dataset.key;
    state[key] = !state[key];
    el.classList.toggle('active', state[key]);
    el.setAttribute('aria-checked', String(state[key]));
  }

  function updateCount(val) {
    let count = parseInt(val);
    if (isNaN(count) || count < 1) count = 1;
    if (count > 1000) count = 1000;
    
    state.count = count;
    document.getElementById('guid-count').value = count;
  }

  // ── Wire events ─────────────────────────────────────────
  function wireEvents() {
    const countInput = document.getElementById('guid-count');
    const btnDecrease = document.getElementById('btn-decrease');
    const btnIncrease = document.getElementById('btn-increase');

    countInput.addEventListener('change', (e) => {
      updateCount(e.target.value);
    });

    btnDecrease.addEventListener('click', () => {
      updateCount(state.count - 1);
    });

    btnIncrease.addEventListener('click', () => {
      updateCount(state.count + 1);
    });

    document.querySelectorAll('.option').forEach(el => {
      el.addEventListener('click', () => onOptionToggle(el));
      el.addEventListener('keydown', e => {
        if (e.key === ' ' || e.key === 'Enter') { 
          e.preventDefault(); 
          onOptionToggle(el); 
        }
      });
    });

    document.getElementById('btn-generate').addEventListener('click', onGenerate);
    document.getElementById('btn-copy').addEventListener('click', onCopy);
  }

  // ── Init ────────────────────────────────────────────────
  function init() {
    wireEvents();
    onGenerate(); // Generate initial GUID
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

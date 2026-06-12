
const FONT_MIN  = 12;
const FONT_MAX  = 24;
const FONT_STEP = 2;
const FONT_DEFAULT = 16;

function getFontSize() {
  return parseInt(localStorage.getItem('fontSize')) || FONT_DEFAULT;
}

function setFontSize(size) {
  size = Math.min(FONT_MAX, Math.max(FONT_MIN, size));
  document.documentElement.style.fontSize = size + 'px';
  localStorage.setItem('fontSize', size);
  updateFontDisplay(size);
}

function updateFontDisplay(size) {
  const display = document.getElementById('font-size-display');
  if (display) display.textContent = size + 'px';
}

function getDarkMode() {
  return localStorage.getItem('darkMode') !== 'false'; // dark é o padrão
}

function applyDarkMode(isDark) {
  document.body.classList.toggle('light-mode', !isDark);
  localStorage.setItem('darkMode', isDark);
  const btn = document.getElementById('dark-mode-btn');
  if (btn) {
    btn.textContent = isDark ? 'Modo Claro' : 'Modo Escuro';
    btn.setAttribute('aria-pressed', isDark);
  }
}

function initDarkMode() {
  applyDarkMode(getDarkMode());

  const btn = document.getElementById('dark-mode-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const isNowDark = !document.body.classList.contains('light-mode');
    applyDarkMode(!isNowDark);
  });
}

function initFontSize() {
  setFontSize(getFontSize());

  const btnUp   = document.getElementById('font-increase');
  const btnDown = document.getElementById('font-decrease');
  const btnReset = document.getElementById('font-reset');

  if (btnUp) {
    btnUp.addEventListener('click', () => setFontSize(getFontSize() + FONT_STEP));
  }
  if (btnDown) {
    btnDown.addEventListener('click', () => setFontSize(getFontSize() - FONT_STEP));
  }
  if (btnReset) {
    btnReset.addEventListener('click', () => setFontSize(FONT_DEFAULT));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initFontSize();
  initContactForm();
});

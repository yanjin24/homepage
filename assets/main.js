(function () {
  'use strict';

  var root = document.documentElement;
  var nav = document.getElementById('nav');
  var themeToggle = document.getElementById('themeToggle');
  var menuToggle = document.getElementById('menuToggle');
  var navLinks = document.getElementById('navLinks');
  var yearEl = document.getElementById('year');
  var THEME_KEY = 'site-theme';

  /* ---------- 主题 ---------- */
  function readStoredTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (e) {
      return null;
    }
  }

  function storeTheme(value) {
    try {
      localStorage.setItem(THEME_KEY, value);
    } catch (e) {
      /* 隐私模式下静默失败 */
    }
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeToggle) {
      themeToggle.setAttribute(
        'aria-label',
        theme === 'dark' ? '切换到浅色主题' : '切换到深色主题'
      );
    }
  }

  var stored = readStoredTheme();
  var prefersLight =
    window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  applyTheme(stored || (prefersLight ? 'light' : 'dark'));

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      storeTheme(next);
    });
  }

  /* ---------- 导航滚动状态 ---------- */
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      nav.classList.toggle('is-scrolled', window.scrollY > 12);
      updateActiveLink();
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- 移动端菜单 ---------- */
  function closeMenu() {
    nav.classList.remove('is-open');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  if (navLinks) {
    navLinks.addEventListener('click', function (e) {
      if (e.target instanceof HTMLAnchorElement) closeMenu();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  document.addEventListener('click', function (e) {
    if (!nav.classList.contains('is-open')) return;
    if (!nav.contains(e.target)) closeMenu();
  });

  /* ---------- 当前区块高亮 ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  var links = navLinks
    ? Array.prototype.slice.call(navLinks.querySelectorAll('a'))
    : [];

  function updateActiveLink() {
    if (!sections.length || !links.length) return;
    var marker = window.scrollY + window.innerHeight * 0.32;
    var currentId = sections[0].id;
    sections.forEach(function (section) {
      if (section.offsetTop <= marker) currentId = section.id;
    });
    links.forEach(function (link) {
      link.classList.toggle(
        'is-active',
        link.getAttribute('href') === '#' + currentId
      );
    });
  }

  /* ---------- 滚动进场动画 ---------- */
  var revealItems = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window && revealItems.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, i) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          el.style.transitionDelay = i * 80 + 'ms';
          el.classList.add('is-in');
          io.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    revealItems.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealItems.forEach(function (el) {
      el.classList.add('is-in');
    });
  }

  /* ---------- 年份 ---------- */
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  updateActiveLink();
})();

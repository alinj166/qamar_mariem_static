(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false');
    }));
  }

  // Reveal-on-scroll; gracefully show all content when IntersectionObserver is unavailable.
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    revealItems.forEach(el => observer.observe(el));
  } else revealItems.forEach(el => el.classList.add('visible'));

  // French / Arabic language switch.
  const langToggle = document.getElementById('langToggle');
  let currentLang = 'fr';
  function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.body.classList.toggle('rtl', lang === 'ar');
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-fr][data-ar]').forEach(el => {
      const value = el.dataset[lang];
      if (value !== undefined) el.innerHTML = value;
    });
    if (langToggle) langToggle.textContent = lang === 'fr' ? 'عربي' : 'FR';
  }
  if (langToggle) langToggle.addEventListener('click', () => setLanguage(currentLang === 'fr' ? 'ar' : 'fr'));

  // Keep FAQ plus indicators in sync with open/closed state.
  document.querySelectorAll('.faq-list details').forEach(detail => {
    detail.addEventListener('toggle', () => {
      const icon = detail.querySelector('summary span');
      if (icon) icon.textContent = detail.open ? '−' : '+';
    });
  });
})();

  // Update copyright year automatically.
  const year = document.getElementById('currentYear');
  if (year) year.textContent = String(new Date().getFullYear());

// Future Pub — comportements partagés

document.addEventListener('DOMContentLoaded', () => {
  // --- Menu (trois tirets) ---
  const burger = document.querySelector('.burger');
  const panel  = document.querySelector('.nav-panel');
  const scrim  = document.querySelector('.scrim');

  const closeNav = () => {
    burger.setAttribute('aria-expanded', 'false');
    panel.classList.remove('open');
    scrim.classList.remove('open');
  };
  const toggleNav = () => {
    const open = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!open));
    panel.classList.toggle('open', !open);
    scrim.classList.toggle('open', !open);
  };

  if (burger) {
    burger.addEventListener('click', toggleNav);
    scrim.addEventListener('click', closeNav);
    panel.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });
  }

  // --- Placeholders des images non encore fournies ---
  // Tant que le fichier réel (ex: images/ESC1.jpg) n'existe pas,
  // le cadre affiche le nom de fichier attendu.
  document.querySelectorAll('.frame img[data-gallery]').forEach(img => {
    img.addEventListener('error', () => {
      img.closest('.frame').classList.add('img-missing');
    }, { once: true });
  });
});

document.addEventListener('DOMContentLoaded', function () {

  /* ===== Lightbox photos : clique sur une image, navigue avec < / > sans sortir ===== */
  var images = Array.prototype.slice.call(document.querySelectorAll('[data-gallery]'));
  var lightbox = document.getElementById('lightbox');

  if (images.length && lightbox) {
    var lbImg = lightbox.querySelector('.lb-img');
    var lbCounter = lightbox.querySelector('.lb-counter');
    var closeBtn = lightbox.querySelector('.lb-close');
    var prevBtn = lightbox.querySelector('.lb-prev');
    var nextBtn = lightbox.querySelector('.lb-next');
    var current = 0;

    function show(index) {
      current = (index + images.length) % images.length;
      lbImg.src = images[current].getAttribute('src');
      lbImg.alt = images[current].getAttribute('alt') || '';
      lbCounter.textContent = (current + 1) + ' / ' + images.length;
    }

    function openLightbox(index) {
      show(index);
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    images.forEach(function (img, i) {
      img.addEventListener('click', function () { openLightbox(i); });
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', function (e) { e.stopPropagation(); show(current - 1); });
    nextBtn.addEventListener('click', function (e) { e.stopPropagation(); show(current + 1); });

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
  }

  /* ===== Placeholder pour la section vidéo tant qu'aucun lien n'est renseigné ===== */
  document.querySelectorAll('.video-frame').forEach(function (frame) {
    var iframe = frame.querySelector('iframe');
    if (iframe && !iframe.getAttribute('src')) {
      frame.classList.add('is-empty');
    }
  });

});

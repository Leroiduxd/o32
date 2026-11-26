(() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches) return;

  const animations = new WeakMap();
  function appear(element, delay = 0) {
    animations.get(element)?.cancel();
    animations.set(element, element.animate([
      { opacity: 0, transform: 'translateY(24px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ], {
      duration: 650,
      delay,
      easing: 'cubic-bezier(.2,.75,.25,1)',
      fill: 'backwards'
    }));
  }

  const heroElements = document.querySelectorAll('.hero-copy > *, .hero-photo');
  heroElements.forEach((element, index) => appear(element, 1050 + index * 85));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      appear(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08 });

  document.querySelectorAll(
    '.pizza-deal, .section-heading, .universes-grid > a, .offer, .menu-group, .info-section'
  ).forEach(element => observer.observe(element));

  function animateMenu() {
    document.querySelectorAll('[data-group]:not([hidden])').forEach((group, index) => {
      appear(group, Math.min(index, 4) * 45);
    });
  }
  document.querySelectorAll('[data-category], [data-shortcut], #reset')
    .forEach(control => control.addEventListener('click', animateMenu));

  let searchTimer;
  document.querySelector('#search').addEventListener('input', () => {
    window.clearTimeout(searchTimer);
    searchTimer = window.setTimeout(animateMenu, 150);
  });

  const progress = document.createElement('div');
  progress.className = 'reading-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.append(progress);

  let framePending = false;
  function updateScroll() {
    const distance = document.documentElement.scrollHeight - window.innerHeight;
    const fraction = distance > 0 ? window.scrollY / distance : 0;
    progress.style.transform = `scaleX(${Math.min(1, Math.max(0, fraction))})`;
    document.querySelector('header').classList.toggle('is-scrolled', window.scrollY > 24);
    framePending = false;
  }
  function requestScrollUpdate() {
    if (framePending) return;
    framePending = true;
    window.requestAnimationFrame(updateScroll);
  }
  window.addEventListener('scroll', requestScrollUpdate, { passive: true });
  window.addEventListener('resize', requestScrollUpdate);
  new ResizeObserver(requestScrollUpdate).observe(document.body);
  updateScroll();

  preference.addEventListener('change', event => {
    if (!event.matches) return;
    observer.disconnect();
    document.getAnimations().forEach(animation => animation.cancel());
    progress.remove();
  });
})();

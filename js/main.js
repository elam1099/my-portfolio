/* ============================================================
   Emily Lam Portfolio — Interactions
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Custom Cursor ── */
  const cursor     = document.querySelector('.cursor');
  const cursorRing = document.querySelector('.cursor-ring');

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
    spawnSparkle(mouseX, mouseY);
  });

  // Smooth ring follow
  (function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  })();

  // Cursor grow on interactive elements
  const interactives = document.querySelectorAll('a, button, .project-card, .skill-item');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform     = 'translate(-50%, -50%) scale(2.5)';
      cursorRing.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursorRing.style.opacity   = '0.2';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform     = 'translate(-50%, -50%) scale(1)';
      cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorRing.style.opacity   = '0.5';
    });
  });

  /* ── Sparkle Trail ── */
  let sparkleTimeout;
  let lastSparkle = 0;

  function spawnSparkle(x, y) {
    const now = Date.now();
    if (now - lastSparkle < 80) return; // throttle
    lastSparkle = now;

    const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const size = 8 + Math.random() * 10;
    el.setAttribute('viewBox', '0 0 24 24');
    el.setAttribute('width', size);
    el.setAttribute('height', size);
    el.classList.add('sparkle-particle');
    el.style.left = x + 'px';
    el.style.top  = y + 'px';
    el.style.color = ['#EDB5C5', '#BBC5E8', '#F5C4A3'][Math.floor(Math.random() * 3)];
    el.innerHTML = `<path fill="currentColor" d="M12,0 C12,1 12.4,10.5 19,12 C12.4,13.5 12,23 12,24 C12,23 11.6,13.5 5,12 C11.6,10.5 12,1 12,0Z"/>`;

    // Random slight offset
    el.style.marginLeft = (Math.random() * 20 - 10) + 'px';
    el.style.marginTop  = (Math.random() * 20 - 10) + 'px';

    document.body.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }

  /* ── Hero Name Letter Animation ── */
  const heroName = document.querySelector('.hero-name');
  if (heroName) {
    const text = heroName.textContent.trim();
    heroName.innerHTML = text.split('').map((char, i) =>
      char === ' '
        ? '<span style="display:inline-block;width:0.3em"> </span>'
        : `<span class="letter" style="animation-delay:${0.3 + i * 0.035}s">${char}</span>`
    ).join('');
  }

  /* ── Hero Label & Tagline timed entrance ── */
  const heroLabel    = document.querySelector('.hero-label');
  const heroTagline  = document.querySelector('.hero-tagline');
  const heroCurrent  = document.querySelector('.hero-currently');

  if (heroLabel) {
    heroLabel.style.cssText += 'opacity:0;animation:label-slide 0.5s ease 0.1s both;';
  }
  if (heroTagline) {
    heroTagline.style.cssText += 'opacity:0;animation:tagline-rise 0.6s ease 1.1s both;';
  }
  if (heroCurrent) {
    heroCurrent.style.cssText += 'opacity:0;animation:tagline-rise 0.6s ease 1.3s both;';
  }

  /* ── Sparkles: entry → hand off to twinkle ── */
  const heroSparkles = document.querySelector('.hero-sparkles');
  if (heroSparkles) {
    setTimeout(() => {
      heroSparkles.classList.add('twinkle-active');
    }, 1600);
  }

  /* ── Nav Scroll Behaviour + bg-canvas fade ── */
  const nav      = document.querySelector('nav');
  const bgCanvas = document.querySelector('#hero .bg-canvas');
  const heroEl   = document.querySelector('#hero');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);

    // Fade out gradient as user scrolls past hero
    if (bgCanvas && heroEl) {
      const heroH  = heroEl.offsetHeight;
      const ratio  = window.scrollY / (heroH * 0.65);
      bgCanvas.style.opacity = Math.max(0, 1 - ratio);
    }
  }, { passive: true });

  /* ── Mobile Nav Toggle ── */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks  = document.querySelector('.nav-links');
  const navEl     = document.querySelector('nav');

  const closeMenu = () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('is-open');
    navEl.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const opening = !navLinks.classList.contains('open');
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('is-open');
      navEl.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', opening);
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  }

  /* ── Scroll Reveal (IntersectionObserver) ── */
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => revealObserver.observe(el));

  /* ── Project Card — link entire card ── */
  document.querySelectorAll('.project-card[data-href]').forEach(card => {
    card.addEventListener('click', () => {
      window.location.href = card.dataset.href;
    });
  });

});

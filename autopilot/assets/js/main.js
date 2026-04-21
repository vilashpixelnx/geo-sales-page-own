/* ============================================================
   main.js — GSAP + Lenis Animations & Interactions
   GEO Optimizer AutoPilot (OTO1)
   ============================================================ */

'use strict';

/* utils.js is loaded before this script — qs, qsa, on, prefersReducedMotion are global */

/* ── 1. GSAP Setup ─────────────────────────────────────────── */
gsap.registerPlugin(ScrollTrigger);

// Sync GSAP ticker with native scroll
gsap.ticker.lagSmoothing(0);

/* ── 2. Reduced Motion Gate ────────────────────────────────── */
// Skip all GSAP animations for users who prefer reduced motion.
// Elements have no CSS opacity:0 — they are naturally visible without animation.
if (!prefersReducedMotion()) {
  initAnimations();
}

/* ── 3. Animations ─────────────────────────────────────────── */
function initAnimations() {

  /* 3.1 — Hero entrance (timeline, plays on load) */
  const heroInner = qs('.hero__inner');
  if (heroInner) {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    tl.from('.hero__badge',    { opacity: 0, y: -16, duration: 0.45 })
      .from('.hero__heading',  { opacity: 0, y: 32,  duration: 0.65 }, '-=0.2')
      .from('.hero__sub',      { opacity: 0, y: 22,  duration: 0.5  }, '-=0.25')
      .from('.hero__ctas',     { opacity: 0, y: 18,  duration: 0.45 }, '-=0.2')
      .from('.hero__proof',    { opacity: 0, y: 14,  duration: 0.4  }, '-=0.15')
      .from('.hero__trust',    { opacity: 0, y: 12,  duration: 0.35 }, '-=0.15')
      .from('.hero .btn-skip', { opacity: 0, y: 8,   duration: 0.3  }, '-=0.1');
  }

  /* 3.2 — Bridge box */
  gsap.from('.bridge__box', {
    scrollTrigger: { trigger: '.bridge__box', start: 'top 87%', toggleActions: 'play none none none' },
    opacity: 0,
    x: -32,
    duration: 0.7,
    ease: 'power2.out'
  });

  /* 3.3 — Section headers (badge + title + subtext) */
  qsa('.section-header').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      opacity: 0,
      y: 28,
      duration: 0.65,
      ease: 'power2.out'
    });
  });

  /* 3.4 — Autopilot product badge */
  gsap.from('.autopilot-product', {
    scrollTrigger: { trigger: '.autopilot-product', start: 'top 88%', toggleActions: 'play none none none' },
    opacity: 0,
    y: 18,
    duration: 0.5,
    ease: 'power2.out'
  });

  /* 3.5 — Problem cards — stagger */
  const problemCards = qsa('.problem-card');
  if (problemCards.length) {
    gsap.from(problemCards, {
      scrollTrigger: { trigger: '#problem-grid', start: 'top 85%', toggleActions: 'play none none none' },
      opacity: 0,
      y: 36,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out'
    });
  }

  /* 3.6 — Pain pull-quote */
  gsap.from('.pain-pull', {
    scrollTrigger: { trigger: '.pain-pull', start: 'top 88%', toggleActions: 'play none none none' },
    opacity: 0,
    y: 20,
    duration: 0.6,
    ease: 'power2.out'
  });

  /* 3.7 — Feature cards — stagger */
  const featureCards = qsa('.feature-card');
  if (featureCards.length) {
    gsap.from(featureCards, {
      scrollTrigger: { trigger: '#feature-grid', start: 'top 85%', toggleActions: 'play none none none' },
      opacity: 0,
      y: 40,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out'
    });
  }

  /* 3.8 — Before / After cards — slide from sides */
  const baCards = qsa('.ba-card');
  if (baCards.length >= 2) {
    gsap.from(baCards[0], {
      scrollTrigger: { trigger: '.ba-grid', start: 'top 85%', toggleActions: 'play none none none' },
      opacity: 0, x: -30, duration: 0.65, ease: 'power2.out'
    });
    gsap.from(baCards[1], {
      scrollTrigger: { trigger: '.ba-grid', start: 'top 85%', toggleActions: 'play none none none' },
      opacity: 0, x: 30, duration: 0.65, ease: 'power2.out'
    });
  }

  /* 3.9 — Testimonial card */
  gsap.from('.testimonial-card', {
    scrollTrigger: { trigger: '.testimonial-card', start: 'top 88%', toggleActions: 'play none none none' },
    opacity: 0,
    y: 30,
    duration: 0.7,
    ease: 'power2.out'
  });

  /* 3.10 — Checklist items — stagger */
  const checkItems = qsa('.checklist__item');
  if (checkItems.length) {
    gsap.from(checkItems, {
      scrollTrigger: { trigger: '#checklist', start: 'top 85%', toggleActions: 'play none none none' },
      opacity: 0,
      x: -18,
      duration: 0.4,
      stagger: 0.08,
      ease: 'power2.out'
    });
  }

  /* 3.11 — CTA boxes */
  qsa('.cta-box').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
      opacity: 0,
      y: 36,
      scale: 0.98,
      duration: 0.8,
      ease: 'power3.out'
    });
  });

  /* 3.12 — Guarantee box */
  gsap.from('.guarantee-box', {
    scrollTrigger: { trigger: '.guarantee-box', start: 'top 86%', toggleActions: 'play none none none' },
    opacity: 0,
    y: 28,
    duration: 0.7,
    ease: 'power2.out'
  });

  /* 3.13 — Countdown */
  gsap.from('.countdown', {
    scrollTrigger: { trigger: '.countdown', start: 'top 88%', toggleActions: 'play none none none' },
    opacity: 0,
    y: 20,
    duration: 0.55,
    ease: 'power2.out'
  });

  /* 3.14 — FAQ items — stagger */
  const faqItems = qsa('.faq-item');
  if (faqItems.length) {
    gsap.from(faqItems, {
      scrollTrigger: { trigger: '#faq-grid', start: 'top 85%', toggleActions: 'play none none none' },
      opacity: 0,
      y: 24,
      duration: 0.5,
      stagger: 0.07,
      ease: 'power2.out'
    });
  }

} // end initAnimations()

/* ── 4. CTA Button — GSAP hover ────────────────────────────── */
qsa('.btn-primary').forEach(btn => {
  on(btn, 'mouseenter', () => {
    gsap.to(btn, { y: -3, boxShadow: '0 14px 40px rgba(40,135,255,0.55)', duration: 0.2, ease: 'power2.out' });
  });
  on(btn, 'mouseleave', () => {
    gsap.to(btn, { y: 0, boxShadow: '0px 4px 20px 0px rgba(40,135,255,0.40)', duration: 0.2, ease: 'power2.out' });
  });
});

/* ── 5. Skip / Decline Buttons ─────────────────────────────── */
const skipBtn      = qs('#skip-btn');
const skipBtnFinal = qs('#skip-btn-final');
// Each page sets window.SKIP_URL before this script loads; falls back to home
const SKIP_URL = window.SKIP_URL || 'https://geo-optimizer.com/';

const handleSkip = () => { window.location.href = SKIP_URL; };

if (skipBtn)      on(skipBtn,      'click', handleSkip);
if (skipBtnFinal) on(skipBtnFinal, 'click', handleSkip);

/* ── 6. FAQ Accordion ──────────────────────────────────────── */
qsa('.faq-item__toggle').forEach(toggle => {
  on(toggle, 'click', () => {
    const item     = toggle.closest('.faq-item');
    const isOpen   = item.classList.contains('is-open');
    const expanded = !isOpen;

    // Close all other open items
    qsa('.faq-item.is-open').forEach(openItem => {
      if (openItem !== item) {
        openItem.classList.remove('is-open');
        openItem.querySelector('.faq-item__toggle').setAttribute('aria-expanded', 'false');
      }
    });

    // Toggle this item
    item.classList.toggle('is-open', expanded);
    toggle.setAttribute('aria-expanded', String(expanded));
  });
});

/* ── 7. Countdown Timer ────────────────────────────────────── */
(function initCountdown() {
  const hoursEl   = qs('#cd-hours');
  const minutesEl = qs('#cd-minutes');
  const secondsEl = qs('#cd-seconds');

  if (!hoursEl || !minutesEl || !secondsEl) return;

  // 15-minute countdown
  let totalSeconds = 15 * 60;

  const pad = (n) => String(n).padStart(2, '0');

  const tick = () => {
    if (totalSeconds <= 0) {
      hoursEl.textContent   = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }
    totalSeconds--;
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    hoursEl.textContent   = pad(h);
    minutesEl.textContent = pad(m);
    secondsEl.textContent = pad(s);
  };

  tick(); // run immediately to avoid 1s blank
  setInterval(tick, 1000);
})();

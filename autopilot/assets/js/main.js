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

initHeroBackground();

/* ── 2. Reduced Motion Gate ────────────────────────────────── */
// Skip all GSAP animations for users who prefer reduced motion.
// Elements have no CSS opacity:0 — they are naturally visible without animation.
if (!prefersReducedMotion()) {
  initAnimations();
}

/* ── 3. Animations ─────────────────────────────────────────── */
function initHeroBackground() {
  const heroSection = qs('.hero');
  const canvas = qs('#heroNoiseCanvas');
  const stripesWrap = qs('#heroStripes');
  const blobBlue = qs('#heroBlobBlue');
  const blobPurple = qs('#heroBlobPurple');

  if (!heroSection || !canvas || !stripesWrap || !blobBlue || !blobPurple) return;

  const ctx = canvas.getContext('2d');
  const reduced = prefersReducedMotion();
  const leftEls = [];
  const rightEls = [];

  const drawNoise = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, window.innerWidth || 1440);
    const height = Math.max(1, window.innerHeight || 820);

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const img = ctx.createImageData(width, height);
    const d = img.data;
    const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
    const lerp = (a, b, t) => a + (b - a) * t;
    const hash = (x, y) => {
      const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
      return n - Math.floor(n);
    };
    const vNoise = (x, y) => {
      const ix = Math.floor(x);
      const iy = Math.floor(y);
      const fx = x - ix;
      const fy = y - iy;
      return lerp(
        lerp(hash(ix, iy), hash(ix + 1, iy), fade(fx)),
        lerp(hash(ix, iy + 1), hash(ix + 1, iy + 1), fade(fx)),
        fade(fy)
      );
    };
    const fractal = (x, y) => {
      let v = 0;
      let amp = 1;
      let freq = 3.5;
      let sum = 0;
      for (let o = 0; o < 4; o += 1) {
        v += vNoise(x * freq, y * freq) * amp;
        sum += amp;
        amp *= 0.5;
        freq *= 2;
      }
      return v / sum;
    };

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const v = fractal(x / width, y / height);
        const i = (y * width + x) * 4;
        d[i] = 196;
        d[i + 1] = 227;
        d[i + 2] = 255;
        d[i + 3] = Math.round(v * 255 * 0.55);
      }
    }

    ctx.putImageData(img, 0, 0);
  };

  const buildStripes = () => {
    stripesWrap.innerHTML = '';
    leftEls.length = 0;
    rightEls.length = 0;

    const COUNT = 12;
    const MAX_W = 6.5;
    const MIN_W = 1.83;
    let leftPos = 0;
    let rightPos = 0;

    for (let i = 0; i < COUNT; i += 1) {
      const t = i / (COUNT - 1);
      const w = MAX_W - (MAX_W - MIN_W) * t;
      const scale = 1 - 0.82 * t;
      const a1 = (0.1 * scale).toFixed(3);
      const a2 = (0.4 * scale).toFixed(3);
      const bg = `linear-gradient(270deg,rgba(255,255,255,${a1}) 0%,rgba(255,255,255,${a2}) 100%)`;

      const leftStripe = document.createElement('div');
      leftStripe.className = 'hero__bgfx-stripe';
      leftStripe.style.cssText = `left:${leftPos.toFixed(3)}%;width:${w.toFixed(3)}%;background:${bg};`;
      stripesWrap.appendChild(leftStripe);
      leftEls.push(leftStripe);
      leftPos += w;

      const rightStripe = document.createElement('div');
      rightStripe.className = 'hero__bgfx-stripe';
      rightStripe.style.cssText = `right:${rightPos.toFixed(3)}%;width:${w.toFixed(3)}%;background:${bg};`;
      stripesWrap.appendChild(rightStripe);
      rightEls.push(rightStripe);
      rightPos += w;
    }
  };

  drawNoise();
  buildStripes();
  window.addEventListener('resize', drawNoise, { passive: true });

  if (reduced) {
    gsap.set([blobBlue, blobPurple], { opacity: 1 });
    gsap.set([...leftEls, ...rightEls], { opacity: 1 });
    return;
  }

  gsap.to([blobBlue, blobPurple], {
    opacity: 1,
    duration: 1.6,
    stagger: 0.15,
    ease: 'power2.out'
  });

  gsap.from('.hero__bgfx-fade', { opacity: 0, duration: 1.0, delay: 0.3 });

  gsap.to(blobBlue, {
    x: 32,
    y: 22,
    scale: 1.06,
    duration: 6,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: 1.8
  });

  gsap.to(blobPurple, {
    x: -28,
    y: 26,
    scale: 1.07,
    duration: 7,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: 2.1
  });

  const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.2, delay: 1.4 });
  tl.to(leftEls, { opacity: 1, duration: 0.5, stagger: 0.12, ease: 'power2.out' })
    .to(rightEls, { opacity: 1, duration: 0.5, stagger: 0.12, ease: 'power2.out' }, '<')
    .to({}, { duration: 0.2 })
    .to(leftEls, { opacity: 0, duration: 0.5, stagger: 0.12, ease: 'power2.in' })
    .to(rightEls, { opacity: 0, duration: 0.5, stagger: 0.12, ease: 'power2.in' }, '<');
}

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

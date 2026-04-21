/* ============================================================
   utils.js — Reusable Helper Functions
   GEO Optimizer AutoPilot (OTO1)
   ============================================================ */

'use strict';

/**
 * Query a single DOM element. Returns null if not found.
 * @param {string} selector
 * @param {Element} [context=document]
 * @returns {Element|null}
 */
const qs = (selector, context = document) => context.querySelector(selector);

/**
 * Query all matching DOM elements as an Array.
 * @param {string} selector
 * @param {Element} [context=document]
 * @returns {Element[]}
 */
const qsa = (selector, context = document) =>
  Array.from(context.querySelectorAll(selector));

/**
 * Add one or more event listeners to a single element.
 * @param {Element} el
 * @param {string|string[]} events
 * @param {Function} handler
 * @param {object} [options]
 */
const on = (el, events, handler, options = {}) => {
  if (!el) return;
  const evts = Array.isArray(events) ? events : [events];
  evts.forEach(evt => el.addEventListener(evt, handler, options));
};

/**
 * Check whether the user prefers reduced motion.
 * @returns {boolean}
 */
const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Debounce a function call.
 * @param {Function} fn
 * @param {number} delay - ms
 * @returns {Function}
 */
const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

/**
 * Clamp a number between min and max.
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

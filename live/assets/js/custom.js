const page = $("body").data("page");
$(".geo_" + page).addClass("active");
let process_running = 0;

window.scrollById = function (id) {
  const target = document.getElementById(id);
  if (!target) {
    return;
  }

  const header = document.querySelector(".geo-header-wrapper");
  const headerOffset = header ? header.offsetHeight : 0;
  const targetTop = target.getBoundingClientRect().top + window.pageYOffset - headerOffset - 10;

  window.scrollTo({
    top: targetTop,
    behavior: "smooth",
  });
};

function applyScrollAnimations() {
  return;
}

function initClonevoiceMetrics() {
  const section = document.querySelector(".geo_clonevoice_section");

  if (!section) {
    return;
  }

  const circumference = 2 * Math.PI * 35;

  const animateCount = (element, target, suffix, duration) => {
    const startTime = performance.now();

    const updateValue = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);

      element.textContent = `${value}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(updateValue);
      }
    };

    requestAnimationFrame(updateValue);
  };

  const buildMetricRows = (box) => {
    const isAfter = box.classList.contains("geo_after_box");

    box.querySelectorAll(".geo_before_list ul li").forEach((item, index) => {
      if (item.querySelector(".metric-bar-wrap")) {
        return;
      }

      const badge = item.querySelector("span");
      if (!badge) {
        return;
      }

      const numericValue = parseInt(badge.textContent.replace(/[^\d]/g, ""), 10);
      const targetValue = Number.isNaN(numericValue) ? 0 : numericValue;

      item.dataset.metricTarget = String(targetValue);
      item.dataset.metricAnimated = "false";
      badge.dataset.metricTarget = String(targetValue);
      badge.dataset.metricSuffix = "%";
      badge.dataset.metricOriginal = badge.textContent.trim();
      badge.textContent = "0%";

      const barWrap = document.createElement("div");
      barWrap.className = "metric-bar-wrap";

      const bar = document.createElement("div");
      bar.className = `metric-bar ${isAfter ? "good-bar" : "bad-bar"}`;
      bar.dataset.width = String(targetValue);

      bar.style.width = "0%";

      barWrap.appendChild(bar);
      item.appendChild(barWrap);

      if (isAfter) {
        item.style.setProperty("--metric-delay", `${index * 280}ms`);
      }
    });
  };

  const buildScoreRing = (box) => {
    const scoreHeading = box.querySelector(".geo_before_score h2");

    if (!scoreHeading || scoreHeading.querySelector(".score-ring")) {
      return;
    }

    const icon = scoreHeading.querySelector("img");
    const rawText = scoreHeading.textContent.replace(/[^\d]/g, "");
    const targetScore = parseInt(rawText, 10);

    if (Number.isNaN(targetScore)) {
      return;
    }

    const isAfter = box.classList.contains("geo_after_box");
    const scoreWrapper = document.createElement("span");
    scoreWrapper.className = `score-ring ${isAfter ? "good" : "bad"}`;

    scoreWrapper.innerHTML = `
      <svg width="80" height="80" viewBox="0 0 80 80" aria-hidden="true">
        <defs>
          <linearGradient id="${isAfter ? "goodGrad" : "badGrad"}-clonevoice-${targetScore}" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="${isAfter ? "#28c76f" : "#ff4444"}"></stop>
            <stop offset="100%" stop-color="${isAfter ? "#6be09e" : "#ff7777"}"></stop>
          </linearGradient>
        </defs>
        <circle class="ring-bg" cx="40" cy="40" r="35"></circle>
        <circle class="ring-fill ${isAfter ? "good-ring" : "bad-ring"}" cx="40" cy="40" r="35" data-score="${targetScore}" stroke="url(#${isAfter ? "goodGrad" : "badGrad"}-clonevoice-${targetScore})"></circle>
      </svg>
      <span class="score-num" data-target="${targetScore}">0</span>
    `;

    scoreHeading.textContent = "";

    if (icon) {
      scoreHeading.appendChild(icon);
    }

    scoreHeading.appendChild(scoreWrapper);
    box.dataset.scoreAnimated = "false";
  };

  const animateBoxMetrics = (box) => {
    if (box.dataset.metricsAnimated === "true") {
      return;
    }

    box.dataset.metricsAnimated = "true";

    box.querySelectorAll(".geo_before_list ul li").forEach((item, index) => {
      const badge = item.querySelector("span");
      const bar = item.querySelector(".metric-bar");

      if (!badge || !bar) {
        return;
      }

      const target = parseInt(badge.dataset.metricTarget || "0", 10);

      window.setTimeout(() => {
        bar.classList.add("is-animating");
        bar.style.width = `${target}%`;
        animateCount(badge, target, badge.dataset.metricSuffix || "%", 2600);
      }, index * 280);
    });
  };

  const animateScoreRing = (box) => {
    if (box.dataset.scoreAnimated === "true") {
      return;
    }

    const ring = box.querySelector(".ring-fill");
    const scoreNumber = box.querySelector(".score-num");

    if (!ring || !scoreNumber) {
      return;
    }

    box.dataset.scoreAnimated = "true";

    const score = parseInt(ring.dataset.score || "0", 10);
    const offset = circumference - (circumference * score) / 100;

    window.setTimeout(() => {
      ring.style.strokeDasharray = String(circumference);
      ring.style.strokeDashoffset = String(offset);
      animateCount(scoreNumber, score, "", 1320);
    }, 300);
  };

  section.querySelectorAll(".geo_before_box").forEach((box) => {
    buildMetricRows(box);
    buildScoreRing(box);
  });

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    section.querySelectorAll(".geo_before_box").forEach((box) => {
      box.querySelectorAll(".metric-bar").forEach((bar) => {
        bar.style.width = `${bar.dataset.width || 0}%`;
      });

      box.querySelectorAll(".metric-pct, .geo_before_list ul li span").forEach((badge) => {
        if (badge.dataset.metricOriginal) {
          badge.textContent = badge.dataset.metricOriginal;
        }
      });

      const ring = box.querySelector(".ring-fill");
      const scoreNumber = box.querySelector(".score-num");

      if (ring && scoreNumber) {
        const score = parseInt(ring.dataset.score || "0", 10);
        ring.style.strokeDasharray = String(circumference);
        ring.style.strokeDashoffset = String(circumference - (circumference * score) / 100);
        scoreNumber.textContent = String(score);
      }
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        animateBoxMetrics(entry.target);
        animateScoreRing(entry.target);
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.3,
    }
  );

  section.querySelectorAll(".geo_before_box").forEach((box) => {
    observer.observe(box);
  });
}

(function ($) {
  "use strict";
  var Webify = {
    initialised: false,
    version: 1.0,
    mobile: false,
    init: function () {
      if (!this.initialised) {
        this.initialised = true;
      } else {
        return;
      }
      // this.loader();
      this.sticky_header();
      this.float_bar();
      this.loader();
      this.profile_toggle();
      initClonevoiceMetrics();
    },
    /*-----------------------------------------------------
			Loader
		-----------------------------------------------------*/

    // profile toggle js
    profile_toggle: function () {
      $(".ma_toggle_btn").on("click", function () {
        $("body").toggleClass("menu-open");
      });
    },
    // profile toggle js

    // sticky header
    sticky_header: function () {
      $(window).scroll(function () {
        var wh = window.innerWidth;
        {
          var h = window.innerHeight;
          var window_top = $(window).scrollTop() + 1;
          if (window_top > 100) {
            $(".geo-header-wrapper").addClass("geo-header-fixed");
          } else {
            $(".geo-header-wrapper").removeClass("geo-header-fixed");
          }
        }
      });
    },
    // sticky header

    // Float bar
    float_bar: function () {
      const body = document.body;
      const setBodySpacing = (enabled) => {
        if (!body) {
          return;
        }

        if (!enabled) {
          body.style.paddingBottom = "";
          body.style.marginBottom = "";
          return;
        }

        const fb = document.getElementById("floatBar");
        const spacing = fb ? fb.offsetHeight + 16 : 16;
        body.style.paddingBottom = `${spacing}px`;
        body.style.marginBottom = "0";
      };

      window.addEventListener(
        "scroll",
        () => {
          const fb = document.getElementById("floatBar");
          if (fb) {
            const shouldShow = window.scrollY > 700;
            fb.classList.toggle("visible", shouldShow);
            setBodySpacing(shouldShow);
          }
        },
        { passive: true }
      );

      const fb = document.getElementById("floatBar");
      setBodySpacing(fb ? fb.classList.contains("visible") : false);
    },
    // Float bar

    loader: function () {
      jQuery(window).on("load", function () {
        $(".loader").fadeOut();
        $(".spinner").delay(500).fadeOut("slow");
      });
    },
  };
  Webify.init();
})(jQuery);

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
  const setAnimation = (element, animation, delay) => {
    if (!element || element.hasAttribute("data-aos")) {
      return;
    }

    element.setAttribute("data-aos", animation);

    if (delay) {
      element.setAttribute("data-aos-delay", String(delay));
    }
  };

  const setSequentialAnimation = (selector, animations, baseDelay, stepDelay) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      const animation = Array.isArray(animations)
        ? animations[index % animations.length]
        : animations;
      setAnimation(element, animation, baseDelay + index * stepDelay);
    });
  };

  const setSectionHeading = (sectionSelector, headingDelay) => {
    document.querySelectorAll(sectionSelector).forEach((section) => {
      setAnimation(section.querySelector(".geo_banner_txt_wrapper"), "fade-down", 80);
      setAnimation(
        section.querySelector(".geo_main_heading h1, .geo_main_heading h5, .geo_main_heading h6"),
        "fade-up",
        headingDelay
      );
      setAnimation(
        section.querySelector(".geo_main_heading p, .geo_main_heading .geo_sub_heading_text"),
        "fade-up",
        headingDelay + 80
      );
    });
  };

  setAnimation(document.querySelector(".geo_banner_section .geo_banner_txt_wrapper"), "fade-down", 80);
  setAnimation(document.querySelector(".ma_video_wrapper"), "zoom-in", 220);
  setAnimation(document.querySelector(".geo_banner_text h2"), "fade-up", 320);
  setSequentialAnimation(".ma_user_list li", "fade-up", 340, 60);
  setSequentialAnimation(".geo_checklist li", "fade-left", 360, 70);

  setAnimation(document.querySelector(".geo_powerful_tool h3"), "fade-up", 120);
  setAnimation(document.querySelector(".geo_powerful_tool .home_template_mini"), "zoom-in", 220);

  setSectionHeading(".geo_awesomefeatures_section", 160);
  setSequentialAnimation(".geo_awesomefeatures_section .geo_work_contentmain", "fade-up", 120, 90);

  setSectionHeading(".geo_swapback_section:not(.geo_exists_section):not(.geo_step_section)", 160);
  setSequentialAnimation(".geo_swapback_section .geo_tx_wrapper", ["fade-right", "fade-up", "fade-left"], 140, 100);

  setSectionHeading(".geo_howwork_section:not(.geo_howtwo_section)", 160);
  setSequentialAnimation(".geo_howwork_section:not(.geo_howtwo_section) .col-lg-6:first-of-type .geo_problem_wrapper", "fade-right", 120, 70);
  setSequentialAnimation(".geo_howwork_section:not(.geo_howtwo_section) .col-lg-6:nth-of-type(2) .geo_problem_wrapper", "fade-left", 120, 70);
  setAnimation(document.querySelector(".geo_machines_heading .geo_main_heading"), "fade-up", 180);

  setSectionHeading(".geo_clonevoice_section", 160);
  setAnimation(document.querySelector(".geo_clonevoice_section .geo_before_box"), "fade-right", 160);
  setAnimation(document.querySelector(".geo_clonevoice_section .geo_before_after_click"), "zoom-in", 260);
  setAnimation(document.querySelector(".geo_clonevoice_section .geo_after_box"), "fade-left", 220);

  setSectionHeading(".geo_exists_section", 160);
  setSequentialAnimation(".geo_exists_section", ["fade-right", "fade-up", "fade-left"], 140, 100);

  setSectionHeading(".geo_step_section", 160);
  setAnimation(document.querySelector(".geo_step_section .geo_after_before"), "zoom-in", 200);
  setSequentialAnimation(".geo_step_section .geo_step_card", "fade-up", 160, 80);
  setAnimation(document.querySelector(".geo_step_section .geo_btn_with_price"), "fade-up", 240);

  document.querySelectorAll(".geo_generateimage_section").forEach((section, index) => {
    setAnimation(section.querySelector(".geo_banner_txt_wrapper"), "fade-down", 80);
    setAnimation(section.querySelector(".geo_main_heading h1"), "fade-up", 160);
    setAnimation(section.querySelector(".geo_main_heading p"), "fade-up", 240);

    if (index === 0) {
      setAnimation(section.querySelector(".geo_solution_wrapper"), "zoom-in", 180);
      setSequentialAnimation(".geo_solution_grid .geo_solution_flexbox", ["fade-right", "fade-up", "fade-left"], 140, 90);
    } else {
      setAnimation(section.querySelector(".geo_comparison_table"), "zoom-in", 180);
      setAnimation(section.querySelector(".geo_btn_with_price"), "fade-up", 240);
    }
  });

  setSectionHeading(".geo_howtwo_section", 160);
  setSequentialAnimation(".geo_howtwo_section .col-lg-6:first-of-type .geo_problem_wrapper", "fade-right", 120, 70);
  setSequentialAnimation(".geo_howtwo_section .col-lg-6:nth-of-type(2) .geo_problem_wrapper", "fade-left", 120, 70);
  setAnimation(document.querySelector(".geo_visibility_wrapper"), "zoom-in", 220);
  setSequentialAnimation(".geo_chatgpt_item", "fade-up", 260, 70);

  setSectionHeading(".geo_tab_wrapper", 160);
  setSequentialAnimation(".geo_tab_wrapper .geo_work_contentmain", "fade-up", 140, 80);

  document.querySelectorAll(".geo_chance_section").forEach((section) => {
    setAnimation(section.querySelector(".geo_main_heading"), "fade-up", 140);
    setAnimation(section.querySelector(".geo_paymnt_box"), "zoom-in", 220);
  });

  setSectionHeading(".geo_testimonial_section", 160);
  setAnimation(document.querySelector(".geo_slider_testimonials"), "zoom-in", 220);

  setSectionHeading(".geo_results_wrapper", 160);
  setSequentialAnimation(".geo_results_wrapper .geo_wordPress_flex", ["fade-right", "fade-left"], 160, 120);
  setAnimation(document.querySelector(".geo_results_wrapper .geo_btn_with_price"), "fade-up", 260);

  setSectionHeading(".geo_guarantee_wrapper", 160);
  setAnimation(document.querySelector(".geo_guarntee_box"), "zoom-in", 220);
  setSequentialAnimation(".geo_guarntee_bulelts > *", "fade-up", 260, 80);

  setSectionHeading(".geo_price_wrapper", 160);
  setSequentialAnimation(".geo_price_wrapper .geo_pricing_box", ["fade-right", "fade-left"], 180, 120);
  setAnimation(document.querySelector(".geo_price_wrapper .geo_banner_text"), "fade-up", 260);

  setSectionHeading(".geo_timer_wrapper", 160);
  setAnimation(document.querySelector(".geo_timer"), "zoom-in", 220);
  setAnimation(document.querySelector(".geo_timer_wrapper .geo_paymnt_box"), "fade-up", 280);

  setSectionHeading(".geo_faq_section", 160);
  setAnimation(document.querySelector(".geo_faq_section .col-lg-6.col-md-12:first-of-type"), "fade-right", 180);
  setAnimation(document.querySelector(".geo_faq_section .col-lg-6.col-md-12:last-of-type"), "fade-left", 220);
  setSequentialAnimation(".geo_faq_section .accordion-item", "fade-up", 220, 60);

  setAnimation(document.querySelector(".geo_footer_heading"), "fade-up", 160);
  setAnimation(document.querySelector(".geo_footer_info"), "fade-up", 240);

  const animatedElements = document.querySelectorAll("[data-aos]");

  if (!animatedElements.length) {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    animatedElements.forEach((element) => {
      element.classList.add("aos-animate");
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("aos-animate");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  animatedElements.forEach((element) => {
    const delay = element.getAttribute("data-aos-delay");

    if (delay) {
      element.style.transitionDelay = `${delay}ms`;
    }

    observer.observe(element);
  });
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
      applyScrollAnimations();
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
      window.addEventListener(
        "scroll",
        () => {
          const fb = document.getElementById("floatBar");
          if (fb) {
            fb.classList.toggle("visible", window.scrollY > 700);
          }
        },
        { passive: true }
      );
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

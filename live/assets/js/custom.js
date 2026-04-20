const page = $("body").data("page");
$(".geo_" + page).addClass("active");
let process_running = 0;

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
  setSequentialAnimation(".geo_howwork_section:not(.geo_howtwo_section) .geo_problem_wrapper", ["fade-right", "fade-left"], 120, 70);
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
  setSequentialAnimation(".geo_howtwo_section .geo_problem_wrapper", ["fade-right", "fade-left"], 120, 70);
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
      this.loader();
      this.profile_toggle();
      applyScrollAnimations();
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

    loader: function () {
      jQuery(window).on("load", function () {
        $(".loader").fadeOut();
        $(".spinner").delay(500).fadeOut("slow");
      });
    },
  };
  Webify.init();
})(jQuery);

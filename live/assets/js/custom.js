const page = $("body").data("page");
$(".geo_" + page).addClass("active");
let process_running = 0;

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

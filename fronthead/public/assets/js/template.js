// if (typeof jQuery === "undefined") {
//     throw new Error("jQuery plugins need to be before this file");
// }
$(function () {
    //���ྫƷģ�壺http://www.jq22.com
    // main sidebar toggle js
  
    $(document).on("click", ".menu-toggle", function () {
      $(".sidebar").toggleClass("open");
      $(".open").removeClass("sidebar-mini");
    });
  
    // layout a sidebar mini version
    $(document).on("click", ".sidebar-mini-btn", function () {
      $(".sidebar").toggleClass("sidebar-mini");
      $(".sidebar-mini").removeClass("open");
    });
  
    // chat page chatlist toggle js
    $(document).on("click", ".chatlist-toggle", function () {
      $(".card-chat").toggleClass("open");
    });
  
    $(document).on("change", ".theme-rtl input", function () {
      if (this.checked) {
        $("body").addClass("rtl_mode");
      } else {
        $("body").removeClass("rtl_mode");
      }
    });
  
    // cSidebar overflow daynamic height
  
    overFlowDynamic();
  
    $(window).resize(function () {
      overFlowDynamic();
    });
  
    function overFlowDynamic() {
      var sideheight = $(".sidebar.sidebar-mini").height() + 48;
  
      if (sideheight <= 760) {
        $(".sidebar.sidebar-mini").css("overflow", "scroll");
      } else {
        $(".sidebar.sidebar-mini").css("overflow", "visible");
      }
    }
  
    // Dropdown scroll hide using table responsive
    $(document).on("show.bs.dropdown", ".table-responsive", function () {
      $(".table-responsive").css("overflow", "inherit");
    });
  
    $(document).on("hide.bs.dropdown", ".table-responsive", function () {
      $(".table-responsive").css("overflow", "auto");
    });
  
    window.onload = function () {
      // light and dark theme setting js
      var toggleSwitch = document.querySelector(
        '.theme-switch input[type="checkbox"]'
      );
      var toggleHcSwitch = document.querySelector(
        '.theme-high-contrast input[type="checkbox"]'
      );
      var currentTheme = localStorage.getItem("theme");
      if (currentTheme) {
        document.documentElement.setAttribute("data-theme", currentTheme);
  
        if (currentTheme === "dark") {
          toggleSwitch.checked = true;
        }
        if (currentTheme === "high-contrast") {
          toggleHcSwitch.checked = true;
          toggleSwitch.checked = false;
        }
      }
      function switchTheme(e) {
        if (e.target.checked) {
          document.documentElement.setAttribute("data-theme", "dark");
          localStorage.setItem("theme", "dark");
          $('.theme-high-contrast input[type="checkbox"]').prop("checked", false);
        } else {
          document.documentElement.setAttribute("data-theme", "light");
          localStorage.setItem("theme", "light");
        }
      }
      toggleSwitch.addEventListener("change", switchTheme, false);
    };
  
    // end
  });
  
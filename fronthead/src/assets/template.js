// if (typeof jQuery === "undefined") {
//     throw new Error("jQuery plugins need to be before this file");
// }
import  $ from 'jQuery'
$(function() {
    "use strict";
    //���ྫƷģ�壺http://www.jq22.com
    // main sidebar toggle js
    $('.menu-toggle').on('click', function () {
        $('.sidebar').toggleClass('open');
        $('.open').removeClass('sidebar-mini');
    });

    // layout a sidebar mini version
    $('.sidebar-mini-btn').on('click', function () {
        $('.sidebar').toggleClass('sidebar-mini');
        $('.sidebar-mini').removeClass('open');
    });

    // chat page chatlist toggle js
    $('.chatlist-toggle').on('click', function () {
        $('.card-chat').toggleClass('open');
    });

    $(".theme-rtl input").on('change',function() {
        if(this.checked) {
            $("body").addClass('rtl_mode');
        }else{
            $("body").removeClass('rtl_mode');
        }
       
    });

    // cSidebar overflow daynamic height
    
    overFlowDynamic();

    $(window).resize(function(){
        overFlowDynamic();
    });

    function overFlowDynamic(){ 
        var sideheight=$(".sidebar.sidebar-mini").height() + 48;
        
        if(sideheight <= 760) {  
            $(".sidebar.sidebar-mini").css( "overflow", "scroll");  
        }
        else{
            $(".sidebar.sidebar-mini").css( "overflow", "visible"); 
        }
    }
    

    // Dropdown scroll hide using table responsive
    
    $('.table-responsive').on('show.bs.dropdown', function () {
        $('.table-responsive').css( "overflow", "inherit" );
    });
   
    $('.table-responsive').on('hide.bs.dropdown', function () {
            $('.table-responsive').css( "overflow", "auto" );
    })

    // light and dark theme setting js
    var toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    var toggleHcSwitch = document.querySelector('.theme-high-contrast input[type="checkbox"]');
    var currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
    
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
        }
        if (currentTheme === 'high-contrast') {
            toggleHcSwitch.checked = true;
            toggleSwitch.checked = false;
        }
    }
    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            $('.theme-high-contrast input[type="checkbox"]').prop("checked", false);
        }
        else {        
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }    
    }
    toggleSwitch.addEventListener('change', switchTheme, false);
    // end
});




 
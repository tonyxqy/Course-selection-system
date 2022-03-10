<template>
        <!-- Body:Header -->
        <div class="header">
          <nav class="navbar py-4">
            <div class="container-xxl">
              <!-- header_rightbar_icon -->
                <header_rightbar_icon></header_rightbar_icon>
              <!-- menu toggler -->
                <header_menu_toggler></header_menu_toggler>
              <!-- main menu Search-->
               <header_main_menu_search></header_main_menu_search>
            </div>
          </nav>
        </div>
</template>

<script>
import header_main_menu_search  from './header_main_menu_search'
import header_menu_toggler from './header_menu_toggler'
import header_rightbar_icon from './header_rightbar_icon'
export default{
      components:{
            header_menu_toggler,
            header_rightbar_icon,
            header_main_menu_search
        }
}
</script>
<template>
  <div class="sidebar px-4 py-4 py-md-5 me-0">
    <div class="d-flex flex-column h-100">
      <a href="#" class="mb-0 brand-icon">
        <span class="logo-icon">
          <svg
            width="35"
            height="35"
            fill="currentColor"
            class="bi bi-clipboard-check"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"
            />
            <path
              d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"
            />
            <path
              d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"
            />
          </svg>
        </span>
        <span class="logo-text">选课助手</span>
      </a>
      <!-- Menu:main ul -->
      <ul class="menu-list flex-grow-1 mt-3">
        <li class="collapsed">
          <a
            class="m-link active"
            data-bs-toggle="collapse"
            data-bs-target="#dashboard-Components"
            href="#"
          >
            <i class="icofont-home fs-5"></i>
            <span>主页</span>
            <span class="arrow icofont-dotted-down ms-auto text-end fs-5"></span>
          </a>
          <!-- Menu:Sub menu ul -->
          <ul class="sub-menu collapse show" id="dashboard-Components">
            <li>
              <router-link class="ms-link active" to="/Home/firstpage">
                <span>学生选课提醒</span>
              </router-link>
            </li>
          </ul>
        </li>
        <li class="collapsed">
          <a class="m-link" data-bs-toggle="collapse" data-bs-target="#project-Components" href="#">
            <i class="icofont-briefcase"></i>
            <span>学生选课</span>
            <span class="arrow icofont-dotted-down ms-auto text-end fs-5"></span>
          </a>
          <!-- Menu:Sub menu ul -->
          <ul class="sub-menu collapse" id="project-Components">
            <li>
              <router-link class="ms-link" to="/Home/havechosen">
                <span>已选课程查询</span>
              </router-link>
            </li>
            <li>
              <router-link class="ms-link" to="/Home/couldchose">
                <span>可选课程查询</span>
              </router-link>
            </li>
            <li>
              <router-link class="ms-link" to="/Home/xuanke">
                <span>选课</span>
              </router-link>
            </li>
            <li>
              <router-link class="ms-link" to="/Home/tuike">
                <span>退课</span>
              </router-link>
            </li>
          </ul>
        </li>
        <li class="collapsed">
          <a class="m-link" data-bs-toggle="collapse" data-bs-target="#tikit-Components" href="#">
            <i class="icofont-ticket"></i>
            <span>成绩查询</span>
            <span class="arrow icofont-dotted-down ms-auto text-end fs-5"></span>
          </a>
          <!-- Menu:Sub menu ul -->
          <ul class="sub-menu collapse" id="tikit-Components">
            <li>
              <router-link class="ms-link" to="/Home/chengji">
                <span>查询已修课程成绩</span>
              </router-link>
            </li>
          </ul>
        </li>
        <li class="collapsed">
          <a class="m-link" data-bs-toggle="collapse" data-bs-target="#emp-Components" href="#">
            <i class="icofont-users-alt-5"></i>
            <span>管理员系统</span>
            <span class="arrow icofont-dotted-down ms-auto text-end fs-5"></span>
          </a>
          <!-- Menu:Sub menu ul -->
          <ul class="sub-menu collapse" id="emp-Components">
            <li>
              <router-link class="ms-link" to="/Home/course">
                <span>课程表管理</span>
              </router-link>
            </li>
            <li>
              <router-link class="ms-link" to="/Home/teacher">
                <span>教师名单管理</span>
              </router-link>
            </li>
            <li>
              <router-link class="ms-link" to="/Home/student">
                <span>学生名单管理</span>
              </router-link>
            </li>
          </ul>
        </li>
        <li class="collapsed">
          <a class="m-link" data-bs-toggle="collapse" data-bs-target="#menu-Componentsone" href="#">
            <i class="icofont-contrast"></i>
            <span>账户管理</span>
            <span class="arrow icofont-dotted-down ms-auto text-end fs-5"></span>
          </a>
          <!-- Menu:Sub menu ul -->
          <ul class="sub-menu collapse" id="menu-Componentsone">
            <li>
              <router-link class="ms-link" to="/Home/account">
                <span>账户管理</span>
              </router-link>
            </li>
          </ul>
        </li>
        <li class="collapsed">
          <a class="m-link" data-bs-toggle="collapse" data-bs-target="#payroll-Components" href="#">
            <i class="icofont-ui-calculator"></i>
            <span>教师管理系统</span>
            <span class="arrow icofont-dotted-down ms-auto text-end fs-5"></span>
          </a>
          <!-- Menu:Sub menu ul -->
          <ul class="sub-menu collapse" id="payroll-Components">
            <li>
              <router-link class="ms-link" to="/Home/mylesson">
                <span>我所教授的课程</span>
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
      <!-- Theme:Switch Theme -->
      <ul class="list-unstyled mb-0">
        <li class="d-flex align-items-center justify-content-center">
          <div class="form-check form-switch theme-switch">
            <input class="form-check-input" type="checkbox" id="theme-switch" />
            <label class="form-check-label" for="theme-switch">暗黑护眼模式</label>
          </div>
        </li>
        <li class="d-flex align-items-center justify-content-center">
          <div class="form-check form-switch theme-rtl">
            <input class="form-check-input" type="checkbox" id="theme-rtl" />
            <label class="form-check-label" for="theme-rtl">反转模式</label>
          </div>
        </li>
      </ul>
      <!-- Menu:menu collepce btn -->
      <button type="button" class="btn btn-link sidebar-mini-btn text-light">
        <span class="ms-2">
          <i class="icofont-bubble-right"></i>
        </span>
      </button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
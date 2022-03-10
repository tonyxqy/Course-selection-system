import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/Home",
    name: "Home",
    component: Home,
    children: [
      {
        name: "firstpage",
        path: "firstpage",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../components/pages/firstpage.vue"
          ),
      },
      {
        name: "havechosen",
        path: "havechosen",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../components/pages/havechosen.vue"
          ),
        meta: {
          isAuth: true, // 配置是否需要
          title: "已选课程",
        },
        beforeEnter(to, from, next) {
          if (sessionStorage.getItem("pass") === "学生") {
            //权限控制的具体规则
            next();
          } else {
            alert("您无权访问该页面");
          }
        },
      },
      {
        name: "tuike",
        path: "tuike",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../components/pages/tuike.vue"
          ),
        meta: {
          isAuth: true, // 配置是否需要
          title: "退课",
        },
        beforeEnter(to, from, next) {
          if (sessionStorage.getItem("pass") === "学生") {
            //权限控制的具体规则
            next();
          } else {
            alert("您无权访问该页面");
          }
        },
      },
      {
        name: "couldchose",
        path: "couldchose",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../components/pages/couldchose.vue"
          ),
        meta: {
          isAuth: true, // 配置是否需要
          title: "可选课程",
        },
        beforeEnter(to, from, next) {
          if (sessionStorage.getItem("pass") === "学生") {
            //权限控制的具体规则
            next();
          } else {
            alert("您无权访问该页面");
          }
        },
      },
      {
        name: "xuanke",
        path: "xuanke",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../components/pages/xuanke.vue"
          ),
        meta: {
          isAuth: true, // 配置是否需要
          title: "可选课程",
        },
        beforeEnter(to, from, next) {
          if (sessionStorage.getItem("pass") === "学生") {
            //权限控制的具体规则
            next();
          } else {
            alert("您无权访问该页面");
          }
        },
      },
      {
        name: "chengji",
        path: "chengji",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../components/pages/chengji.vue"
          ),
        meta: {
          isAuth: true, // 配置是否需要
          title: "成绩查询",
        },
        beforeEnter(to, from, next) {
          if (sessionStorage.getItem("pass") === "学生") {
            //权限控制的具体规则
            next();
          } else {
            alert("您无权访问该页面");
          }
        },
      },
      {
        name: "course",
        path: "course",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../components/pages/course.vue"
          ),
        meta: {
          isAuth: true, // 配置是否需要
          title: "课程信息",
        },
        beforeEnter(to, from, next) {
          if (sessionStorage.getItem("pass") === "管理员") {
            //权限控制的具体规则
            next();
          } else {
            alert("您无权访问该页面");
          }
        },
      },
      {
        name: "teacher",
        path: "teacher",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../components/pages/teacher.vue"
          ),
        meta: {
          isAuth: true, // 配置是否需要
          title: "教师信息",
        },
        beforeEnter(to, from, next) {
          if (sessionStorage.getItem("pass") === "管理员") {
            //权限控制的具体规则
            next();
          } else {
            alert("您无权访问该页面");
          }
        },
      },
      {
        name: "student",
        path: "student",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../components/pages/student.vue"
          ),
        meta: {
          isAuth: true, // 配置是否需要
          title: "学生信息",
        },
        beforeEnter(to, from, next) {
          if (sessionStorage.getItem("pass") === "管理员") {
            //权限控制的具体规则
            next();
          } else {
            alert("您无权访问该页面");
          }
        },
      },
      {
        name: "account",
        path: "account",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../components/pages/account.vue"
          ),
        meta: {
          isAuth: true, // 配置是否需要
          title: "账户信息",
        },
        beforeEnter(to, from, next) {
          if (sessionStorage.getItem("pass") === "管理员") {
            //权限控制的具体规则
            next();
          } else {
            alert("您无权访问该页面");
          }
        },
      },
      {
        name: "mylesson",
        path: "mylesson",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../components/pages/mylesson.vue"
          ),
        meta: {
          isAuth: true, // 配置是否需要
          title: "教授课程",
        },
        beforeEnter(to, from, next) {
          if (sessionStorage.getItem("pass") === "教师") {
            //权限控制的具体规则
            next();
          } else {
            alert("您无权访问该页面");
          }
        },
      },
    ],
  },
  {
    path: "/",
    name: "login_must",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/login_must"),
  },
];

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes,
});

export default router;

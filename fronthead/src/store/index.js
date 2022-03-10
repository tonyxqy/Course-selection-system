import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    stuInfo: {
      student_name: "请登录",
      department: "请登录",
      student_id: "请登录",
      age: "未知"
    },
    choose:0,
    teacherInfo:{
      teacher_id:"请登录",
      teacher_name:"请登录",
      department: "请登录",
      position: '请登录'
    },
    identity:""
  },
  mutations: {
    update(state){
      if (sessionStorage.getItem("stuInfo")) {
        state.stuInfo = JSON.parse(sessionStorage.getItem("stuInfo"));
      }
    },
    updateteacher(state){
      if (sessionStorage.getItem("teacherInfo")) {
        state.teacherInfo = JSON.parse(sessionStorage.getItem("teacherInfo"));
      }
    },
    changechoose(state,value){
      state.choose=value
    }
  },
  actions: {
  },
  modules: {
  }
})


<template>
  <div
    class="col-lg-6 d-flex justify-content-center align-items-center border-0 rounded-lg auth-h100"
  >
    <div class="w-100 p-3 p-md-5 card border-0 bg-dark text-light" style="max-width: 32rem;">
      <!-- Form -->
      <form class="row g-1 p-3 p-md-4">
        <div class="col-12 text-center mb-4">
          <h1>登录</h1>
          <span>欢迎使用选课系统</span>
        </div>

        <!-- <div id="app"></div> -->
        <div class="col-12">
          <div class="mb-3">
            <el-radio-group v-model="stulogin.authority">
              <el-radio label="学生" class="color-white">我是学生</el-radio>
              <el-radio label="教师" class="color-white">我是教师</el-radio>
              <el-radio label="管理员" class="color-white">我是管理员</el-radio>
            </el-radio-group>
          </div>
          <div class="mb-2">
            <label class="form-label">学号/工号</label>
            <input
              v-model="stulogin.username"
              class="form-control form-control-lg"
              placeholder="********"
            />
          </div>
        </div>
        <div class="col-12">
          <div class="mb-2">
            <div class="form-label">
              <span class="d-flex justify-content-between align-items-center">密码</span>
            </div>
            <input
              type="password"
              v-model="stulogin.password"
              class="form-control form-control-lg"
              placeholder="******"
            />
          </div>
        </div>
        <div class="col-12 text-center mt-4">
          <a
            href="index.html"
            v-on:click.prevent="SubmitstuInfo"
            class="btn btn-lg btn-block btn-light lift text-uppercase"
            atl="signin"
          >登 录</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import "animate.css";
import axios from "axios";
export default {
  data() {
    return {
      radio: 3,
      stulogin: {
        username: "",
        password: "",
        authority: ""
      }
    };
  },
  methods: {
    SubmitstuInfo() {
      var that = this;
      axios({
        method: "POST",
        url: "http://localhost:3000/login",
        headers: {
          key: "Content-Type",
          value: "application/json",
          type: "text"
        },
        data: that.stulogin
      }).then(response => {
        if (response.data != "error") {
          if (!response.data.Error) {
            sessionStorage.clear();
            console.log(JSON.stringify(response.data));
            if (this.stulogin.authority == "学生") {
              sessionStorage.setItem("stuInfo", JSON.stringify(response.data));
              this.$store.commit("update");
              this.$router.replace("/Home/firstpage");
              sessionStorage.setItem('pass',that.stulogin.authority)
            } else {
              sessionStorage.setItem("teacherInfo", JSON.stringify(response.data));
              this.$store.commit("updateteacher");
              this.$router.replace("/Home/firstpage");
              sessionStorage.setItem('pass',that.stulogin.authority)
            }
          } else {
            console.log(response.data);
          }
        } else {
          alert("请输入正确的账号和密码");
        }
      });
    }
  }
};
</script>

<style scoped>
.color-white {
  color: white;
  margin: 5px;
  width: 100px;
}
</style>
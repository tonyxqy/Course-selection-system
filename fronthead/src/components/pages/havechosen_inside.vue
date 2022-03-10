<template>
  <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
    <div class="card">
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between mt-5">
          <div class="lesson_name">
            <div class="project-block light-orange-bg">
              <i class="icofont-dashboard-web"></i>
            </div>
            <span class="small text-muted project_name fw-bold">{{$store.state.stuInfo.student_id}}</span>
            <h6 class="mb-0 fw-bold fs-6 mb-2">{{item.course_name}}</h6>
          </div>
          <div class="btn-group" role="group" aria-label="Basic outlined example">
            <button
              v-if="$store.state.choose===1"
              type="button"
              class="btn btn-outline-secondary"
              data-bs-toggle="modal"
              @click="drawer = true"
            >
              <i class="icofont-edit text-success"></i>
            </button>
            <button
              v-if="$store.state.choose===2"
              type="button"
              class="btn btn-outline-secondary"
              data-bs-toggle="modal"
              data-bs-target="#deleteproject"
              @click="deletedialogVisible=!deletedialogVisible"
            >
              <i class="icofont-ui-delete text-danger"></i>
            </button>
          </div>
        </div>
        <div class="d-flex align-items-center">
          <div class="avatar-list avatar-list-stacked pt-2">{{item.xm}}</div>
        </div>
        <div class="row g-2 pt-4">
          <div class="col-6">
            <div class="d-flex align-items-center">
              <i class="icofont-paper-clip"></i>
              <span class="ms-2">专业：{{item.department}}</span>
            </div>
          </div>
          <div class="col-6">
            <div class="d-flex align-items-center">
              <i class="icofont-sand-clock"></i>
              <span class="ms-2">学分：{{item.credit}}</span>
            </div>
          </div>
          <div class="col-6">
            <div class="d-flex align-items-center">
              <i class="icofont-group-students"></i>
              <span class="ms-2">授课老师：{{item.teacher_name}}</span>
            </div>
          </div>
          <div class="col-6">
            <div class="d-flex align-items-center">
              <i class="icofont-ui-text-chat"></i>
              <span class="ms-2">课程号：{{item.course_id}}</span>
            </div>
          </div>
        </div>
        <div class="dividers-block"></div>
      </div>
    </div>
    <transition
      appear
      name="animate__animated"
      enter-active-class="animate__zoomIn"
      leave-active-class="animate__hinge"
    >
      <el-dialog :visible.sync="deletedialogVisible" width="30%">
        <div class="modal-header">
          <h5 id="deleteprojectLabel">你确定退选课程《{{item.course_name}}》吗</h5>
        </div>
        <div class="modal-body justify-content-center flex-column d-flex">
          <i class="icofont-ui-delete text-danger display-2 text-center mt-2"></i>
          <p class="mt-4 fs-5 text-center">点击Delete将推选该课程</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-danger color-fff"
            data-bs-dismiss="modal"
            @click="deleteclass"
          >Delete</button>
        </div>
      </el-dialog>
    </transition>

    <el-drawer
      title="确定选择本课程,点击屏幕任意位置确认"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
    >
      <el-descriptions title="课程信息">
        <el-descriptions-item label="课程名">{{item.course_name}}</el-descriptions-item>
        <el-descriptions-item label="专业">{{item.department}}</el-descriptions-item>
        <el-descriptions-item label="学分">{{item.credit}}</el-descriptions-item>
        <el-descriptions-item label="授课老师">{{item.teacher_id}}</el-descriptions-item>
        <el-descriptions-item label="课程号">{{item.course_id}}</el-descriptions-item>
      </el-descriptions>
      <el-button type="danger" @click="selectclass">确定选课</el-button>
    </el-drawer>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: ["item", "upload"],
  data() {
    return {
      flag: false,
      drawer: false,
      direction: "rtl",
      deletedialogVisible: false
    };
  },
  methods: {
    selectclass() {
      this.student_id = this.$store.state.stuInfo.student_id;
      var that = this;
      axios({
        method: "POST",
        url: "http://localhost:3000/xuanke",
        headers: {
          key: "Content-Type",
          value: "application/json",
          type: "text"
        },
        data: {
          student_id: that.student_id,
          course_id: this.item.course_id
        }
      }).then(response => {
        console.log(response);
        // that.deletedialogVisible = !that.deletedialogVisible;
        that.upload();
      });
      this.deletedialogVisible= false
      this.drawer = false;
    },
    handleClose(done) {
      this.$confirm("退出课程选择界面吗？")
        .then(_ => {
          console.log(_);
          done();
        })
        .catch(_ => {
          console.log(_);
        });
    },
    deleteclass() {
      this.student_id = this.$store.state.stuInfo.student_id;
      var that = this;
      axios({
        method: "POST",
        url: "http://localhost:3000/deleteclass",
        headers: {
          key: "Content-Type",
          value: "application/json",
          type: "text"
        },
        data: { student_id: that.student_id, course_id: this.item.course_id }
      }).then(response => {
        console.log(response);
        that.deletedialogVisible = !that.deletedialogVisible;
        that.upload();
      });
    }
  }
};
</script>
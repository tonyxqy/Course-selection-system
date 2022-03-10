<template>
  <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
    <div class="card">
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between mt-5">
          <div class="lesson_name">
            <div class="project-block light-orange-bg">
              <i class="icofont-dashboard-web"></i>
            </div>
            <span
              class="small text-muted project_name fw-bold"
            >{{$store.state.teacherInfo.teacher_id}}</span>
            <h6 class="mb-0 fw-bold fs-6 mb-2">{{item.course_name}}</h6>
          </div>
          <div class="btn-group" role="group" aria-label="Basic outlined example">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-bs-toggle="modal"
              @click="selectclass"
            >
              <i class="icofont-edit text-success"></i>
            </button>
          </div>
        </div>
        <div class="d-flex align-items-center">
          <div class="avatar-list avatar-list-stacked pt-2"></div>
        </div>
        <div class="row g-2 pt-4">
          <div class="col-6">
            <div class="d-flex align-items-center">
              <i class="icofont-paper-clip"></i>
              <span class="ms-2">所属院系:{{item.department}}</span>
            </div>
          </div>
          <div class="col-6">
            <div class="d-flex align-items-center">
              <i class="icofont-sand-clock"></i>
              <span class="ms-2">课程号:{{item.course_id}}</span>
            </div>
          </div>
          <div class="col-6">
            <div class="d-flex align-items-center">
              <i class="icofont-group-students"></i>
              <span class="ms-2">授课老师：{{$store.state.teacherInfo.teacher_name}}</span>
            </div>
          </div>
          <div class="col-6">
            <div class="d-flex align-items-center">
              <i class="icofont-ui-text-chat"></i>
              <span class="ms-2">学分:{{item.credit}}</span>
            </div>
          </div>
        </div>

        <div class="dividers-block"></div>
      </div>
    </div>
    <el-drawer
      title="本课程学生信息"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
    >
      <el-table
        :data="classInfo"
        style="width: 100%"
        :default-sort="{prop: 'classInfo', order: 'descending'}"
      >
        <el-table-column prop="student_id" label="学号" sortable></el-table-column>
        <el-table-column prop="student_name" label="姓名" sortable></el-table-column>
        <el-table-column prop="grade" label="成绩"></el-table-column>
        <el-table-column prop="gpa" label="绩点"></el-table-column>
      </el-table>
      <el-row>
        <el-button type="primary" icon="el-icon-edit" circle @click="dialogFormVisible = true"></el-button>
      </el-row>
    </el-drawer>

    <el-dialog title="修改成绩" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="学生学号" :label-width="formLabelWidth">
          <el-input v-model="form.student_id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="成绩" :label-width="formLabelWidth">
          <el-input v-model="form.grade" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changevalue">确 定</el-button>
      </div>
    </el-dialog>
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
      deletedialogVisible: false,
      dialogFormVisible: false,
      classInfo: [],
      form: {
        course_id: "",
        student_id: "",
        grade: ""
      }
    };
  },
  methods: {
    changevalue() {
      this.dialogFormVisible = false;
      this.form.course_id = this.item.course_id;
      var that = this;
      axios({
        method: "POST",
        url: "http://localhost:3000/changevalue",
        headers: {
          key: "Content-Type",
          value: "application/json",
          type: "text"
        },
        data: that.form
      }).then(response => {
        console.log(response);
        that.drawer = true;

        that.deletedialogVisible = !that.deletedialogVisible;
      });
      console.log(that.selectclass);
      that.selectclass();
      this.deletedialogVisible = false;
      this.drawer = true;
    },
    selectclass() {
      this.teacher_id = this.$store.state.teacherInfo.teacher_id;
      var that = this;
      axios({
        method: "POST",
        url: "http://localhost:3000/kecheng",
        headers: {
          key: "Content-Type",
          value: "application/json",
          type: "text"
        },
        data: {
          teacher_id: that.teacher_id,
          course_id: this.item.course_id
        }
      }).then(response => {
        console.log(response);
        that.classInfo = response.data;
        that.drawer = true;
        that.deletedialogVisible = !that.deletedialogVisible;
      });
      this.deletedialogVisible = false;
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
    }
  }
};
</script>
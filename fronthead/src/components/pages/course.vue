<template>
  <div class="row clearfix g-3">
    <div class="col-sm-12">
      <div class="card mb-3">
        <div class="card-body">
          <el-button type="primary" style="float:right" @click="addcourse">
            添加
            <i class="el-icon-upload el-icon--right"></i>
          </el-button>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column fixed prop="course_id" label="课程编号"></el-table-column>
            <el-table-column prop="course_name" label="课程名称"></el-table-column>
            <el-table-column prop="credit" label="学分"></el-table-column>
            <el-table-column prop="department" label="专业"></el-table-column>
            <el-table-column prop="teacher_id" label="教师编号"></el-table-column>
          </el-table>
          <el-dialog title="添加课程" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="课程编号" :label-width="formLabelWidth">
                <el-input v-model="form.course_id" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="课程名称" :label-width="formLabelWidth">
                <el-input v-model="form.course_name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="学分" :label-width="formLabelWidth">
                <el-input v-model="form.credit" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="专业" :label-width="formLabelWidth">
                <el-input v-model="form.department" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="教师编号" :label-width="formLabelWidth">
                <el-input v-model="form.teacher_id" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="courseadded">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
    var that = this;
    axios({
      method: "POST",
      url: "http://localhost:3000/course",
      headers: {
        key: "Content-Type",
        value: "application/json",
        type: "text"
      },
      data: { student_id: that.student_id }
    }).then(response => {
      that.tableData = response.data;
    });
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    update() {
      var that = this;
      axios({
        method: "POST",
        url: "http://localhost:3000/course",
        headers: {
          key: "Content-Type",
          value: "application/json",
          type: "text"
        },
        data: { student_id: that.student_id }
      }).then(response => {
        that.tableData = response.data;
        console.log(that.tableData);
      });
    },
    addcourse() {
      this.dialogFormVisible = true;
    },
    courseadded() {
      this.dialogFormVisible = false;
      //   console.log(this.form);
      var that = this;
      axios({
        method: "POST",
        url: "http://localhost:3000/courseadded",
        headers: {
          key: "Content-Type",
          value: "application/json",
          type: "text"
        },
        data: that.form
      }).then(response => {
        console.log(response);
        that.tableData = response.data;
      });
    }
  },

  data() {
    return {
      tableData: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        course_id: "",
        course_name: "",
        credit: "",
        department: "",
        teacher_id: ""
      }
    };
  }
};
</script>
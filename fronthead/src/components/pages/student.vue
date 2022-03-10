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
            <el-table-column fixed prop="student_id" label="学生id"></el-table-column>
            <el-table-column prop="student_name" label="学生名字"></el-table-column>
            <el-table-column prop="gender" label="性别"></el-table-column>
            <el-table-column prop="age" label="年龄"></el-table-column>
            <el-table-column prop="department" label="专业"></el-table-column>
            <el-table-column prop="fee" label="学费"></el-table-column>
          </el-table>
          <el-dialog title="添加学生" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="学生id" :label-width="formLabelWidth">
                <el-input v-model="form.student_id" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="学生名字" :label-width="formLabelWidth">
                <el-input v-model="form.student_name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="性别" :label-width="formLabelWidth">
                <el-input v-model="form.gender" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="年龄" :label-width="formLabelWidth">
                <el-input v-model="form.age" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="专业" :label-width="formLabelWidth">
                <el-input v-model="form.department" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="学费" :label-width="formLabelWidth">
                <el-input v-model="form.fee" autocomplete="off"></el-input>
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
      url: "http://localhost:3000/student",
      headers: {
        key: "Content-Type",
        value: "application/json",
        type: "text"
      },
    }).then(response => {
      that.tableData = response.data;
    });
  },
  methods: {
    handleClick(row) {
      console.log(row);
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
        url: "http://localhost:3000/studentadded",
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
        teacher_id: "",
        teacher_name: "",
        department: "",
        position: ""
      }
    };
  }
};
</script>
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
            <el-table-column fixed prop="username" label="用户名"></el-table-column>
            <el-table-column prop="password" label="密码"></el-table-column>
            <el-table-column prop="identity" label="权限"></el-table-column>
          </el-table>
          <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="用户名-学工号" :label-width="formLabelWidth">
                <el-input v-model="form.username" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input v-model="form.password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="权限">
                <el-select v-model="form.identity" placeholder="请选择权限">
                  <el-option label="学生" value="学生"></el-option>
                  <el-option label="教师" value="教师"></el-option>
                  <el-option label="管理员" value="管理员"></el-option>
                </el-select>
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
      url: "http://localhost:3000/account",
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
    addcourse() {
      this.dialogFormVisible = true;
    },
    courseadded() {
      this.dialogFormVisible = false;
      //   console.log(this.form);
      var that = this;
      axios({
        method: "POST",
        url: "http://localhost:3000/accountadded",
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
        username: "",
        password: "",
        identity: ""
      }
    };
  }
};
</script>
<template>
  <div class="row clearfix g-3">
    <div class="col-sm-12">
      <div class="card mb-3">
        <div class="card-body">
          <el-table
            :data="resultList"
            style="width: 100%"
            :default-sort="{prop: 'item.course_id', order: 'descending'}"
          >
            <el-table-column prop="course_id" label="课程号" sortable width="180"></el-table-column>
            <el-table-column prop="course_name" label="课程名" sortable width="180"></el-table-column>
            <el-table-column prop="credit" label="学分" width="180"></el-table-column>
            <el-table-column prop="department" label="专业" width="180"></el-table-column>
            <el-table-column prop="grade" label="年级" width="180"></el-table-column>
            <el-table-column prop="gpa" label="gpa" width="180"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
// import chengji_inside from "./chengji_inside";

export default {
  // components: {
  //   chengji_inside
  // },
  data() {
    return {
      student_id: "",
      resultList: []
    };
  },

  mounted() {
    this.student_id = this.$store.state.stuInfo.student_id;
    var that = this;
    axios({
      method: "POST",
      url: "http://localhost:3000/chengji",
      headers: {
        key: "Content-Type",
        value: "application/json",
        type: "text"
      },
      data: { student_id: that.student_id }
    }).then(response => {
      that.resultList = response.data;
    });
  }
};
</script>
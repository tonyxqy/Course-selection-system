<template>
  <div class="col-lg-12 col-md-12 flex-column">
    <div class="tab-content mt-4">
      <div class="tab-pane fade show active" id="All-list">
        <div class="row g-3 gy-5 py-3 row-deck">
          <mylesson_inside
            v-for="item in resultList"
            :item="item"
            :key="item.index"          :updated="updated"
            :upload="upload"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import mylesson_inside from "./mylesson_inside";
export default {
  components: {
    mylesson_inside
  },
  data() {
    return {
      student_id: "",
      resultList: []
    };
  },
  methods: {
    upload() {
      this.student_id = this.$store.state.teacherInfo.teacher_id;
      var that = this;
      axios({
        method: "POST",
        url: "http://localhost:3000/mylesson",
        headers: {
          key: "Content-Type",
          value: "application/json",
          type: "text"
        },
        data: { student_id: that.student_id }
      }).then(response => {
        that.resultList = response.data;
        console.log(this.resultList);
      });
    }
  },
  mounted() {
    this.student_id = this.$store.state.teacherInfo.teacher_id;
    var that = this;
    axios({
      method: "POST",
      url: "http://localhost:3000/mylesson",
      headers: {
        key: "Content-Type",
        value: "application/json",
        type: "text"
      },
      data: { student_id: that.student_id }
    }).then(response => {
      that.resultList = response.data;
      console.log(this.resultList);
    });
  }
};
</script>
<template>

    <!-- <tbody>
      <tr>
        <td>{{item.course_id}}</td>
        <td>
          <span class="fw-bold ms-1">{{item.course_name}}</span>
        </td>
        <td>{{item.credit}}</td>
        <td>{{item.department}}</td>
        <td>{{item.grade}}</td>
        <td>{{item.gpa}}</td>
      </tr>
    </tbody> -->
  <el-table
    :data="tableData"
    style="width: 100%"
    :default-sort = "{prop: 'item.course_id', order: 'descending'}"
    >
    <el-table-column
      prop="item.course_id"
      label="课程号"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="item.course_name"
      label="课程名"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="item.credit"
      label="学分"
      width="180">
    </el-table-column>
        <el-table-column
      prop="item.department"
      label="专业"
      width="180">
    </el-table-column>
            <el-table-column
      prop="item.grade"
      label="年级"
      width="180">
    </el-table-column>
            <el-table-column
      prop="item.gpa"
      label="gpa"
      width="180">
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  props: ["item"]
};
</script>
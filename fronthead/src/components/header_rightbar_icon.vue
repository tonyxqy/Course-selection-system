<template>
  <!-- header rightbar icon -->
  <div class="h-right d-flex align-items-center mr-5 mr-lg-0 order-1">
    <div class="d-flex">
      <a class="nav-link text-primary collapsed" href="help.html" title="Get Help">
        <i class="icofont-info-square fs-5"></i>
      </a>
    </div>
    <div class="dropdown notifications zindex-popover">
      <a class="nav-link dropdown-toggle pulse" href="#" role="button" data-bs-toggle="dropdown">
        <i class="icofont-alarm fs-5"></i>
        <span class="pulse-ring"></span>
      </a>
      <div
        id="NotificationsDiv"
        class="dropdown-menu rounded-lg shadow border-0 dropdown-animation dropdown-menu-sm-end p-0 m-0"
      >
        <div class="card border-0 w380">
          <div class="card-header border-0 p-3">
            <h5 class="mb-0 font-weight-light d-flex justify-content-between">
              <span>消息</span>
              <span class="badge text-white">{{messages.length}}</span>
            </h5>
          </div>
          <div class="tab-content card-body">
            <div class="tab-pane fade show active">
              <ul class="list-unstyled list mb-0">
                <li class="py-2 mb-1 border-bottom" v-for="item in messages" :key="item.id">
                  <a href="javascript:void(0);" class="d-flex">
                    <img
                      class="avatar rounded-circle"
                      src="../../public/assets/images/xs/avatar1.jpg"
                      alt
                    />
                    <div class="flex-fill ms-2">
                      <p class="d-flex justify-content-between mb-0">
                        <span class="font-weight-bold">{{item.updater}}</span>
                        <small>2MIN</small>
                      </p>
                      <span class>
                        {{item.message}}
                        <span class="badge bg-success">Review</span>
                      </span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <a class="card-footer text-center border-top-0" href="#">View all notifications</a>
        </div>
      </div>
    </div>
    <div class="dropdown user-profile ml-2 ml-sm-3 d-flex align-items-center zindex-popover">
      <div class="u-info me-2">
        <p class="mb-0 text-end line-height-sm">
          <span class="font-weight-bold">{{$store.state.stuInfo.student_name!=='请登录'?$store.state.stuInfo.student_name:$store.state.teacherInfo.teacher_name}}</span>
        </p>
        <small>{{$store.state.stuInfo.student_name!=='请登录'?$store.state.stuInfo.department:$store.state.teacherInfo.department}}</small>
      </div>
      <a
        class="nav-link dropdown-toggle pulse p-0"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        data-bs-display="static"
      >
        <img
          class="avatar lg rounded-circle img-thumbnail"
          src="../../public/assets/images/profile_av.png"
          alt="profile"
        />
      </a>
      <div
        class="dropdown-menu rounded-lg shadow border-0 dropdown-animation dropdown-menu-end p-0 m-0"
      >
        <div class="card border-0 w280">
          <div class="card-body pb-0">
            <div class="d-flex py-1">
              <img
                class="avatar rounded-circle"
                src="../../public/assets/images/profile_av.png"
                alt="profile"
              />
              <div class="flex-fill ms-3">
                <p class="mb-0">
                  <span class="font-weight-bold">{{$store.state.stuInfo.student_name!=='请登录'?$store.state.stuInfo.student_name:$store.state.teacherInfo.teacher_name}}</span>
                </p>
                <small class>{{$store.state.stuInfo.student_name!=='请登录'?$store.state.stuInfo.student_id:$store.state.teacherInfo.teacher_id}}</small>
              </div>
            </div>
            <div>
              <hr class="dropdown-divider border-dark" />
            </div>
          </div>
          <div class="list-group m-2">
            <a href="task.html" class="list-group-item list-group-item-action border-0">
              <i class="icofont-tasks fs-5 me-3"></i>My Task
            </a>
            <a href="members.html" class="list-group-item list-group-item-action border-0">
              <i class="icofont-ui-user-group fs-6 me-3"></i>members
            </a>
            <router-link
              to="/"
              class="list-group-item list-group-item-action border-0"
            >
              <i class="icofont-logout fs-6 me-3"></i>Signout
            </router-link>
            <div>
              <hr class="dropdown-divider border-dark" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      messages: [
        {
          id: 1,
          updater: "罗浩",
          message: "春季第二轮选课开始啦",
          checked: false
        }
      ]
    };
  },
  mounted() {
     this.$store.commit("update")
  }
};
</script>

<style>
</style>
<template>
  <div class="pull-height animated">
    <top></top>
    <div class="index">
      <sidebar class="left pull-chheight"></sidebar>
      <div class="right">
        <!-- <tags refs="nav" class="nav"></tags> -->
        <div class="tags-container nav">
          <div class="tags-breadcrumb">
            <Breadcrumb class="tags-breadcrumb-list"></Breadcrumb>
          </div>
        </div>
        <router-view class="main"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import top from "./top/";
import sidebar from "./sidebar";
import Breadcrumb from "./breadcrumb";
export default {
  components: {
    top,
    sidebar,
    Breadcrumb
  },
  name: "index",
  data() {
    return {
  
    };
  },
  created() {},
  mounted() {},

  props: [],
  methods: {}
};
</script>

<style lang="scss" scoped>
.index {
  margin-top: 10px;
  display: flex;
  height: calc(100% - 60px);
  padding: 0 0 20px 0;
  position: relative;
  min-height: 100%;
  overflow: hidden;
  .left:not(.el-menu--collapse) {
    width: 200px;
    overflow-y: auto;
    box-shadow:0px 0px 6px 0px rgba(8,27,51,0.2);
  }
  .el-button--primary.is-plain {
      color: #409EFF;
      background: #ecf5ff;
      border-color: #b3d8ff;
      background-color: #fff;
      min-width:80px;
  }
  .el-button.is-disabled.is-plain, .el-button.is-disabled.is-plain:focus, .el-button.is-disabled.is-plain:hover {
      background-color: #E5E5E5;
      border-color: #E5E5E5;
      color: #fff;
  }
  .right {
    // padding-top: 52px;
    position: relative;
    // flex: 1;
    box-sizing: border-box;
    margin-left:15px;
    margin-top:2px;
    box-shadow:0px 0px 6px 0px rgba(8,27,51,0.2);
    width: calc(100% - 230px);
    height: calc(100% - 70px);
    overflow: hidden;
  }
  .main {
    overflow-y: scroll;
    background-color:#fff;
    height: 100%;
    padding-left:30px;
    padding-bottom: 10px;
    padding-top: 10px;
    padding-right:30px;
    box-sizing: border-box;
    width:100%;
  }
  .nav {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-color:#fff;
    z-index: 999;
  }
}
.pull-height{
  background-color: #f8f8f8;
}
</style>
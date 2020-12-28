<template>
  <div class="header">
    <div class="header-button is-left">
      <top-logo></top-logo>
    </div>
    <h1 class="header-title"> </h1>
    <div class="headerTextBox">
    <div class="box">
      <p class="animate">
        {{topText}}
      </p>
    </div>
    </div>
    <div class="header-button is-right">
      <el-dropdown>
        <span class="title-user el-dropdown-link">
          <b>   
            <i class="el-icon-s-home"></i>
          </b>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link to="/">首页</router-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

  </div>
</template>
<script>

import { fullscreenToggel, listenfullscreen } from "@/util/util";
import topLogo from "./top-logo";
export default {
  components: { topLogo },
  name: "top",
  data() {
    return {  
        topText:"漏洞自发与管理系统发送邮件765786231@qq.com"
    };
  },
  filters: {},
  created() {},
  mounted() {
 
  },
  computed: {
  
  },
  methods: {

  }
};
</script>

<style lang="scss" scoped>
.header {
  border-bottom: none;
  background-color: #4a90e2;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.09);
  .el-dropdown {
    margin-left: 10px;
  }
}
.logo_subtitle {
  color: #fff;
}
.el-dropdown-link b {
  color: #fff;
}
.bt-logout {
  color: #333;
  margin-left: 20px;
  margin-right: 10px;
  font-size: 16px;
  font-weight: normal;
}
.title-user {
  font-size: 16px;
  color: #262626;
  b {
    font-weight: normal;
    color: #fff;
  }
}
.headerTextBox{
  width: 100%;
}
.box {
  width: 700px;
  margin: 0 auto;
  // border: 1px solid #ff6700;
  overflow: hidden;
  border-radius: 5px;
}

.animate {
  padding-left: 20px;
  font-size: 14px;
  color: #ffff;
  display: inline-block;
  white-space: nowrap;
  // animation: 22s wordsLoop linear infinite normal;
}

// @keyframes wordsLoop {
//   0% {
//     transform: translateX(200px);
//     -webkit-transform: translateX(200px);
//   }
//   100% {
//     transform: translateX(-100%);
//     -webkit-transform: translateX(-100%);
//   }
// }

// @-webkit-keyframes wordsLoop {
//   0% {
//     transform: translateX(200px);
//     -webkit-transform: translateX(200px);
//   }
//   100% {
//     transform: translateX(-100%);
//     -webkit-transform: translateX(-100%);
//   }
// }

</style>


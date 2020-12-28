<template>
  <div class="pull-auto">
    <div class="logo">
      <span class="logo_subtitle"><i class="el-icon-printer"></i>漏洞自发与管理</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "top-logo",
  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {}
};
</script>

<style scoped="scoped" lang="scss">
.logo {
  display: flex;
  align-items: center;
  img{
    width: 28px;
    height:28px;
    padding: 0 16px;
  }
}
.logo_title {
  padding: 0 8px 0 0;
  color: #fff;
  font-size: 28px;
  font-style: italic;
  &.is-bold {
    font-weight: 700;
  }
}
.logo_subtitle {
  padding-top: 5px;
  color:#fff;
  padding-left:30px ;
}
</style>

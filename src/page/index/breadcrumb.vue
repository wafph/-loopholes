<template>
  <div>
    <el-breadcrumb  separator-class="el-icon-arrow-right" class="tags-breadcrumb-list">
      <!-- <el-breadcrumb-item :to="{ path:pathhome}">{{title}}</el-breadcrumb-item> -->
      <el-breadcrumb-item  :to="{ path:this.$route.path}">{{this.$route.name}}</el-breadcrumb-item>
      <!-- <el-breadcrumb-item  ><a href="this.$route.path">{{this.$route.name}}</a></el-breadcrumb-item> -->
      <el-breadcrumb-item>信息列表</el-breadcrumb-item>
      <el-breadcrumb-item v-if ="this.$route.path =='/workOrder/Orderdetails/Solution'">工单详情</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>

// import { setTitle } from '@/util/util';
export default {
  name: "breadcrumb",
  data() {
    return {
      title:"自查风险信息",
      pathhome:"/selfInformation/AssetsInformation/index",
    };
  },
  created() {},
  mounted() {
    // console.log("this.route",this.$route);
    // setTitle(this.$route.name)
    this.getRouter()
    
  },
  watch: {},
  computed: {
    toPath: function() {
      return { path: this.tagCurrent.parrentPath };
    }
  },
  methods: {
    goBack: function() {
      this.$router.push({ path: this.tagCurrent.parrentPath });
    },
    getRouter(){
     if(this.$route.path =="/workOrder/Orderdetails/index"){
       this.title ="工单管理"
       this.pathhome ="/workOrder/Orderdetails/index"
     }else if(this.$route.path =="/workOrder/Orderdetails/Solution"){
      this.title ="工单管理";
       this.pathhome ="/workOrder/Orderdetails/index"
     }else{
       this.title ="自查风险信息"
       this.pathhome ="/selfInformation/AssetsInformation/index"
     }
    }
  }
};
</script>
<style lang="scss">
.isClick {
  cursor: pointer;
  .el-breadcrumb__inner {
    color: #4a90e2;
  }
}
</style>



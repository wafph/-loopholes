<template>
  <el-menu :router="false" :default-openeds="openArray" class="el-menu-vertical-demo" :default-active="index" active-text-color="#4A90E2">
    <sidebar-item :menu="menu" :show="!isCollapse"></sidebar-item>
  </el-menu>
</template>

<script>
import { setUrlPath,getMenu } from "@/util/util";
import SidebarItem from "./sidebarItem";
export default {
  data() {
    return {
      openArray:[],
      index:'11',
      menu:[],
      isCollapse:false
    };
  },
  computed:{
    nowTagValue: function() {
      return setUrlPath(this.$route);
    },
    textColor: function() {
      if(this.themeColor =='dark'){
        return '#fff';
      } else{
        return '#5A595B';
      }
    },
    activeTextClor: function(){
      if(this.themeColor =='dark'){
        return '#4A90E2';
      } else{
        return '#4A90E2';
      }
    }
  },
  mounted() {
    this.menu = getMenu();
    this.getIdByPath(this.menu);
  },
  watch:{
    "$route.path"(to){
      this.getIdByPath(this.menu);
    }
  },
  methods: {
    getIdByPath(arr){
      var parentPath = this.$route.path;
      var path = parentPath.split('detail')[0];
      arr.forEach((item,index)=>{
          if(item.children&&item.children.length>0){
            this.getIdByPath(item.children)
          }else{
            if(item.path){
                if(item.whiteLists){
                  if(item.whiteLists.indexOf(parentPath)!=-1){
                      this.index = String(item.id);
                      console.log(this.index)
                  }
                }else if(item.path.indexOf(path)!=-1){
                  this.index = String(item.id);
                }
            }
          }
      })
    },
  },
  components: { SidebarItem }
};
</script>
<style lang="scss" scoped>
  .el-menu-vertical-demo{
    background-color: #f8f8f8;
  }
  .el-menu{
    border-right: none;
  }
</style>

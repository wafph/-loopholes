<template>
  <div class="menu-wrapper">
    <template v-for="(item,index) in menu">
      <el-menu-item v-if="!item.children || item.children.length===0 " :index="iniIndex(index)" @click="open(item)" :key="item.id">
        <!-- <i :class="item.icon"></i> -->
        <span slot="title">{{item.label}}</span>
      </el-menu-item>
      <el-submenu v-else :index="iniIndex(item.id)" :key="item.id">
        <template slot="title">
          <!-- <i :class="item.icon"></i> -->
          <span @click="openSub(item)" slot="title" :class="{display:!show}">{{item.label}}</span>
        </template>
        <template v-for="(child,cindex) in item.children">
          <el-menu-item :index="iniIndex(child.id)" @click="open(child)" v-if="!child.children || child.children.length==0" :key="child.id">
            <!-- <i :class="child.icon"></i> -->
            <span slot="title">{{child.label}}</span>
            <i class="el-submenu__icon-arrow el-icon-arrow-right"></i>
          </el-menu-item>
          <sidebar-item v-else :menu="[child]" :show="show" :key="child.id"></sidebar-item>
        </template>
      </el-submenu>
    </template>
  </div>
</template>
<script>
import { resolveUrlPath } from "@/util/util";
export default {
  name: "SidebarItem",
  data() {
    return {};
  },
  props: {
    menu: {
      type: Array
    },
    show: {
      type: Boolean
    }
  },
  created() {},
  mounted() {},
  methods: {
    openSub(item){
      this.open(item)
    },
    open(item) {
      if (item.component!='newTab'){
        if(item.path){
            this.$router.push({
              path: resolveUrlPath(item.path, item.label),
              query: item.query
            });
        }
      } else {
        window.open(item.path);
      }
    },
    iniIndex(index){
      return ''+index
    }
  }
};
</script>
<style lang="scss" scoped>
.display {
  display: none;
}
.el-submenu {
  .el-menu-item,/deep/  .el-submenu__title {
    height: 40px;
    line-height: 40px;
  }
  .el-menu-item{
    color: #5A595B;
    background-color: #fff !important;
    border:1px solid #F1F4F9;
    &:hover{
      background-color: #4A90E2 !important;
      color:#fff !important;
      border:1px solid #4A90E2 !important;
      .el-icon-arrow-right{
          color:#fff;
      }
    }
  }
  .el-submenu__title{
      &:hover{
            background-color: #4A90E2 !important;
            color:#fff !important;
            border:1px solid #4A90E2 !important;
      }
  }
}
.el-menu-item.is-active{
  background-color: #4A90E2 !important;
  color:#fff !important;
  border:1px solid #4A90E2 !important;
}
.el-submenu__title{
    border-top:3px solid #4d92df;
}
</style>




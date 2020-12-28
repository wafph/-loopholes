import Vue from 'vue';
import VueRouter from 'vue-router'
import Layout from '@/page/index/';
import errorPage404 from '@/components/errorPage/404.vue';
const _import = require('./_import');
Vue.use(VueRouter)
export default new VueRouter({
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return {
        x: 0,
        y: to.meta.savedPosition || 0
      }
    }
  },
});

export const asyncRouterMap = [
  {
    path: '*',
    redirect: '/404',
    hidden: true
  },
  {
    path: '/404',
    component: errorPage404,
    name: '404'
  },
  {
    path: '/',
    name: 'home',
    redirect: '/selfInformation/AssetsInformation/index'
  },
   // 自查风险信息
   {
    path: '/selfInformation',
    component: Layout,
    children: [
      {
        path: 'AssetsInformation/index',
        name: '资产信息',
        meta: {
          title:"自查风险信息——资产信息",
          // isCreate: true
        },
        // component: _import('AssetsInformation/index', 'views')
        component:()=>import("@/views/AssetsInformation"),
      },
      {
        path: 'Vulnerabilityinformation/index',
        name: '漏洞信息',
        meta: {
          title:"自查风险信息——漏洞信息",
          // isCreate: true
        },
        // component: _import('Vulnerabilityinformation/index', 'views')
        component:()=>import("@/views/Vulnerabilityinformation"),
      },
  
    ]
  },
   // 工单部分信息
   {
    path: '/workOrder',
    component: Layout,
    children: [
      {
        path: 'Orderdetails/index',
        name: '工单信息',
        meta: {
          title:"工单管理——工单信息",
          // isCreate: true
        },
        // component: _import('Orderdetails/index', 'views')
        component:()=>import("@/views/Orderdetails"),
      }, 
      {
        path: 'Orderdetails/Solution',
        name: '工单详情',
        meta: {
          title:"工单管理——工单详情",
          // isCreate: true
        },
        // component: _import('Orderdetails/Solution', 'views')
        component:()=>import("@/views/Orderdetails/Solution"),
      },  
    
    ]
  },
]



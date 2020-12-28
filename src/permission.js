import router from './router/router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { asyncRouterMap } from '@/router/router'
NProgress.configure({ showSpinner: false })// NProgress Configuration
router.addRoutes(asyncRouterMap); // 动态添加可访问路由表

//寻找子菜单的父类
function findMenuParent(tag) {
    let tagCurrent = tag
    // console.log("tag",tag)
    tagCurrent.parrentTitle = tag.label
    if(tag.parrentName){
        tagCurrent.parrentPath = tagCurrent.value.substring(0,tagCurrent.value.lastIndexOf('/'))+'/index'
        tagCurrent.parrentTitle = tagCurrent.parrentName
        tagCurrent.isChild = true
    }
    return tagCurrent


}

export {
    findMenuParent
}

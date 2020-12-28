
  import {
    exportFn
  } from '@/api/export.js'
  export const getMenu = () => {
    var admin = {};
    var list = [];
    var selfcheck  ={
        id:14,
        label: "自查风险信息",
        children: [
          {
            id: 141,
            label: "资产信息",
            path: '/selfInformation/AssetsInformation/index',
          },
          {
            id: 142,
            label: "漏洞信息",
            path: '/selfInformation/Vulnerabilityinformation/index',
          },
          // {
          //   id: 143,
          //   label: "告警查询",
          //   path: '/selfInformation/Alarmquery/index',
          // }
        ]
  
    };
    var workOrder  ={
      id:15,
      label: "工单管理",
      children: [
        {
          id: 151,
          label: "工单信息",
          path: '/workOrder/Orderdetails/index',
        },
      ]
  
    };
    list = [ selfcheck,workOrder,]
 
    return list;
  }
  export const setTitle = function (title) {
    title = title ? `${title}——漏洞自发与管理系统` : '漏洞自发与管理系统';
    window.document.title = title;
  };
  export const exportCommon = {
    blobChange(response) {
      let blob = new Blob([response], {
        type: 'application/vnd.ms-excel'
      });
      console.log(blob)
      if (typeof window.navigator.msSaveBlob !== 'undefined') {
        /*
         * IE workaround for "HTML7007: One or more blob URLs were revoked by closing
         * the blob for which they were created. These URLs will no longer resolve as
         * the data backing the URL has been freed."
         */
        window.navigator.msSaveBlob(blob, this.fileName)
      } else {
        let URL = window.URL || window.webkitURL
        let objectUrl = URL.createObjectURL(blob)
        if (this.fileName) {
          var a = document.createElement('a')
          // safari doesn't support this yet
          if (typeof a.download === 'undefined') {
            window.location = objectUrl
          } else {
            a.href = objectUrl
            a.download = this.fileName
            document.body.appendChild(a)
            a.click()
            a.remove()
          }
        } else {
          window.location = objectUrl
        }
      }
    },
    exportFn(path, params) {
      console.log(path, '222')
      exportFn(path || this.path, params || this.params).then((res) => {
        var content = res.headers['content-disposition'];
        this.fileName = content.split('attachment;filename=')[1];
        this.fileName = decodeURIComponent(this.fileName);
        this.blobChange(res.data);
      })
    }
  }
  
  /**
   * 递归寻找子类的父类
   */
  
  export const findParent = (menu, id) => {
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].children.length != 0) {
        for (let j = 0; j < menu[i].children.length; j++) {
          if (menu[i].children[j].id == id) {
            return menu[i];
          } else {
            if (menu[i].children[j].children.length != 0) {
              return findParent(menu[i].children[j].children, id);
            }
          }
        }
      }
    };
  }
  
  /**
   * 总体路由处理器
   */
  export const resolveUrlPath = (url, name) => {
  
    let reqUrl = url;
    if (url.indexOf("http") != -1 || url.indexOf("https") != -1) {
      reqUrl = `/myiframe/urlPath?src=${reqUrl}&name=${name}`;
    } else {
      reqUrl = `${reqUrl}`;
    }
    return reqUrl;
  }
  /**
   * 总体路由设置器
   */
  export const setUrlPath = ($route) => {
    let value = "";
    if ($route.query.src) {
      value = $route.query.src;
      if (value.indexOf(baseUrl) != -1) {
        const port = value
          .substr(value.lastIndexOf(":"))
          .replace(value.substr(value.lastIndexOf("/")), "");
        const path = value.replace(baseUrl + port, "");
        value = "#" + path + port;
      }
    } else {
      value = $route.path;
    }
    return value;
  }
  /**
   * 动态插入css
   */
  
  export const loadStyle = url => {
    const link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    const head = document.getElementsByTagName('head')[0];
    head.appendChild(link);
  }
  /**
   * 根据字典的value显示label
   */
  export const findByvalue = (dic, value) => {
    let result = '';
    if (validatenull(dic)) return value;
    if (typeof (value) == 'string' || typeof (value) == 'number') {
      let index = 0;
      index = findArray(dic, value);
      if (index != -1) {
        result = dic[index].label;
      } else {
        result = value;
      }
    } else if (value instanceof Array) {
      result = [];
      let index = 0;
      value.forEach(ele => {
        index = findArray(dic, ele);
        if (index != -1) {
          result.push(dic[index].label);
        } else {
          result.push(value);
        }
      });
      result = result.toString();
    }
    return result;
  }
  /**
   * 根据字典的value查找对应的index
   */
  export const findArray = (dic, value) => {
    for (let i = 0; i < dic.length; i++) {
      if (dic[i].value == value) {
        return i;
        break;
      }
    }
    return -1;
  }
  /**
   * 生成随机len位数字
   */
  export const randomLenNum = (len, date) => {
    let random = '';
    random = Math.ceil(Math.random() * 100000000000000).toString().substr(0, len ? len : 4);
    if (date) random = random + Date.now();
    return random;
  }
  
  export function uniq(array, type) {
    var temp = {};
    var arr = [];
    for (var i = 0; i < array.length; i++) {
      if (type) {
        temp[array[i]] = array[i];
      } else {
        temp[array[i].label] = array[i].label;
      }
  
    }
    for (var key in temp) {
      if (type) {
        arr.push(temp[key])
      } else {
        arr.push({
          value: temp[key],
          label: temp[key]
        })
      }
    }
    return arr;
  }
  
  /**
   * 时间戳转string时间
   * */
  
  export function timeStampToString(timeStamp){
    let date = new Date(timeStamp)
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h=h < 10 ? ('0' + h) : h;
    let minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    let second=date.getSeconds();
    second=second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
  }
  
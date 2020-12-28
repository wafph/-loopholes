

function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}
/**
 * 日期格式化
 */
export function dateFormat(date) {
  let format = 'yyyy-MM-dd hh:mm:ss';
  if (date != 'Invalid Date') {
    var o = {
      "M+": date.getMonth() + 1, //month
      "d+": date.getDate(), //day
      "h+": date.getHours(), //hour
      "m+": date.getMinutes(), //minute
      "s+": date.getSeconds(), //second
      "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
      "S": date.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
          RegExp.$1.length == 1 ? o[k] :
            ("00" + o[k]).substr(("" + o[k]).length));
    return format;
  }
  return '';

}
export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }

  if ((time + '').length === 10) {
    time = +time * 1000
  } else if(!time){
    return ''
  }

  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    date = new Date(parseInt(time))
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

/* 数字 格式化*/
export function nFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

export function toThousandslsFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

export function lastTime(time){
  if(time>1000){
    return Math.ceil((time/1000))+' s';
  }else{
    return time+' ms';
  }
}
/* 完整时间 */
export function formatTimeComplete(time){
  var date = new Date(time);
  var now = '';
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes(),
    s: date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds(),
    a: date.getDay()
  }
  if(formatObj.h>12){
      now = '下午'
  }else if(formatObj.h<12){
      now = '上午'
  }else{
      now = '中午'
  }
  return formatObj.y+'-'+formatObj.m + '-' + formatObj.d + ' '+now+' ' + formatObj.h + ':' + formatObj.i + ':' + formatObj.s
}


export function levelFilter(status){
  status = status?status:'';
   const statusMap = {
       0:"初级",
       1:'中级',
       2:'高级',
       3:'无'
   }
   return statusMap[status] || status;
};
export function eduFilter(status){
 status = status?status:'';
 var education = [
       '初中',
       '高中',
       '本科',
       '研究生'
 ]
return education[status] || status
};
export function projectFilter(status) {
   status = status?status:'';
   const statusMap = {
       0:'合作伙伴外包信息化项目',
       1:'外包信息化项目',
       2:'维保软件项目',
       3:'维保硬件项目',
       4:'业务支撑服务项目',
       5:'技术支持服务项目'
   }
   return statusMap[status] || status;
};
export function sexFilter(status){
  status = status?status:'';
   const statusMap = {
       0:"男",
       1:'女'
   }
   return statusMap[status] || status;
};
export function helpFilter(status){
   status = status?status:'';
   const statusMap = {
       1:"是",
       0:'否'
   }
   return statusMap[status] || status;
};
export function projectTypeFilter(status){
 status = status?status:'';
 const statusMap = {
       0:'研发类'
 }
 return statusMap[status] || status;
};
export function recordFilter(status){
 status = status?status:'';
 const statusMap = {
       0:'大专',
       1:'本科',
       2:'硕士',
       3:'博士'
 }
 return statusMap[status] || status;
};

export function leaveTypeFilter(status){
  status = status?status:'';
  console.log(status)
  var leaveType = ['调休', "事假", "病假", '其它', '公出'];
  return leaveType[status] || status
}
//资产子类型
export function getSubType(status){
  status = status?status:'';
  const AssetSubType = {
        5:'mysql',
        6:'redis',
        7:'rabbitMQ',
        8:'activeMQ',
        9:"centos",
        10:"xx管理系统"
  }
  return AssetSubType[status] || status;
 };

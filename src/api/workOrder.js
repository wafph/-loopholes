import request from '@/util/axios'
//通过id获取工单及对应历史修复库信息
export function getWorkOrderOrHistory(query) {
    return request({
      url: '/woc/getWorkOrderOrHistory',
      method: 'get',
      params:query
    })
  }

//终止按钮
  export function endTermination(query) {
    return request({
      url: '/woc/endTermination',
      method: 'get',
      params:query
    })
  }

  //工单分页查询

  export function workOrderPageCondition(params) {
    return request({
      url: '/woc/workOrderPageCondition',
      method: 'post',
      data:params
    })
  }

  //操作按钮.首先回显改调工单信息 通过id获取工单信息和修复库信息
  export function getWorkOrderRepair(query) {
    return request({
      url: '/woc/getWorkOrderRepair',
      method: 'get',
      params:query
    })
  }

//确定修改
  export function operation(params) {
      return request({
        url: '/woc/operation',
        method: 'post',
        data:params
      })
    }


//下载接口
    export function downloadAttachment(query) {
      return request({
        url: `/woc/downloadAttachment`,
        method: 'get',
        params:query
      })
    }

 

//批量删除
export function delallworkOrder(query) {
  return request({
    url: '/woc/delleteWorkOrder',
    method: 'get',
    params:query
  })
}
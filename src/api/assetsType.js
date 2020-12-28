import request from '@/util/axios'
//条件分页查询
// export function assetLibraryPageCondition(params) {
//     return request({
//       url: '/alc/assetLibraryPageCondition',
//       method: 'post',
//       data:params
//     })
//   }
//获取子级类型
  export function getAssetSubType(query) {
    return request({
      url: '/atc/getAssetSubType',
      method: 'get',
      params:query
    })
  }

  //获取父级类型
  export function getAssetParentType(query) {
    return request({
      url: '/atc/getAssetParentType',
      method: 'get',
      params:query
    })
  }

// 通过id获取所有资产类型
export function getAssetAllTypes(query) {
  return request({
    url: '/atc/getAssetAllType',
    method: 'get',
    params:query
  })
}

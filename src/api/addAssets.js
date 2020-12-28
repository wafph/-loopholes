import request from '@/util/axios'
//条件分页查询
export function assetLibraryPageCondition(params) {
    return request({
      url: '/alc/assetLibraryPageCondition',
      method: 'post',
      data:params
    })
  }
//通过id获取资产库信息
  export function getAssetLibrary(query) {
    return request({
      url: '/alc/getAssetLibrary',
      method: 'get',
      params:query
    })
  }
  //添加资产
  export function addAsset(params) {
    return request({
      url: '/alc/addAsset',
      method: 'post',
      data:params
    })
  }
  //更新资产
  export function updateAsset(params) {
    return request({
      url: '/alc/updateAsset',
      method: 'post',
      data:params
    })
  }

  // 删除资产
  export function deleteAsset(query) {
    return request({
      url: '/alc/deleteAsset',
      method: 'get',
      params:query
    })
  }
//批量删除
  export function delleteAssetLibrary(query) {
    return request({
      url: '/alc/delleteAssetLibrary',
      method: 'get',
      params:query
    })
  }
//批量导入资产
export function batchImport(params) {
  return request({
    url: '/alc/importAsset',
    method: 'post',
    data:params
  })
}

//扫描
// /alc/scanning

export function scanning(query) {
  return request({
    url: '/alc/scanning',
    method: 'get',
    params:query
  })
}



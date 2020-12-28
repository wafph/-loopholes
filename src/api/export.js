import request from '@/util/axios'

export function exportFn(url,query){
  return request({
    url: url,
    method: 'get',
    responseType:'blob',
    params:query
  })
}

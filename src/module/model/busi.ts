/*
 * @Description: 文件内容
 * @Author: dali
 * @Date: 2022-03-08 19:04:39
 * @LastEditors: dali
 * @LastEditTime: 2022-03-08 19:07:39
 */
import { handleRequest } from '@/config/request'
import * as ApiConst from '@/config/api'

export interface BusiItem {
  id: string | null
  nm: string | null
  orgId: string | null
  taxCd: string | null
}



type BusiListResponse = Array<BusiItem>

export class BusiModel {

  static getBusiList (param:string) {
    const params = {
      param,
      rootOrgId:localStorage.getItem('orgId') || ''
    }
    return handleRequest<BusiListResponse>({
      method: 'GET',
      url: ApiConst.BusiGetBusiList,
      params
    })
  }
}
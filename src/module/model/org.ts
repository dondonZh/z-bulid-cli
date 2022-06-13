/*
 * @Description: org Model类
 * @Author: dali
 * @Date: 2022-03-07 13:46:30
 * @LastEditors: dali
 * @LastEditTime: 2022-03-08 17:38:38
 */
import { handleRequest } from '@/config/request'
import * as ApiConst from '@/config/api'

export interface OrgItem {
  child?: OrgItem[] | null
  deptHeadId: string | null
  deptHeadNm: string | null
  id: string | null
  nm: string | null
  prntId: string | null
  busiSubjId: string | null
  userOrgList: Array<Record<string, unknown>> | null
}



type OrgListResponse = Array<OrgItem>

export class OrgModel {

  static getOrgList () {
    const params = {
      orgId:localStorage.getItem('orgId') || ''
    }
    return handleRequest<OrgListResponse>({
      method: 'GET',
      url: ApiConst.OrgGetOrgList,
      params
    })
  }
}

/*
 * @Description: 文件内容
 * @Author: dali
 * @Date: 2022-03-10 13:32:21
 * @LastEditors: dali
 * @LastEditTime: 2022-03-10 13:47:55
 */
import { handleRequest } from '@/config/request'
import * as ApiConst from '@/config/api'
import { MoreQuery } from '@/types'

export interface TicLessApplyItem {
  amt: string | null
  applicantNm: string | null
  busiSubjNm: string | null
  cd: string | null
  crtBy: string | null
  crtTm: string | null
  fillTicketCompleteTm: string | null
  fillTicketPlanTm: string | null
  fillTicketStatus: string | null
  id: string | null
  notes: string | null
  orgNm: string | null
  pymtTm: string | null
  reason: string | null
  status: string | null
}

interface TicLessApplyResponse {
  current?: number | null,
  total: number,
  result: Array<TicLessApplyItem>
}
export class TicketLessApplyModel {

  static getExpenseList (page = 1, rows = 100, data:MoreQuery) {
    const baseData = {
      page,
      rows,
      rootOrgId:localStorage.getItem('orgId') || ''
    }
    return handleRequest<TicLessApplyResponse>({
      method: 'POST',
      url: ApiConst.ExpenseGetTicketLessList,
      data:{
        ...data,
        ...baseData
      }
    })
  }
}

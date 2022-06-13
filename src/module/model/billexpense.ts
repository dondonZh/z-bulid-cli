import { handleRequest } from '@/config/request'
import * as ApiConst from '@/config/api'
import { MoreQuery } from '@/types'

export interface ExpenseItem {
  acctCd: string | null
  acctNm: string | null
  amt: string | null
  applicantId: string | null
  applicantNm: string | null
  bankNm: string | null
  busiSubjId: string | null
  busiSubjNm: string | null
  cd: string | null
  crtBy: string | null
  crtTm: string | null
  editFlag: boolean | null
  expType: string | null
  id: string | null
  notes: string | null
  orgId: string | null
  orgNm: string | null
  pymtTm:string | null
  reason: string | null
  rootOrgId: string | null
  rootOrgNm: string | null
  status: string | null
  taxCd: string | null
}

interface ExpenseResponse {
  current?: number | null,
  total: number,
  result: Array<ExpenseItem>
}
export class BillExpenseModel {

  static getExpenseList (page = 1, rows = 100, data:MoreQuery) {
    const baseData = {
      page,
      rows,
      rootOrgId:localStorage.getItem('orgId') || ''
    }
    return handleRequest<ExpenseResponse>({
      method: 'POST',
      url: ApiConst.ExpenseGetExpenseList,
      data:{
        ...data,
        ...baseData
      }
    })
  }
}

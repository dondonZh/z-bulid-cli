import { handleRequest } from '@/config/request'
import * as ApiConst from '@/config/api'
import { Enterprise } from '@/types/index'

export interface CorpOption {
  id: string;
  nm: string;
  taxNm: string;
}

interface CorpResponse {
  current?: number | null,
  total: number,
  result: Array<CorpOption>
}
export class EnterpriseModel {
  static getInfo (corpId: string) {
    return handleRequest<Enterprise>({
      method: 'GET',
      url: ApiConst.PtaxEntrprzGet,
      params: {
        corpId
      }
    })
  }

  static getCorpList (page = 1, rows = 100, rootOrgId: string) {
    const params = {
      page,
      rows,
      rootOrgId,
      nm: ''
    }
    return handleRequest<CorpResponse>({
      method: 'GET',
      url: ApiConst.PtaxEntrprzGetCorpListForSelectWithTax,
      params
    })
  }
}

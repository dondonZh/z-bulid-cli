/*
 * @Description: 文件内容
 * @Author: dali
 * @Date: 2022-02-08 12:55:30
 * @LastEditors: dali
 * @LastEditTime: 2022-04-21 13:19:43
 */
export type MittEvent = {
  doLogin: string | null;
};

export interface Enterprise {
  id: string;
  taxRegisId: string;
  corpId: string;
  corpSysId: string;
  taxNo: string;
  macId: string;
  taxPasswd: string;
  taxNm: string;
  regisDate: string;
  taxAuthNm: string;
  taxAuthCd: string;
  subTaxAuthNm: string;
  subTaxAuthCd: string;
  taxpayerStatus: string;
  taxAgent: string;
  legalRepNm: string;
  address: string;
  phone: string;
  currTax: string;
  postCd: string;
  taxCityCd: string;
  indstrCd: string;
  regisBusiTypeCd: string;
  regisBusiType: string;
  indstrNm: string;
  taxCity: string;
  regisAddr: string;
}
export interface GlobalStoreProps {
  enterprise: Enterprise | null;
  taxPerd: string;
}

export interface CollectionProps {
  url: string;
  itemNm: string;
  cd: string;
  personNum: number;
  incomeAmt: number;
  taxOwedAmt?: number;
}
export interface MultiDigest {
  incomeAmt: number;
  incomeTaxFreeAmt: number;
  personNum: number;
  taxOwedAmt: number;
}

export interface RouterItem {
  fullPath: string;
  hash: string | null;
  matched: Array<any> | null;
  meta: Record<string,unknown> | null;
  name: string;
  params: Record<string,unknown> | null;
  path: string;
  query: Record<string,unknown> | null;
}


export interface View extends RouterItem {
  title: string;
}

export interface ClassifiedDigest {
  incomeAmt: number;
  personNum: number;
  taxOwedAmt: number;
  taxPayableAmt: number;
  taxToDeductAmt: number;
}

export interface MoreQuery {
  param: string;
  orgId: Array<string>;
  busiSubjId: string;
}

export interface MultiRptRequest extends MoreQuery {
  entrprzId: string;
  taxPerd: string;
  taxRegisId?: string;
}

export interface Flatten {
  id: string | null,
  nm: string | null
}

export interface Pagination {
  page: number;
  rows: number;
  total: number;
}



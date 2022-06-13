// 主数据相关服务接口
export const masterCorpList = '/service/masterdata/corp/getCorpList' // 账套列表
export const masterGetChildCatComn = '/service/masterdata/syCatComn/getChildCatComn' // 根据代码获取CatComn的字类目代码
export const custAreaCode = '/service/acctCust/sy-area-code/getAreaCode' // 区域代码查询

//报销
export const ExpenseGetExpenseList = '/service/fssc/expForm/getList'// 获取报销申请列表
export const ExpenseGetTicketLessList = '/service/fssc/noTicketPymt/getList'// 获取无票支付申请列表

//组织
export const OrgGetOrgList = '/service/auth/user/getOrg'// 获取用户组织树（不含未分配）

//业务主体
export const BusiGetBusiList = '/service/auth/busiSubj/getDropDownList'// 获取业务主体





// tax 个税
export const PtaxGetCorpList = '/service/masterdata/personTax/getCorpList'// 个税管理列表
export const PtaxEntrprzGet = '/service/tax/entrprz/get'// 基本信息
export const PtaxEntrprzUpd = '/service/tax/entrprz/upd'// 修改企业
export const PtaxEntrprzAdd = '/service/tax/entrprz/addNew'// 新增企业
export const PtaxEntrprzAddWithChoice = '/service/tax/entrprz/addWithChoice'// 新增企业-多次税务变更企业选取
export const PtaxEntrprzUnbind = '/service/tax/entrprz/unbind'// 解绑企业
export const PtaxEntrprzGetCorpListForSelectWithTax = '/service/tax/entrprz/getCorpListForSelectWithTax'// 获取账套名-个税企业名列表
export const PtaxEntrprzLogin = '/service/tax/entrprz/login'// 登录企业

export const PtaxPersonImport = '/service/tax/person/import'// 导入
export const PtaxPersonAdd = '/service/tax/person/add'// 新增员工
export const PtaxPersonList = '/service/tax/person/getlist'// 员工列表(有分页)
export const PtaxPersonUpd = '/service/tax/person/upd'// 更新员工
export const PtaxPersonDel = '/service/tax/person/del'// 删除
export const PtaxPersonView = '/service/tax/person/view'// 查看
export const PtaxPersonViewWithRpt = '/service/tax/person/viewWithRpt'// 员工报表详情查看

export const PtaxPersonDigest = '/service/tax/person/getDigest'// 信息采集摘要
export const PtaxPersonTotalIncomeRptDigest = '/service/tax/tax-total-income-rpt/getDigest'// 综合所得申报 摘要
export const PtaxReportGetDigestList = '/service/tax/report/getDigestList'// 综合所得申报 摘要列表

export const PtaxPersonGetChoiceList = '/service/tax/person/getChoiceList'// 员工下拉
export const PtaxPersonDeclare = '/service/tax/person/declare'// 人员报送
export const PtaxPersonInfoBatchEdit = '/service/tax/person/bulkEdit' // 人员信息批量修改

export const PtaxTotalIncomeRptImport = '/service/tax/tax-total-income-rpt/import'// 导入
export const PtaxTotalIncomeRptAdd = '/service/tax/tax-total-income-rpt/add'// 添加员工综合所得税申报表
export const PtaxTotalIncomeRptDel = '/service/tax/tax-total-income-rpt/del'// 删除员工综合所得税申报表
export const PtaxTotalIncomeRptDelMonth = '/service/tax/tax-total-income-rpt/delMonth'// 清除本月数据

export const PtaxTotalIncomeRptList = '/service/tax/tax-total-income-rpt/getlist'// 员工综合所得税申报表列表
export const PtaxTotalIncomeRptUpd = '/service/tax/tax-total-income-rpt/upd'// 更新员工综合所得税申报表
export const PtaxTotalIncomeCalculateResGet = '/service/tax/tax-total-income-rpt/getCalculate' // 正常薪金所得税款计算结果
// export const PtaxTotalIncomeRptViewOnePerson='/service/tax/tax-total-income-rpt/viewOnePerson';//个人缴扣明细查询

export const PtaxEntrprzRptViewOnePerson = '/service/tax/entrprz-rpt/viewOnePerson'// 个人缴扣明细查询
export const PtaxReportGetEntrprzList = '/service/tax/entrprz-rpt/getlist'// 单位申报记录查询
export const PtaxEntrprzRptClassifiedDtlGet = '/service/tax/cir-whole/getPersonDetail' // 单位申报记录查询-分类所得代缴代扣查看明细

export const PtaxReportCalc = '/service/tax/report/calculate'// 税款计算
export const PtaxReportCancel = '/service/tax/report/cancel'// 申报表作废
export const PtaxReportDeclare = '/service/tax/report/declare'// 申报表报送/更正
export const PtaxReportCalculatedSelectsGet = '/service/tax/report/getCalculateList' // 获取进项过填写算税的下拉列表
export const PtaxReportDigestInfoGet = '/service/tax/report/getDigest' // 综合所得预扣预缴-获取摘要汇总

// 专项扣除
export const PtaxSpclAddPersonSave = '/service/tax/spcl-add-person/save'// 配偶
export const PtaxSpclAddPersonView = '/service/tax/spcl-add-person/view'

export const PtaxSpclChildEduSave = '/service/tax/spcl-add-edu-child/save'// 子女教育
export const PtaxSpclChildEduView = '/service/tax/spcl-add-edu-child/view'

export const PtaxSpclConEduSave = '/service/tax/spcl-add-continuing-edu/save'// 继续教育
export const PtaxSpclConEduView = '/service/tax/spcl-add-continuing-edu/view'

export const PtaxSpclBankSave = '/service/tax/spcl-add-housing-interest/save'// 房贷
export const PtaxSpclBankView = '/service/tax/spcl-add-housing-interest/view'

export const PtaxSpclRentSave = '/service/tax/spcl-add-housing-rent/save'// 住房租金
export const PtaxSpclRentView = '/service/tax/spcl-add-housing-rent/view'

export const PtaxSpclElderSave = '/service/tax/spcl-add-support-elder/save'// 赡养老人
export const PtaxSpclElderView = '/service/tax/spcl-add-support-elder/view'

export const PtaxSpclDeclare = '/service/tax/spcl/declare'// 申报
export const PtaxSpclList = '/service/tax/spcl/getList'// 获取列表
export const PtaxSpclDel = '/service/tax/spcl/del'// 删除
export const PtaxSpclUpd = '/service/tax/spcl/upd'// 更新指定人员
export const PtaxSpclUpdAll = '/service/tax/spcl/updAll'// 更新全部人员

export const PtaxTripartiteTaxPaymentQuery = '/service/tax/entrprz-rpt/tripartiteTaxPaymentQuery'// 三方协议缴税查询
export const PtaxTripartiteTaxPayment = '/service/tax/entrprz-rpt/tripartiteTaxPayment'// 三方协议缴税
export const PtaxTaxRecords = '/service/tax/entrprz-rpt/taxRecords'// 缴税记录

export const PtaxTaxesList = '/service/tax/entrprz-rpt/getTaxesList'// 获取欠税税单列表(NEW)
export const PtaxOrderCancellation = '/service/tax/entrprz-rpt/orderCancellation'// 支付订单管理-作废支付订单(单选)(NEW)
export const PtaxOrdersManager = '/service/tax/entrprz-rpt/ordersManager'// 支付订单管理-获取支付订单列表(NEW)
export const PtaxJumpToPaymentPage = '/service/tax/entrprz-rpt/jumpToPaymentPage'// 选取待缴款税单，跳转到缴款页面(NEW)

export const PtaxPreAppendSpcl = '/service/tax/spcl/preAppendSpcl'// 专项附加扣除预填
export const PtaxGetLastYearSpclData = '/service/tax/spcl/getLastYearSpclData'// 迁入上年数据
export const PtaxGetLastMonthData = '/service/tax/tax-total-income-rpt/getLastMonthData'// 迁入上月数据

export const PtaxGetPersonDetail = '/service/tax/tax-total-income-rpt/getPersonDetail'// 单位申报记录查询-查看明细
export const PtaxGetUnitDetail = '/service/tax/tax-total-income-rpt/getUnitDetail'// （综合所得）申报-导出申报表
export const PtaxTotalIncomeGetCalculate = '/service/tax/tax-total-income-rpt/getCalculate'// 税款计算-根据查询条件获取算税列表
export const PtaxTotalIncomeBatchEdit = '/service/tax/tax-total-income-rpt/bulkEdit' // 正常工资薪金所得批量修改

// annuity 年金
export const PtaxAnnuityListGet = '/service/tax/tir-annuity/getList' // 综合所得预扣预缴-年金领取：查询列表详情
export const PtaxAnnuityDigestGet = '/service/tax/tir-annuity/getDigest' // 综合所得预扣预缴-年金领取：查询当月总摘要
export const PtaxAnnuityItemAdd = '/service/tax/tir-annuity/add' // 综合所得预扣预缴-年金领取：添加
export const PtaxAnnuityItemUpd = '/service/tax/tir-annuity/upd' // 综合所得预扣预缴-年金领取：更新
export const PtaxAnnuityItemDel = '/service/tax/tir-annuity/del' // 综合所得预扣预缴-年金领取：批量删除
export const PtaxAnnuityMonthDataDel = '/service/tax/tir-annuity/delMonth' // 综合所得预扣预缴-年金领取：整月数据清除
export const PtaxAnnuityImport = '/service/tax/tir-annuity/importExcel' // 综合所得预扣预缴-年金领取：导入
export const PtaxAnnuityCalculateResGet = '/service/tax/tir-annuity/getCalculate' // 综合所得预扣预缴-年金领取：获取税款计算结果
export const PtaxAnnuityItemDtlGetByPersonId = '/service/tax/tir-annuity/viewOnePerson' // 查询个人详情

// annual-bonus 全年一次性奖金
export const PtaxAnnualBonusListGet = '/service/tax/tir-annual-bonus/getList' // 综合所得预扣预缴-全年一次性奖金收入：查询列表详情
export const PtaxAnnualBonusDigestGet = '/service/tax/tir-annual-bonus/getDigest' // 综合所得预扣预缴-全年一次性奖金收入：当月总摘要
export const PtaxAnnualBonusItemAdd = '/service/tax/tir-annual-bonus/add' // 综合所得预扣预缴-全年一次性奖金收入：添加
export const PtaxAnnualBonusItemUpd = '/service/tax/tir-annual-bonus/upd' // 综合所得预扣预缴-全年一次性奖金收入：更新
export const PtaxAnnualBonusItemDel = '/service/tax/tir-annual-bonus/del' // 综合所得预扣预缴-全年一次性奖金收入：批量删除
export const PtaxAnnualBonusMonthDataDel = '/service/tax/tir-annual-bonus/delMonth' // 综合所得预扣预缴-年金领取：整月数据清除
export const PtaxAnnualBonusImport = '/service/tax/tir-annual-bonus/importExcel' // 综合所得预扣预缴-年金领取：导入
export const PtaxAnnualBonusCalculateResGet = '/service/tax/tir-annual-bonus/getCalculate' // 综合所得预扣预缴-全年一次性奖金收入：获取税款计算结果
export const PtaxAnnualBonusItemDtlGetByPersonId = '/service/tax/tir-annual-bonus/viewOnePerson' // 查询个人详情

// tax-cir-property-tenancy 分类所得代扣代缴-财产租赁所得
export const PtaxPropertyLeasingDigestGet = '/service/tax/tax-cir-property-tenancy/getDigest' // 查询当月总摘要
export const PtaxPropertyLeasingListGet = '/service/tax/tax-cir-property-tenancy/getList' // 查询列表详情
export const PtaxPropertyLeasingDtlInfoGet = '/service/tax/tax-cir-property-tenancy/viewOnePerson' // 查询个人详情
export const PtaxPropertyLeasingAdd = '/service/tax/tax-cir-property-tenancy/add' // 新增
export const PtaxPropertyLeasingUpd = '/service/tax/tax-cir-property-tenancy/upd' // 编辑
export const PtaxPropertyLeasingBatchDel = '/service/tax/tax-cir-property-tenancy/del' // 批量删除
export const PtaxPropertyLeasingMonthDataDel = '/service/tax/tax-cir-property-tenancy/delMonth' // 整月数据清除
export const PtaxPropertyLeasingImport = '/service/tax/tax-cir-property-tenancy/importExcel' // 导入
// cir-whole
export const PtaxClassifiedInCollectInfoGet = '/service/tax/cir-whole/getDigest' // 分类所得——摘要汇总
export const PtaxClassifiedInDeclareDataGet = '/service/tax/cir-whole/getDigestList' // 分类所得——申报——摘要列表
export const PtaxClassifiedInDeclareCancel = '/service/tax/cir-whole/cancel' // 分类所得——申报——申报表作废
export const PtaxClassifiedInDoDeclare = '/service/tax/cir-whole/declare' // 分类所得——申报——报送、更正
export const PtaxClassifiedInExportDataGet = '/service/tax/cir-whole/getUnitDetail' // 分类所得——申报导出

// 附表
export const PtaxAttachFormExemptListGet = '/service/tax/tax-addendum-exempt/getList' // 减免事项附表
export const PtaxAttachFormExemptDtlGet = '/service/tax/tax-addendum-exempt/viewOnePerson' // 减免事项附表个人填写查看
export const PtaxAttachFormExempAdd = '/service/tax/tax-addendum-exempt/add' // 减免事项附表：添加
export const PtaxAttachFormDonationListGet = '/service/tax/tax-addendum-donation-deduction/getList' // 附表填写-捐赠扣除附表：查询列表详情
export const PtaxAttachFormDonationDtlGet = '/service/tax/tax-addendum-donation-deduction/viewOnePerson' // 捐赠附表：个人填写查看
export const PtaxAttachFormDonationAdd = '/service/tax/tax-addendum-donation-deduction/add' // 捐赠扣除附表添加
export const PtaxAttachFormClassifiedDigestGet = '/service/tax/cir-whole/getAddendumDigest' // 附表——分类所得摘要汇总
export const PtaxAttachFormMultiDigestGet = '/service/tax/report/getAddendumDigest' // 附表——综合所得摘要汇总

// 导出
export const PtaxRptBonusCalcExport = '/service/tax/tir-annual-bonus/getCalculateExport' // 算税——年终奖导出
export const PtaxRptAnnuityCalcExport = '/service/tax/tir-annuity/getCalculateExport' // 算税——年金领取导出
export const PtaxRptSalaryCalcExport = '/service/tax/tax-total-income-rpt/getCalculateExport' // 算税——正常工资薪金所得导出
export const PtaxPersonInfoExport = '/service/tax/person/getPersonExport' // 人员信息导出

// 劳务报酬(保险营销员、证券经纪人、其他连续劳务)
export const PtaxLaborContinueAdd = '/service/tax/tir-services-reward/add' // 劳务报酬：添加
export const PtaxLaborContinueUpd = '/service/tax/tir-services-reward/upd' // 劳务报酬：编辑
export const PtaxLaborContinueDel = '/service/tax/tir-services-reward/del' // 劳务报酬：批量删除
export const PtaxLaborContinueMonthDataDel = '/service/tax/tir-services-reward/delMonth' // 劳务报酬：清除整月数据
export const PtaxLaborContinueCalculateResGet = '/service/tax/tir-services-reward/getCalculate' // 劳务报酬：获取税款计算结果
export const PtaxLaborContinueDigestGet = '/service/tax/tir-services-reward/getDigest' // 劳务报酬：查询当月总摘要
export const PtaxLaborContinueListGet = '/service/tax/tir-services-reward/getList' // 劳务报酬：查询列表详情
export const PtaxLaborContinueImport = '/service/tax/tir-services-reward/importExcel' // 劳务报酬：导入
export const PtaxLaborContinueDtlInfoGet = '/service/tax/tir-services-reward/viewOnePerson' // 劳务报酬：个人详情查询
export const PtaxLaborContinueExport = '/service/tax/tir-services-reward/getCalculateExport' // 劳务报酬：算税列表导出

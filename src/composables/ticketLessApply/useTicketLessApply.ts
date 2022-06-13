/*
 * @Description: 文件内容
 * @Author: dali
 * @Date: 2022-03-10 13:33:13
 * @LastEditors: dali
 * @LastEditTime: 2022-03-10 13:47:25
 */
import {TicketLessApplyModel,TicLessApplyItem} from "@/module/model/ticketLessApply"
import { Pagination ,MoreQuery} from "@/types"
import { reactive, ref } from "vue"

export default function useTicketLessApply(){
 
  const tableData = ref<TicLessApplyItem[]>([])
  const pagination = reactive<Pagination>({
    page:1,
    rows:50,
    total:0
  })
  const queryForm = reactive<MoreQuery>({
    param: '',
    orgId: [],
    busiSubjId: ''
  })

  const getList = () => {
    TicketLessApplyModel.getExpenseList(pagination.page,pagination.rows,{...queryForm})
    .then(data =>{
      tableData.value = data.result || []
      pagination.total = data.total || 0
    })
  }

  const onQuery = (query:MoreQuery) => {
    queryForm.param = query.param
    queryForm.orgId = query.orgId
    queryForm.busiSubjId = query.busiSubjId
    pagination.page = 1
    getList()
  }
  const handleSizeChange = () => {
    getList()
  }
  const handleCurrentChange = () => {
    getList()
  }

  return {
    getList,
    tableData,
    pagination,
    onQuery,
    handleSizeChange,
    handleCurrentChange,
  }

}
import {BillExpenseModel,ExpenseItem} from "@/module/model/billexpense"
import { Pagination ,MoreQuery} from "@/types"
import { reactive, ref } from "vue"

export default function useBillExpense(){
 
  const tableData = ref<ExpenseItem[]>([])
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
    BillExpenseModel.getExpenseList(pagination.page,pagination.rows,{...queryForm})
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
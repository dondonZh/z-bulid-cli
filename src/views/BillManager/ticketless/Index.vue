<template>
  <div class="main-container">
    <div class="global-head-title mb-6 !text-3xl">
      无票支付申请
    </div>
    <multi-top @query="onQuery">
      <template #right>
        <el-button
          type="primary"
          class="animate-bounce"
        >
          新增
        </el-button>
        <el-button
          type="primary"
          plain
        >
          批量打印
        </el-button>
      </template>
    </multi-top>
    <button class="c-btn">
      测试
    </button>
    <el-table
      ref="table"
      size="small"
      :data="tableData"
      :height="600"
      border
    >
      <el-table-column
        type="selection"
        width="40"
        :selectable="handleSelectable"
      />
      <el-table-column
        prop="cd"
        label="单据编号"
        show-overflow-tooltip
        width="140"
        header-align="center"
        align="center"
        fixed="left"
      />
      <el-table-column
        prop="applicantNm"
        label="申请人"
        sortable
        show-overflow-tooltip
        min-width="100"
        align="center"
        fixed="left"
      />
      <el-table-column
        prop="orgNm"
        label="组织"
        width="100"
        sortable
        show-overflow-tooltip
        align="center"
      />
      <el-table-column
        prop="busiSubjNm"
        label="业务主体"
        sortable
        width="140"
        show-overflow-tooltip
        align="center"
      />
      <el-table-column
        prop="reason"
        label="事由"
        width="120"
        show-overflow-tooltip
        align="center"
      />
      <el-table-column
        prop="amt"
        label="金额"
        sortable
        min-width="100"
        show-overflow-tooltip
        header-align="center"
        align="right"
      />
      <el-table-column
        prop="status"
        label="状态"
        sortable
        width="100"
        show-overflow-tooltip
        align="center"
      >
        <template #default="scope">
          {{ SysConsComm[scope.row.status] }}
        </template>
      </el-table-column>
      <el-table-column
        prop="crtTm"
        label="创建日期"
        width="140"
        show-overflow-tooltip
        align="center"
      />
      <el-table-column
        prop="pymtTm"
        label="支付时间"
        width="140"
        align="center"
      />
      <el-table-column
        prop="fillTicketPlanTm"
        label="预计补录日期"
        width="140"
        align="center"
      />
      <el-table-column
        prop="fillTicketStatus"
        label="补录状态"
        width="140"
        align="center"
      />
      <el-table-column
        prop="fillTicketCompleteTm"
        label="补录完成时间"
        width="140"
        align="center"
      />
      <el-table-column
        prop="notes"
        label="备注"
        width="140"
        show-overflow-tooltip
        align="center"
      />
      <el-table-column
        label="操作"
        min-width="220"
        header-align="center"
        align="center"
        fixed="right"
      >
        <template #default="scope">
          <el-button
            type="text"
            class="inner-link"
            size="small"
            @click="handleView(scope.row.id)"
          >
            查看
          </el-button>
          <el-button
            type="text"
            class="inner-link"
            size="small"
            @click="handleEdit()"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            class="inner-link"
            size="small"
            @click="handleDebounceSub()"
          >
            提交
          </el-button>
          <el-button
            type="text"
            class="inner-link"
            size="small"
            @click="handleRecall()"
          >
            撤回
          </el-button>
          <el-button
            type="text"
            class="table-btn"
            size="small"
            @click="handleDelete()"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-wrap">
      <el-pagination
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.rows"
        background
        :page-sizes="[50,100,200]"
        :total="pagination.total"
        layout="prev, pager, next, sizes,jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { SysConsComm } from '@/config/const'
import { defineComponent, onMounted ,ref,computed} from "vue";
import useTicketLessApply from "@/composables/ticketLessApply/useTicketLessApply";
import MultiTop from "../components/MultiTop.vue";

export default defineComponent({
  name:'TicketLess',
  components:{
    MultiTop
  },
  setup() {
   
    const { getList, tableData ,pagination,handleSizeChange,handleCurrentChange,onQuery} = useTicketLessApply()
    onMounted(() => {
      getList()
    })
    const count = ref(1)
    const plusOne = computed({
      get: () => [count.value + 1],
      set: (val) => {
        count.value = val[0]
      },
    })

    plusOne.value = [666]
    console.log('count.value',count.value) // 0
    console.log('plusOne.value',plusOne.value) // 0
    return {
      tableData,
      onQuery,
      pagination,
      handleSizeChange,
      handleCurrentChange,


    }
  },
  data() {
    return {
      SysConsComm,
    }
  },
  methods: {
    handleSelectable() {
      console.log('')
    },
    handleDelete() {
      console.log('')
    },
    judgeModify() {
      console.log('')
    },
    judgeReCall() {
      console.log('')
    },
    handleDebounceSub() {
      console.log('')
    },
    handleRecall() {
      console.log('')
    },
    handleEdit() {
      console.log('')
    },
    handleView(id: string) {
      console.log('', id)
    }
  }
});
</script>

<style lang="scss" scoped >
.c-btn {
  transition: transform 3s;
}

.inner-link {
  @apply mr-1;
}
</style>

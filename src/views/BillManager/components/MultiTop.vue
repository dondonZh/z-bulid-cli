<!--
 * @Description: 文件内容
 * @Author: dali
 * @Date: 2022-02-10 10:58:17
 * @LastEditors: dali
 * @LastEditTime: 2022-03-08 18:04:00
-->
<template>
  <div class="top-wrapper mb-10 mt-10">
    <div class="btns flex justify-between align-center">
      <div class="left flex align-center">
        <el-input
          v-model="queryForm.param"
          style="width:200px;margin-right:12px"
          clearable
          placeholder="单据编号/申请人"
          suffix-icon="el-icon-search"
        />

        <label class="mr-4 font-12">组织机构:</label>
        <select-tree
          v-model:selectedOrgs="queryForm.orgId"
          :expand-first-level="true"
          :filter-flag="true"
          :options="orgSelectOptions"
          :flatten="flatten"
          @selected="handleTreeChange"
        />

        <label class="mr-4 ml-2 font-12">业务主体:</label>
        <el-select
          v-model="queryForm.busiSubjId"
          clearable
          filterable
        >
          <el-option
            v-for="(item,index) in busiList"
            :key="index"
            :value="item.id"
            :label="item.nm"
          />
        </el-select>
      </div>
      <div class="right">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { MoreQuery } from '@/types'
import { defineComponent, reactive ,watch,onMounted,ref} from 'vue'
import SelectTree from "@/components/SelectTree.vue";
import useOrgList from "@/composables/orgList/useOrgList"
import {BusiModel,BusiItem} from "@/module/model/busi"

export default defineComponent({
  components:{
    SelectTree
  },
  props: {
    showBatch: {
      type: Boolean,
      default: false
    },
    showExport: {
      type: Boolean,
      default: true
    }
  },
  emits: ['query'],
  setup (props, context) {

    const {orgSelectOptions,flatten,getOrgList} = useOrgList()

    const busiList = ref<Array<BusiItem>>([])

    const getBusiList = () => {
      BusiModel.getBusiList('').then((data)=>{
        busiList.value = data
      })
    }

    const queryForm = reactive<MoreQuery>({
      param: '',
      orgId: [],
      busiSubjId: '',
    })
 
    const  handleTreeChange = (val:Array<string>) => {
      queryForm.orgId = val
    }
    const onQuery = () => {
      context.emit('query', { ...queryForm })
    }
    const onReset = () => {
      queryForm.param = ''
      queryForm.orgId = []
      queryForm.busiSubjId = ''
    }

    watch(queryForm, () => {
      onQuery()
    })

    onMounted(() => {
      getOrgList()
      getBusiList()
    })
   
    return {
      busiList,
      queryForm,
      flatten,
      orgSelectOptions,
      
      onQuery,
      onReset,
      handleTreeChange,
    }
  },
  methods: {

  }
})
</script>

<style lang="scss" scoped>
</style>

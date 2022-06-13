<template>
  <el-dialog
    title="税款所属期"
    :model-value="perdPickFlag"
    :append-to-body="true"
    width="400px"
    :show-close="false"
    :close-on-click-modal="false"
    @open="handleDialogOpen">
    税款所属期:
    <el-date-picker v-model="perdCdDate" class="ipt" format="YYYY-MM" type="month" placeholder="选择日期"></el-date-picker>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handlePerdChange">确 定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { GlobalStoreProps } from '@/types'
import { dateFormat } from '@/utils'
import { computed, defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup (props, context) {
    const perdCdDate = ref<Date>()
    const perdPickFlag = computed(() => props.modelValue)
    const handleClose = () => {
      context.emit('update:modelValue', false)
    }
    const store = useStore<GlobalStoreProps>()
    const router = useRouter()
    const handleDialogOpen = () => {
      const taxPerd = store.state.taxPerd
      perdCdDate.value = new Date(`${taxPerd.slice(0, 4)}-${taxPerd.slice(4)}`)
      console.log('taxPerd', perdCdDate.value)
    }
    const handlePerdChange = () => {
      if (!perdCdDate.value) return
      console.log('handlePerdChange', dateFormat('YYYY-mm', perdCdDate.value))
      const taxPerd = dateFormat('YYYYmm', perdCdDate.value)
      store.commit('setTaxPerd', taxPerd)
      router.push('/')
      handleClose()
    }
    return {
      perdCdDate,
      perdPickFlag,
      handleClose,
      handlePerdChange,
      handleDialogOpen
    }
  }
})
</script>

<style lang="scss" scoped>

</style>

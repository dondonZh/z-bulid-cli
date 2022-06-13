<template>
  <div class="header-container">
    <div class="header-left">
      <img
        src="../assets/img/main-logo.svg"
        class="logo-img"
        @click="jumpHomePage"
      >
      <div class="corp-nm">
        <div
          v-if="showNm"
          class="nm-area"
          @click="onClickCorpNm"
        >
          <span v-if="taxNm">{{ taxNm.length>12?taxNm.substr(0,12)+"...":taxNm }}</span>
          <i class="iconfont iconxiala" />
        </div>
      </div>
      <div class="perd">
        <span>税款所属期：{{ perdCdStr }}</span>
        <el-icon
          :size="20"
          @click="onPerdPick"
        >
          <edit />
        </el-icon>
      </div>
    </div>
    <div class="header-right">
      <div
        class="btn-fullscreen"
        @click="handleFullScreen"
      >
        <el-tooltip
          effect="dark"
          :content="`全屏`"
          placement="bottom"
        >
          <i class="el-icon-rank" />
        </el-tooltip>
      </div>
    </div>
    <perd-picker v-model="pickerDialogVisible" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { EnterpriseModel, CorpOption } from '@/module/model/enterprise'
import { useStore } from 'vuex'
import { GlobalStoreProps } from '@/types'
import { Edit } from '@element-plus/icons-vue'
import PerdPicker from '@/components/PerdPicker.vue'
export default defineComponent({
  components: {
    Edit,
    PerdPicker
  },
  setup () {
    const showNm = ref(true)
    const onClickCorpNm = () => {
      showNm.value = !showNm.value
    }
    const store = useStore<GlobalStoreProps>()
    const taxNm = computed(() => store.state.enterprise?.taxNm)

    const corpOptions = ref<CorpOption[]>()
    const getCorpList = () => {
      const page = 1
      const rows = 100
      const rootOrgId = localStorage.getItem('orgId') || ''
      EnterpriseModel.getCorpList(page, rows, rootOrgId)
        .then(data => {
          console.log('data', data)
          corpOptions.value = data.result || []
        })
    }
    const pickerDialogVisible = ref(false)
    const onPerdPick = () => {
      console.log('onPerdPick')
      pickerDialogVisible.value = true
    }
    const perdCdStr = computed(() => store.getters.perdCdStr)
    onMounted(() => {
      console.log('haha')
      
    })
    return {
      pickerDialogVisible,
      showNm,
      taxNm,
      perdCdStr,
      onClickCorpNm,
      onPerdPick
    }
  },
  methods: {
    handleFullScreen () {
      console.log('handleFullScreen')
    },
    jumpHomePage () {
      console.log('jumpHomePage')
    }
  }
})
</script>

<style lang="scss" scoped>
  .header-container {
    position: relative;
    box-sizing: border-box;
    min-width: 1000px;
    width: 100%;
    height: 70px;
    font-size: 20px;
    color: #fff;
    background: #409eff;
    display: flex;
    padding: 0 30px;
    justify-content: space-between;
  }
  .header-left {
    display: flex;
    width: 700px;
    line-height: 70px;
    .logo-img {
      width: 110px;
    }
  }
  .corp-nm {
    margin-left: 20px;
    width: 330px;
    display: flex;
    align-items: center;
  }
  .nm-area {
    width: 100%;
    border-bottom: 2px solid #fff;
    display: flex;
    justify-content: space-between;
    line-height: 32px;
  }
  .perd{
    font-size: 14px;
    margin-left: 40px;
    display: flex;
    align-items: center;}
    i {
      margin-left: 10px;
      cursor: pointer;
    }
</style>

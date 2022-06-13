<!--
 * @Description: 文件内容
 * @Author: dali
 * @Date: 2022-02-08 12:45:27
 * @LastEditors: dali
 * @LastEditTime: 2022-03-10 14:25:00
-->
<template>
  <div class="sidebar-container">
    <el-menu
      class="el-menu-vertical"
      :default-active="$route.path"
      @open="handleOpen"
      @close="handleClose"
      @select="handleMenuSelect"
    >
      <template v-for="menu of menus">
        <el-menu-item
          v-if="!menu.subs"
          :key="menu.index"
          :index="menu.index"
        >
          <i :class="menu.icon" />
          <template #title>
            {{ menu.title }}
          </template>
        </el-menu-item>
        <el-sub-menu
          v-else
          :key="menu.index"
          :index="menu.index"
        >
          <template #title>
            <i :class="menu.icon" />
            <span>{{ menu.title }}</span>
          </template>
          <el-menu-item
            v-for="sub of menu.subs"
            :key="sub.index"
            :index="sub.index"
          >
            {{ sub.title }}
          </el-menu-item>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import ExpenseMenu from '@/config/sidebar'
export default defineComponent({
  setup () {
    const router = useRouter()
    const menus = ref(ExpenseMenu)
    const handleOpen = (key: string, keyPath:string) => {
      console.log(key, keyPath)
    }
    const handleClose = (key:string, keyPath:string) => {
      console.log(key, keyPath)
    }
    const handleMenuSelect = (path:string) => {
      console.log('handleMenuSelect', path)
      router.push(path)
    }
    return {
      menus,
      handleOpen,
      handleClose,
      handleMenuSelect
    }
  }
})
</script>

<style lang="scss" scoped>
  .sidebar-container {
    height: 100%;
    // background-color: #545c64;
  }
  .el-menu-vertical {
    width: 210px;
  }
</style>

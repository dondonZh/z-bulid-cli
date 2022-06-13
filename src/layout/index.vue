<!--
 * @Description: 文件内容
 * @Author: dali
 * @Date: 2022-03-10 14:20:43
 * @LastEditors: dali
 * @LastEditTime: 2022-03-10 15:08:22
-->
<template>
  <div>
    <div class="main">
      <div class="sidebar">
        <sidebar />
      </div>
      <div class="content">
        <tags-view />
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Sidebar from './components/Sidebar.vue'
import TagsView from './components/TagsView.vue'
export default defineComponent({
  components: {
    Sidebar,
    TagsView
  },
  setup () {
    return {}
  }
})
</script>
<style lang="scss" scoped>
  .main {
    display: flex;
    height: calc(100vh);
    .content {
      flex: 1;
      width: calc(100vw - 240px);
      padding: 10px;
      background-color: #f5f5f5;
    }
  }
</style>

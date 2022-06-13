/*
 * @Description: 文件主入口
 * @Author: dali
 * @Date: 2022-02-07 16:27:57
 * @LastEditors: dali
 * @LastEditTime: 2022-05-13 09:55:17
 */
import { createApp } from 'vue'

import router from './router'
import App from './App.vue'
import 'virtual:windi.css'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import store from './store'

import './config/interceptor'
import './permission'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn
})
app.use(store)
app.use(router)
app.mount('#app')
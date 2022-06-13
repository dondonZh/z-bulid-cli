/*
 * @Description: 文件内容
 * @Author: dali
 * @Date: 2022-02-08 15:57:17
 * @LastEditors: dali
 * @LastEditTime: 2022-04-07 14:02:22
 */
import axios from 'axios'
import { LocationQuery } from 'vue-router'
import router from './router'
function setStorageFromRouteQuery (query: LocationQuery) {
  const { token, corpId, orgId } = query as Record<string, string>
  if (token) {
    localStorage.setItem('token', token)
    axios.defaults.headers.common.Token = token
  }
  if (corpId) {
    localStorage.setItem('corpId', corpId)
  }
  if (orgId) {
    localStorage.setItem('orgId', orgId)
  }
}

router.beforeEach(async (to, from, next) => {
  setStorageFromRouteQuery(to.query)
  // 页面刷新时获取企业信息
 
  next()
})

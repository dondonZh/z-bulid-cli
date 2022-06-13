/*
 * @Description: 文件内容
 * @Author: dali
 * @Date: 2022-02-07 16:42:41
 * @LastEditors: dali
 * @LastEditTime: 2022-05-13 09:29:09
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import Expense from '@/views/BillManager/expense/Index.vue'
import TicketLess from '@/views/BillManager/ticketless/Index.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: (_) => {
      return { path: '/home' }
    },
  },
  {
    path: '/home',
    name: 'Layout',
    component: Layout,
    redirect: '/home/expense-apply',
    children: [
      {
        path: 'expense-apply',
        name: 'ExpenseApply',
        meta:{title:'报销申请'},
        component: Expense
      },
      {
        path: 'expense-pay-tic',
        name: 'ExpensePayTic',
        meta:{title:'无票支付申请'},
        component: TicketLess
      },
    ]
  },
  {
    path: '/:currentPath(.*)*', // 路由未匹配到，进入这个
    redirect: (_) => {
      return { path: '/404' }
    },
  },
]
const router = createRouter({
  history: createWebHistory(''),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      el: '#app',
      top: 0,
      behavior: 'smooth',
    }
  },
})
export default router

/*
 * @Description: ts全局声明
 * @Author: dali
 * @Date: 2022-02-07 16:27:57
 * @LastEditors: dali
 * @LastEditTime: 2022-03-07 13:13:23
 */
/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
 
declare module 'jquery' {

}

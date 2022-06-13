/*
 * @Description: 文件内容
 * @Author: dali
 * @Date: 2022-05-12 17:24:52
 * @LastEditors: dali
 * @LastEditTime: 2022-05-13 11:25:32
 */
import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
     // accepts globs and file paths relative to project root
    include: [
      'index.html',
      'src/**/*.{vue,html,jsx,tsx}',
    ],
    exclude: [
      'node_modules/**/*',
      '.git/**/*',
    ],
  },
})
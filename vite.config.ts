/*
 * @Description: 文件内容
 * @Author: dali
 * @Date: 2022-02-07 16:27:57
 * @LastEditors: dali
 * @LastEditTime: 2022-05-19 14:05:10
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
	server: {
    proxy: {
      "/service": {
        target: "http://test.gerlun.com",
        changeOrigin: true,
      },
    },
		hmr:true
  },
  plugins: [
    vue(),
		WindiCSS(),
  ],
  resolve: {
		alias: {
			'@': '/src'
		}
	},
	build:{
		brotliSize: false,
		chunkSizeWarningLimit: 2000,
	},
	css: {
		//css预处理
		preprocessorOptions: {
			scss: {
				additionalData: '@import "@/assets/css/main.scss";',		
			}
		}
	}
})

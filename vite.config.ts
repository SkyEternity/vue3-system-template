import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite'
import path from 'path'

import {
	ElementPlusResolver,
	AntDesignVueResolver,
	VantResolver,
	HeadlessUiResolver,
	ElementUiResolver
} from 'unplugin-vue-components/resolvers'
export default defineConfig({
	base: './', //打包路径
	plugins: [
		vue(),
		VueSetupExtend(),
		AutoImport({
			imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/head', '@vueuse/core'],
			resolvers: [ElementPlusResolver()],
			dts: 'src/auto-import.d.ts'
		}),
		Components({
			// ui库解析器，也可以自定义
			resolvers: [
				ElementPlusResolver(),
				AntDesignVueResolver(),
				VantResolver(),
				HeadlessUiResolver(),
				ElementUiResolver()
			],
			extensions: ['vue'],
			// 配置文件生成位置
			dts: 'src/components.d.ts'

		})
	],
	optimizeDeps: {
		include: ['schart.js']
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@components': path.resolve(__dirname, './src/components'),
			'@store': path.resolve(__dirname, './src/store/modules'),
			'@api': path.resolve(__dirname, './src/api')
		}
	},
	server: {
		port: 5050, // 服务端口号
		open: false, // 服务启动时是否自动打开浏览器
		cors: true, // 允许跨域
		proxy: {
			'/api': {
				target: 'http://10.10.20.53:88/',
				changeOrigin: true
			}
		}
	}
});
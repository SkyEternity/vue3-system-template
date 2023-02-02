{
  "name": "zqvue",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc --noEmit && vite build",
    "serve": "vite preview"
  },
  "dependencies": {
    "@element-plus/icons-vue": "^2.0.10",
    "axios": "^1.3.1",
    "element-plus": "^2.2.28",
    "pinia": "^2.0.30",
    "vue": "^3.2.37",
    "vue-cropperjs": "^5.0.0",
    "vue-router": "^4.1.6",
    "vue-schart": "^2.0.0",
    "wangeditor": "^4.7.15"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^3.0.0",
    "@vue/compiler-sfc": "^3.1.2",
    "typescript": "^4.9.5",
    "vite": "^4.0.4",
    "unplugin-auto-import": "^0.11.2",    //可以自动导入vue以及第三方组建的引入
    "unplugin-vue-components": "^0.23.0",  //自动导入自定义组建但是需要放到components里面，当项目大了就不合适
    "vite-plugin-vue-setup-extend": "^0.4.0",  //可以直接在script上面设置name属性，vue3是不允许的
    "vue-tsc": "^0.38.4"   //打包时类型检查工具
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not dead"
  ]
}

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import { permissStore } from '@/store/modules/permiss';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import 'element-plus/dist/index.css'
import '@/assets/css/common.scss';
import '@/assets/css/globle.scss';


const app = createApp(App);
app.use(createPinia()).use(router).use(ElementPlus, { locale: zhCn })
// 注册elementplus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
// 自定义权限指令
const _permissStore = permissStore();
app.directive('permiss', {
    mounted(el, binding) {
        if (!_permissStore.key.includes(String(binding.value))) {
            el['hidden'] = true;
        }
    },
});

app.mount('#app');

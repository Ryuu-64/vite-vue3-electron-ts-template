import {createApp} from 'vue';
import {createPinia} from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import App from './App.vue';
import router from './router/index';
import {afterAppInitialize} from "./events/events";
import {createI18n} from "vue-i18n";
import en from './languages/en';
import zh from './languages/zh';

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    messages: {
        'en': en,
        'zh': zh
    }
});

createApp(App)
    .use(createPinia())
    .use(router)
    .use(i18n)
    .use(ElementPlus)
    .mount('#app');

afterAppInitialize.invoke();


require('./bootstrap');

import Vue from 'vue';
import router from './router';
import store from './store/index';
import ElementUI from 'element-ui';
import lang from 'element-ui/lib/locale/lang/ja';
import locale from 'element-ui/lib/locale';

locale.use(lang);
Vue.use(ElementUI, { locale });

Vue.component('app', require('./components/App.vue'));

const app = new Vue({
    store,
    router
}).$mount('#app');
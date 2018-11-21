require('./bootstrap');

import Vue from 'vue';
import router from './router';
import store from './store/index';
import ElementUI from 'element-ui';
import lang from 'element-ui/lib/locale/lang/ja';
import locale from 'element-ui/lib/locale';

Vue.config.devtools = true;
locale.use(lang);
Vue.use(ElementUI, { locale });
Vue.component('app', require('./components/App.vue'));

// ローカルストレージにtokenがある場合読み込む
if (sessionStorage.getItem('TodoApp')) {
    const strageData = JSON.parse(sessionStorage.getItem('TodoApp'));
    if (strageData.auth.token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + strageData.auth.token;
    }
}

const app = new Vue({
    store,
    router
}).$mount('#app');
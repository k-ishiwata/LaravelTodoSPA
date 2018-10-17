import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store/index';

import Home from './components/pages/Home';
import Login from './components/pages/Login';
import User from './components/pages/User';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/user', component: User, meta: { requiresAuth: true } }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    // ページを切り替えたらアラート削除
    store.commit('alert/setAlert', { 'message': '' });

    if (to.matched.some(record => record.meta.requiresAuth)) {
        // ログインしていなかったらログインページにリダイレクト
        if (store.getters['auth/isLogin'] === false) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
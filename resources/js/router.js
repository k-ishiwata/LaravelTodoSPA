import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store/index';

import Dashboard from './components/pages/Dashboard';
import Login from './components/pages/Login';
import User from './components/pages/User';
import Task from './components/pages/Task';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Dashboard },
    { path: '/tasks', component: Task },
    { path: '/user', component: User },
    { path: '/login', component: Login, meta: { allowAuth: true } }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    // allowAuth はログイン不要
    if (to.matched.some(record => record.meta.allowAuth)) {
        next();
    } else {
        if (store.getters['auth/isLogin'] === false) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            });
        } else {
            next();
        }
    }
});

export default router;
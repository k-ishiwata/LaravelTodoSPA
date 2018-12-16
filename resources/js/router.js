import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store/index';

import Dashboard from './components/pages/Dashboard';
import Login from './components/pages/Login';
import User from './components/pages/user/User';
import Task from './components/pages/task/Task';
import Project from './components/pages/project/List';
import Me from './components/pages/Me';

Vue.use(VueRouter);

const routes = [
    { path: '/', name: 'dashboard', component: Dashboard },
    { path: '/users', name: 'users', component: User },
    { path: '/tasks', name: 'tasks', component: Task },
    { path: '/projects', name: 'projects', component: Project },
    { path: '/me', name: 'me', component: Me },
    { path: '/login', name: 'login', component: Login, meta: { allowAuth: true } }
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
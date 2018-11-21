import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
import auth from "./modules/auth";
import task from "./modules/task";
import user from "./modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth, task, user
    },
    strict: true,
    plugins: [createPersistedState({
        key: 'TodoApp',
        paths: ['auth.token'],
        storage: window.sessionStorage
    })]
});
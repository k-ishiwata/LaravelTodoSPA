import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
import auth from "./modules/auth";
import task from "./modules/task";
import user from "./modules/user";
import project from "./modules/project";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth, task, user, project
    },
    strict: true,
    plugins: [createPersistedState({
        key: 'TodoApp',
        paths: ['auth.token'],
        storage: window.sessionStorage
    })]
});
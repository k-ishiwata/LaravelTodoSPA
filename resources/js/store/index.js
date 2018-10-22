import Vue from 'vue';
import Vuex from 'vuex';

import auth from "./modules/auth";
import alert from "./modules/alert";
import task from "./modules/task";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth, alert, task
    },
    strict: true
});
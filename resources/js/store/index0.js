import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: '',
        count: 0,
        isLogin: false,
        alert: ''
    },
    mutations: {
        setAlert (state, payload) {
            state.alert = payload.alert;
        },
        // setLogin (state, payload) {
        //     state.isLogin = payload.login;
        // },
        login (state) {
            state.isLogin = true;
            state.alert = 'ログインしました。';
        },
        logout (state) {
            state.isLogin = false;
            state.alert = 'ログアウトしました。';
        },
        increment (state, payload) {
            state.count += payload.amount1;
        }
    },
    actions: {
        login ({ commit }, payload) {
            axios.post('/api/login', {
                email: payload.email,
                password: payload.password
            }).then(res => {
                const token = res.data.access_token;
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

                commit('login');

            }).catch(error => {
                commit('setAlert', { 'alert': 'ログインに失敗しました。' });
            });

            // commit('login');
        },
        async logout ({ commit }) {
            // try {
            //     await axios.post('/api/logout').then(res => {
            //         commit('logout');
            //     });
            // } catch (e) {
            //     console.log("失敗");
            //     commit('setAlert', { 'alert': 'ログアウトに失敗しました。' });
            // }


            axios.post('/api/logout').then(res => {
                axios.defaults.headers.common['Authorization'] = '';
                commit('logout');
            }).catch(error => {
                commit('setAlert', { 'alert': 'ログアウトに失敗しました。' });
            });


        },
        incrementAsync ({ commit}, payload) {

        },
        incrementAction (ctx) {
            ctx.commit('increment');
        }
    }
});
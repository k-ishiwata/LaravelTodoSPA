import router from '../../router';

const state = {
    token: ''
};

const mutations = {
    login (state, payload) {
        state.token = payload;
    },
    logout (state) {
        state.token = null;
    }
};

const getters = {
    isLogin (state) {
        return state.token ? true : false;
    }
};

const actions = {
    login ({ commit }, payload) {
        axios.post('/api/login', {
            email: payload.email,
            password: payload.password
        }).then(res => {
            const token = res.data.access_token;
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            commit('login', token);
            router.push({path: '/'});
            commit('alert/setAlert', { 'message': 'ログインしました。' }, { root: true });
        }).catch(error => {
            commit('alert/setAlert', { 'message': 'ログインに失敗しました。', 'type': 'danger' }, { root: true });
        });
    },
    async logout ({ commit }) {
        axios.post('/api/logout').then(res => {
            axios.defaults.headers.common['Authorization'] = '';
            commit('logout');
            router.push({path: '/'});
            commit('alert/setAlert', { 'message': 'ログアウトしました。' }, { root: true });
        }).catch(error => {
            commit('alert/setAlert', { 'message': 'ログアウトに失敗しました。' }, { root: true });
        });
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
};
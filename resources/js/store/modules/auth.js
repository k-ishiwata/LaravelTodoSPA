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
    async login ({ commit }, payload) {
        return await axios.post('/api/login', {
            login_id: payload.loginId,
            password: payload.password
        }).then(res => {
            const token = res.data.access_token;
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            commit('login', token);
            return true;
        }).catch(error => {
            return error.response;
        });
    },
    async logout ({ commit }) {
        return await axios.post('/api/logout').then(res => {
            axios.defaults.headers.common['Authorization'] = '';
            commit('logout');
            return true;
        }).catch(error => {
            return error.response;
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
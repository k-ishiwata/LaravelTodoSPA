import router from '../../router';

const state = {
    tasks: ''
};

const mutations = {
    setTasks(state, tasks) {
        state.tasks = tasks
    }
};

const getters = {
    getAll (state) {
        return state.tasks;
    }
};

const actions = {
    load ({ commit }) {
        axios.get('/api/tasks').then(res => {
            commit('setTasks', res.data);
        });
    }
    // login ({ commit }, payload) {
    //     axios.post('/api/login', {
    //         email: payload.email,
    //         password: payload.password
    //     }).then(res => {
    //         const token = res.data.access_token;
    //         axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    //
    //         commit('login', token);
    //         router.push({path: '/'});
    //         commit('alert/setAlert', { 'message': 'ログインしました。' }, { root: true });
    //     }).catch(error => {
    //         commit('alert/setAlert', { 'message': 'ログインに失敗しました。', 'type': 'danger' }, { root: true });
    //     });
    // }
};

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
};
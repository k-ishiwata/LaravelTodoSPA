const state = {
    users: []
};

const mutations = {
    setData(state, users) {
        state.users = users
    },
    update(state, {user, newUser}) {
        Object.assign(user, newUser);
    },
    delete(state, index) {
        state.users.splice(index, 1);
    },
    add(state, user) {
        state.users.push(user);
    },
    setFilterQuery(state, filterQuery) {
        state.filterQuery = {...filterQuery};
    }
};

const getters = {
    getUsers: (state) => {
        return state.users;
    },
    // セレクトボックス用のリスト
    getSingleUsers: (state) => {
        const unknownUser = [{
            id: null,
            name: '未定'
        }];
        return  unknownUser.concat(state.users);
    },
    // idで検索
    getUserById: (state) => (id) => {
        const user = state.users.find((user) => {
            return user.id === id
        });
        return user.name
    }
};

const actions = {
    async fetch ({ commit }) {
        await axios.get('/api/users').then(res => {
            commit('setData', res.data);
        });
    },
    async delete ({state, commit}, user) {
        const index = state.users.indexOf(user);
        return await axios.delete('/api/users/' + user.id)
            .then(res => {
                commit('delete', index);
                return true;
            }).catch(error => {
                return error;
            });
    },
    async store ({state, commit}, user) {
        return await axios.post('/api/users/', user)
            .then(res => {
                commit('add', res.data);
                return true;
            }).catch(error => {
                return error;
            });
    },
    async update ({state, commit}, newUser) {
        // stateからマッチしたuserを取り出す
        const user = state.users.find((o) => {
            return o.id === newUser.id;
        });

        if (!user) {
            return false;
        }

        return await axios.patch('/api/users/' + newUser.id, newUser)
            .then(res => {
                commit('update', {user, newUser});
                return true;
            }).catch(error => {
                return error;
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
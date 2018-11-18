const state = {
    users: [
        {
            id: 0,
            name: '未定'
        },
        {
            id: 1,
            name: '山田 太郎'
        },
        {
            id: 2,
            name: '田中 一郎'
        }
    ]
};

const mutations = {
};

const getters = {
    getUsers: (state) => {
        return state.users;
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
};

export default {
    namespaced: true,
    state,
    // mutations,
    getters,
    // actions
};
import dayjs from 'dayjs';

const state = {
    tasks: [],
    filterQuery: {}
};

const mutations = {
    setData(state, tasks) {
        state.tasks = tasks
    },
    update(state, {task, newTask}) {
        Object.assign(task, newTask);
    },
    delete(state, index) {
        state.tasks.splice(index, 1);
    },
    add(state, task) {
        state.tasks.push(task);
    },
    // 全てのタスク削除
    allDelete(state) {
        state.tasks = [];
    },
    setFilterQuery(state, filterQuery) {
        state.filterQuery = {...filterQuery};
    }
};

const getters = {
    getTasks (state) {
        return state.tasks;
    },
    filteredTasks (state) {
        let data = state.tasks;

        // タイトルの検索
        if (state.filterQuery.title !== "") {
            data = data.filter(function (row) {
                return row['title'].indexOf(state.filterQuery.title) !== -1;
            });
        }
        // 状態の検索
        if (state.filterQuery.state_id !== "") {
            data = data.filter(function (row) {
                return row['state_id'] === state.filterQuery.state_id;
            });
        }
        // 担当の検索
        if (state.filterQuery.user_id !== "") {
            data = data.filter(function (row) {
                return row['user_id'] === state.filterQuery.user_id
            });
        }
        // プロジェクトの検索
        if (state.filterQuery.project_id !== "") {
            data = data.filter(function (row) {
                return row['project_id'] === state.filterQuery.project_id
            });
        }
        // 作成日で検索
        if (state.filterQuery.created_at !== null) {
            const queryData = dayjs(state.filterQuery.created_at).format('YYYY-MM-DD');
            data = data.filter(function (row) {
                return queryData === dayjs(row.created_at).format('YYYY-MM-DD');
            });
        }
        return data;
    }
};

const actions = {
    async fetch ({ commit }) {
        await axios.get('/api/tasks').then(res => {
            commit('setData', res.data);
        });
    },
    async delete ({state, commit}, task) {
        const index = state.tasks.indexOf(task);
        return await axios.delete('/api/tasks/' + task.id)
            .then(res => {
                commit('delete', index);
                return true;
            }).catch(error => {
                return error;
            });
    },
    async store ({state, commit}, task) {
        return await axios.post('/api/tasks/', task)
            .then(res => {
                commit('add', res.data);
                return true;
            }).catch(error => {
                return error;
            });
    },
    async update ({state, commit}, newTask) {
        // stateからマッチしたtaskを取り出す
        const task = state.tasks.find((o) => {
            return o.id === newTask.id;
        });

        if (!task) {
            return false;
        }

        return await axios.patch('/api/tasks/' + newTask.id, newTask)
            .then(res => {
                commit('update', {task, newTask});
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
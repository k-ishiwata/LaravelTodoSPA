const state = {
    tasks: []
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
    }
};

const getters = {
    getTasks (state) {
        return state.tasks;
    }
    // findTaskById: state => id => find(state.tasks, o => o.id === id)
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
const state = {
    projects: []
};

const mutations = {
    setData(state, projects) {
        state.projects = projects
    },
    update(state, {project, newUser}) {
        Object.assign(project, newUser);
    },
    delete(state, index) {
        state.projects.splice(index, 1);
    },
    add(state, project) {
        state.projects.push(project);
    },
    setFilterQuery(state, filterQuery) {
        state.filterQuery = {...filterQuery};
    }
};

const getters = {
    getProjects: (state) => {
        return state.projects;
    },
    // idで検索
    getProjectById: (state) => (id) => {
        const project = state.projects.find((project) => {
            return project.id === id
        });
        return project.title;
    }
};

const actions = {
    async fetch ({ commit }) {
        await axios.get('/api/projects').then(res => {
            commit('setData', res.data);
        });
    },
    async delete ({state, commit}, project) {
        const index = state.projects.indexOf(project);
        return await axios.delete('/api/projects/' + project.id)
            .then(res => {
                commit('delete', index);
                return true;
            }).catch(error => {
                return error;
            });
    },
    async store ({state, commit}, project) {
        return await axios.post('/api/projects/', project)
            .then(res => {
                commit('add', res.data);
                return true;
            }).catch(error => {
                return error;
            });
    },
    async update ({state, commit}, newUser) {
        // stateからマッチしたprojectを取り出す
        const project = state.projects.find((o) => {
            return o.id === newUser.id;
        });

        if (!project) {
            return false;
        }

        return await axios.patch('/api/projects/' + newUser.id, newUser)
            .then(res => {
                commit('update', {project, newUser});
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
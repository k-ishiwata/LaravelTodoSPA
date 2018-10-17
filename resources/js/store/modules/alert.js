const state = {
    message: '',    // 表示する文字列
    type: 'success' // クラス名に使用
};

const mutations = {
    setAlert (state, {message, type}) {
        state.message = message;
        state.type = type || 'success';
    }
};

export default {
    namespaced: true,
    state,
    mutations
};
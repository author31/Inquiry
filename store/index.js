export const state = () => {
    return {
        tableInfo: []
    }
}

export const getters = {
    getTableInfo: (state) => {
        return state.tableInfo
    },
}

export const mutations = {
    setTableInfo(state, info) {
        state.tableInfo = info
    },
}

export const actions = {

}
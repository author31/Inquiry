export const state = () => {
    return {
        table: ''
    }
}

export const getters = {
    getTableInfo: (state) => {
        return {
            table:  state.table
        }
    },
}

export const mutations = {
    setTableInfo(state, info) {
        state.table = info.table
    },
}

export const actions = {
    nuxtServerInit ({commit, rootGetters}) {
        const info = rootGetters.getUserInfo
        console.log(info)
    }
}
import Cookies from 'js-cookie'

export const state = () => {
    return {
        uid: '',
        stdId: '',
        username: '',
        department: '',
        grade: '',
        authenticated: false,
        admin: false,
    }
}

export const getters = {
    getUserInfo: (state) => {
        return {
            uid: state.uid,
            stdId: state.stdId,
            username: state.username,
            department: state.department,
            grade: state.grade,
            authenticated: state.authenticated,
            admin: state.admin,
        }
    },

    getUid: (state) => {
        return {
            uid: state.uid
        }
    },
}

export const mutations = {
    setUserInfo(state, info) {
        state.uid = info.uid,
        state.stdId = info.stdId
        state.username = info.username,
        state.department = info.department,
        state.grade = info.grade,
        state.authenticated = info.authenticated,
        state.admin = info.admin
    },
    setUid(state, uid) {
        state.uid = uid
    }

}

export const actions = {
    async login({commit}) {
        const provider = new this.$fireModule.auth.GoogleAuthProvider()
        provider.setCustomParameters({hd: "au.edu.tw"})
        this.$fireModule.auth().signInWithPopup(provider)
        .then((res) => {
            return res.user.getIdToken()
        })
        .then((idToken) => {
            this.$axios.post('/api/login',  {idToken: idToken})
            .then((res) => {
                if(res.data.username === "") {
                    commit('setUid', res.data.uid)
                    this.$router.push('/signup')
                } else {
                    if(res.data.admin == true) {
                        commit('setUserInfo', res.data)
                        this.$router.push('/admin')
                    } else {
                        commit('setUserInfo', res.data)
                        this.$router.push('/dashboard')
                    }
                }
                
            })
            .catch((err) => console.log(err.response.data))
        })
    },
    logout({commit}) {
        this.$fire.auth.signOut().then(() => {
            commit("setUserInfo", {uid: "", authenticated: false, admin: ''})
            Cookies.remove('vuex')
            this.$router.push('/login')
        })
    },
    signUp({commit, getters}, payload) {
        const userInfo = {
            uid: getters.getUid.uid,
            username: payload.username,
            department: payload.department,
            grade: payload.grade,
            gender: payload.gender
        }
        this.$axios.post('/api/signup', {userInfo: userInfo})
        .then((res) => {
            commit('setUserInfo', res.data)
            alert("建立成功")
            this.$router.push("/login")
        })
        .catch((err) => {
            alert("發生錯誤，請稍後重試")
            this.$router.push("/signup")
        })
    },
}
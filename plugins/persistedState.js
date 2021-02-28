import createPersistedState from 'vuex-persistedstate';
import * as Cookies from 'js-cookie';
import cookie from 'cookie';

export default ({ store, req }) => {
    createPersistedState({
        storage: {
            getItem: (key) => {
                // See https://nuxtjs.org/guide/plugins/#using-process-flags
                if (process.server) {
                    const parsedCookies = cookie.parse(req.headers.cookie);
                    return parsedCookies[key];
                } else {
                    return Cookies.get(key);
                }
            },
            // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
            setItem: (key, value) =>{
                const token = JSON.parse(value).token
                Cookies.set(key, value, { expires: 1, secure: false })
            },
            removeItem: key => Cookies.remove(key),
            reducer: state => {
                console.log(state)
            }
        },
    

    })(store);
};
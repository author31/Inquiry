export default function({store, redirect, route}) {
    store.state.token.authenticated == true && store.state.token.admin == false && route.name == 'login' ? redirect('/dashboard') : '' 
    store.state.token.authenticated == false && route.name == 'dashboard' ? redirect('/login') : ''
    store.state.token.admin == true && route.name == 'dashboard' ? redirect("/admin") : ''
    store.state.token.admin == false && route.name == 'admin' ? redirect("/dashboard") : ''
    route.name == 'index' ? redirect("/dashboard") : ''
}
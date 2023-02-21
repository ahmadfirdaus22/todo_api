import http from '../plugin/common-http'
import task from './modules/task';
import category from './modules/category';

import {createStore} from 'vuex'
const store = createStore({
    state(){
        return{
            auth: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null,
            token : localStorage.getItem('token') || null,
            errors : [],
            loading : false
        }
    },
    getters :{ 
        isLogin(state){
            return state.token!= null;
        }
    },
    actions : {
        async signin({commit}, payload){
            await http.post('/login', payload).then(response=>{
                const data = response?.data
                commit('SET_AUTH', data?.user ? JSON.stringify(data?.user) : null)
                commit('SET_TOKEN', data?.access_token)
            })
        },

        async signout({commit}, payload){
            await http.post('/logout', payload).then(response => {
                if(response.status == 204){
                    commit('SET_AUTH', null)
                    commit('SET_TOKEN', null)
                }
            })
        },
        setError({commit}, payload){
            commit('SET_ERROR', payload)
        },
        setLoading({commit}, payload){
            commit('SET_LOADING', payload)
        },
    },
    mutations : {
        SET_AUTH (state, auth){
            auth ? localStorage.setItem('auth', auth) : localStorage.removeItem('auth')
            state.auth = auth
        },
        SET_TOKEN (state, token){
            token ? localStorage.setItem('token', token) : localStorage.removeItem('token')
            state.token = token
        },
        SET_ERROR(state, errors){
            state.errors = errors
        },
        SET_LOADING(state, loading){
            state.loading = loading
        }
    },
    modules : {
        category : category,
        task : task
    },
})

export default store
import axios from "axios";
import store from '../store';

const http = axios.create({
    baseURL : "http://localhost:8000/api",
    headers : {
        "Content-Type" : "application/json" 
    }

});
    http.interceptors.request.use(config => {
        config.headers["Authorization"] = "Bearer" + store.state.token;
        store.dispatch('setLoading', true)
        return config
    })

    http.interceptors.response.use(response => {
        store.dispatch('setLoading', false)
        return response
    },
    error => {
        store.dispatch('setLoading',  false)
        console.log(error.response)
        if(error.response.status == 422){
            store.dispatch('setError', error.response.data.errors)
        }
        if(error.response.status == 401){
            store.dispatch('setError', {password : error.response.data.message})
        }
    });

export default http


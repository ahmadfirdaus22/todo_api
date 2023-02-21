import { createRouter, createWebHistory } from "vue-router";
import Guest from '../components/layout/GuestLayout.vue';
import Auth from '../components/layout/AuthLayout.vue';
import auth from '../store'


const routes = [
    {
        component : Auth,
        path : '',
        meta : {requiresAuth:true},
        children : [
            {
                path: '/home',
                name: 'dashboard',
                component: () => import('../view/dashboard/index.vue')
            },
            {
                path : '/category',
                name : 'category.index',
                component : () => import('../view/category/index.vue')
            },
            {
                path : '/task',
                name : 'task.index',
                component : () => import('../view/task/index.vue')
            },
            {
                path : '/task/create',
                name : 'task.create',
                component : () => import('../view/task/create.vue'),
                alias : '/task/:id/edit'
            }
        ]
    },
    {
        component : Guest,
        path : '',
        children : [
            {
                path : '/signin',
                name : 'auth.signin',
                component : () => import('../view/auth/signin.vue')
            },
        ]
    }
]

  
const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from) => {
    if(to.meta.requiresAuth && !auth.getters.isLogin){
        return {
            path : '/signin'
        }
    }
    if(!to.meta.requiresAuth && auth.getters.isLogin){
        return {
            path : '/'
        }
    }
})
export default router
import http from "../../plugin/common-http"

const task = {
    namespaced : true, 
    state() {
        return {
            tasks : [],
            oneTask : {}
        }
    },
    actions :{
        async getTasks({commit}, task){
            const { data } = await http.get('/task')
            commit('SET_TASKS', data.data)
        },
        async getOneTask({commit}, task){
            const {data} = await http.get('/task/'+task+'/edit')

            commit('SET_ONE_TASK', data.data)
        },
        async postTask({commit}, task){
            for(var i =0 ; i<task.categories.length; i++){
                if(!('id' in task.categories[i])){
                    await http.post('/category', task.categories[i])
                }
            }
            await http.post('/task', task)
    
            commit('ADD_TASK' , task)
        },
        async updateTask({commit}, task){
            await http.patch('/task/'+task.id, task)

            commit('UPDATE_TASK', task)
        },
        async deleteTask({commit}, task){
            await http.delete('/task/'+ task.id)

            commit('DELETE_TASK', task)
        },
    },
    mutations : {
        SET_TASKS(state, tasks){

            state.tasks = tasks
        },
        SET_ONE_TASK(state, tasks){
            state.oneTask = tasks
        },
        ADD_TASK(state, tasks){
            state.tasks.push(tasks)
        },
        UPDATE_TASK(state, task){
            const idx = state.tasks.findIndex(item=>item.id==task.id)

            state.tasks[idx] = task
        },
        DELETE_TASK(state, task){
            const idx = state.tasks.findIndex(item=>item.id==task.id)
            state.tasks.splice(idx, 1)
        }
    }
}

export default task;
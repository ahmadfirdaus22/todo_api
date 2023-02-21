import http from "../../plugin/common-http"

const category = {
    namespaced : true, 
    state() {
        return {
            categories : [],
            oneCategory : {}
        }
    },
    actions :{
        async getCategories({commit}, category){
            const { data } = await http.get('/category')

            commit('SET_CATEGORIES', data?.data)
        },
        async getOneCategory({commit}, category){
            const {data} = await http.get('/category/'+category.id)

            commit('SET_ONE_CATEGORY', data.data)
        },
        async postCategory({commit}, category){
            await http.post('/category', category)

            commit('ADD_CATEGORY', category)
        },
        async updateCategory({commit}, category){
           await http.patch('/category/'+category.id, category)

            commit('UPDATE_CATEGORY', category)
        },
        async deleteCategory({commit}, category){
            await http.delete('/category/'+ category.id)

            commit('DELETE_CATEGORY', category)
        },
    },
    mutations : {
        SET_CATEGORIES(state, categories){
            state.categories = categories
        },
        SET_ONE_CATEGORY(state, categories){
            state.oneCategory = categories
        },
        ADD_CATEGORY(state, categories){
            state.categories.push(categories)
        },
        UPDATE_CATEGORY(state, category){
            const idx = state.categories.findIndex(item=>item.id==category.id)

            state.categories[idx] = category
        },
        DELETE_CATEGORY(state, category){
            const idx = state.categories.findIndex(item=>item.id==category.id)
            state.categories.splice(idx, 1)
        }
    }
}

export default category;
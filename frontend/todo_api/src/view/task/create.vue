<template>
    <div class="container" style="margin-top: 10px;">
        <div class="card">
            <div class="card-header text-center">
                <h3> {{ head }} Task </h3>
            </div>
            <form @submit.prevent="handleTask">
                <div class="card-body">
                    <label for="">Title</label>
                    <input type="text" name="title" v-model="form.title" class="form-control">
                    <br>
                    <label for="">Due Date</label>
                    <input type="date" name="due_date" class="form-control" v-model="form.due_date">
                    <br>
                    <label for="">Description</label>
                    <textarea name="description" v-model="form.description" class="form-control" style="resize: none;"> </textarea>
                    <br>
                    <label for="">Categories</label>
                    <vSelect multiple v-model="form.categories" @change="filter" taggable push-tags="true" label="name" :options="categories"></vSelect>
                    <br>
                    <div class="text-end">
                        <button class="btn btn-primary" >Submit</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import vSelect from "vue-select";


    export default{
        components :{vSelect},
        data () {
            return {
                head : 'New', 
                is_add: true,
                form: {
                    id : "",
                    title: "",
                    description : "",
                    due_date : "",
                    completed : 0,
                    categories : null
                    
                },
            }
        },
        computed: {
        ...mapState("category", ["categories"]),
        ...mapState("task", ["oneTask"])
        },
        created() {
    
        },
        mounted() {
            this.getCategories();
            if(this.$route.params.id != null){
                this.is_add = false;
                this.head = 'Edit';
                this.addData();
            }else if(this.$route.params.id == null){
                this.is_add = true;
                this.head = 'New';
                this.form = {
                    id : "",
                    title: "",
                    description : "",
                    due_date : "",
                    completed : 0,
                    categories : null         
                }
            }
        },
        methods : {
            ...mapActions('task', ['postTask', 'getOneTask', 'updateTask']),
            ...mapActions('category', ['getCategories']),
            handleTask(){
                if(this.is_add){
                    this.postTask(this.form)
                    this.form = {
                        title: "",
                        description : "",
                        due_date : "",
                        completed : 0,
                        categories : null       
                    }
                }else{
                    this.updateTask(this.form)
                    this.form = {
                        id : "",
                        title: "",
                        description : "",
                        due_date : "",
                        completed : 0,
                        categories : null       
                    }
                }
                // console.log(this.$router.push('/task'))
                this.$router.push('/task')
            },
            filter(){
                // console.log(this.form.categories)
                console.log(this.oneTask)
            },
            async addData(){
                await this.getOneTask(this.$route.params.id)
                this.form = {
                    id : this.oneTask[0]?.id,
                    title: this.oneTask[0]?.title,
                    description : this.oneTask[0]?.description,
                    due_date : this.oneTask[0]?.due_date,
                    completed : this.oneTask[0]?.completed,
                    categories : this.oneTask[0]?.categories         
                }
                
            }
        }
    }
    
</script>

<template>
      <div class="card" style="margin-top: 10px;" >
        <div class="card-header d-flex justify-content-between">
            <div>
                <h5>{{ task?.title }}</h5>
            </div>
            <div>
                <router-link class="btn btn-sm btn-info" :to="'/task/'+task.id+'/edit'"><i class="fa-solid fa-pen-to-square"></i></router-link>&nbsp;
                <button class="btn btn-sm btn-danger" @click="handleDelete"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
        <div class="card-body" style="cursor: pointer; " @click="$router.push(`/task/${task.id}`)">
            <dd >
                <dt> 
                  <div style="display: flex;">Category:&emsp13;<p v-for="(category) in task.categories">{{ category.name }},&emsp;</p></div>
                    Deadline: {{ task?.due_date }} 
                </dt>
                <dt>
                    {{ task?.description }}
                </dt>
                <dt>
                  <br>
                    <button v-if="task.completed == 1" class="btn btn-success">Completed</button>
                    <button v-else-if="task.completed == 0" class="btn btn-danger">Not Completed</button>
                </dt>
            </dd>
        </div>
    </div>
  </template>
  
  <script>
  import { mapActions } from "vuex";
  
  export default {
    props: ["task"],
    methods: {
      ...mapActions("task", ["deleteTask"]),
      handleDelete() {
        if (!confirm("Are you sure?")) {
          return;
        }
        this.deleteTask(this.task);
      },
    },
  };
  </script>
  
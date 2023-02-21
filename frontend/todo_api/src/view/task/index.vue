<template>
    <div class="container" style="margin-top: 10px">
      <div style=" 
          padding: 10px;
          background-color: white;
          border-radius: 10px;
          justify-content: space-between;
          display: flex;
          ">
        <h3>
        Data Task
        </h3>
      <router-link to="/task/create" style="padding-left: 20px; padding-right: 20px;"  class="btn btn-primary">ADD</router-link>
    </div>
      <div style="margin-top: 10px">
        <TaskItem
          v-for="(task, idx) in tasks"
          :task="task"
          :key="idx"
          @edit="handleEdit"
        ></TaskItem>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState, mapActions } from "vuex";
  import Forminput from "../../components/Forminput.vue";
  import TaskItem from "../../components/TaskItem.vue";
  
  export default {
    components: {  Forminput, TaskItem },

    computed: {
      ...mapState("task", ["tasks"]),
    },
    mounted() {
      this.getTasks();
    },
    methods: {
      ...mapActions("task", [
        "getTasks",
      ]),
      handleEdit(task) {
        this.form = {
            id : task.id,
            title: task.title,
            description : task.description,
            due_date : task.due_date,
            completed : task.completed
        }
      },
    },
  };
  </script>
  
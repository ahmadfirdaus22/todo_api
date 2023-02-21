<template>
  <div class="col">
    <div class="card">
      <div class="card-body">  
        <h5 style="text-align: center">{{ category.name }}</h5>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["category"],
  methods: {
    ...mapActions("category", ["deleteCategory"]),
    handleDelete() {
      if (!confirm("Are you sure?")) {
        return;
      }
      this.deleteCategory(this.category);
    },
  },
};
</script>

<script>
export default {
  props: [
    "label",
    "placeholder",
    "type",
    "name",
    "id",
    "class",
    "value",
    "required",
    "errors",
  ],
  data() {
    return {
        data : this.value
    };
  },
};
</script>

<template>
  <div class="py-2">
    <label for="">{{ label }}</label>
    <input
     v-model="data"
    @input="$emit('data', data)"
      :type="type"
      :name="name"
      :id="id"
      class="form-control"
      :class="errors? 'is-invalid' : ''"
      :required="required"
    />
    <div class="invalid-feedback" v-if="errors">
        {{ errors }} 
    </div>
  </div>
</template>

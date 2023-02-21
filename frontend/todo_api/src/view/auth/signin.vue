<template>
  <div
    class="container"
    style="
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 90vh;
    "
  >
    <div class="col-4 mt-5 card">
      <form @submit.prevent="submit">
        <div class="card-body">
          <h4 style="text-align: center">Welcome Back!</h4>
          <Forminput
          :errors="errors?.email"
            type="email"
            @data="
              (data) => {
                form.email = data;
              }
            "
            name="email"
            label="Email"
            :required="false"
          />
          <Forminput
            :errors="errors?.password"
            type="password"
            name="password"
            label="Password"
            :required="false"
            @data="
              (data) => {
                form.password = data;
              }
            "
          />
          <p>Did't Have any Account ? <router-link to="/register">register</router-link></p>
        </div>
        <div class="card-footer text-end">
          <button class="btn btn-primary">login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Forminput from "../../components/Forminput.vue";
import router from "../../route";
export default {
  components: { Forminput, router },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapState(["token", "errors"]),
  },
  methods: {
    ...mapActions(["signin"]),
    async submit() {
      await this.signin(this.form);
        console.log(this.token)
      if (this.token) {

        window.location.reload();
      }
    },
  },
};
</script>

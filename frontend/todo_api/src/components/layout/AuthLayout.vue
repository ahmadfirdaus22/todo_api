<template>
    <div>
      <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd;">
        <div class="container-fluid">
          <router-link class="navbar-brand" to="/">Navbar</router-link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                  <router-link class="nav-link" to="/category">Category</router-link>
              </li>
              <li class="nav-item">
                  <router-link class="nav-link" to="/task">Task</router-link>
              </li>
            </ul>
          </div>
          <li class="nav">
            <button class="btn btn-danger" @click="handleLogout">Logout</button>
          </li>
        </div>
      </nav>
    </div>
    <router-view></router-view>
  </template>
  

<script>
    import { mapActions, mapState } from 'vuex';

    export default{
        computed : {
            ...mapState(['auth'])
        },
        methods : {
            ...mapActions(['signout']),
            handleLogout(){
                if(!confirm("Are You Sure?")){
                    return
                }

                this.signout().then(()=> {
                    window.location.reload()
                })
            }
        }
    }
</script>
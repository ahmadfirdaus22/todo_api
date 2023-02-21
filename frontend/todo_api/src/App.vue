<template>
  <div>
    <div class="modal" :class="loading ? 'd-block' : ''" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered" >
        <div class="modal-content" style="width: 200px; margin: auto;">
          <div class="modal-body d-flex justify-content-center">
            <iframe src="https://giphy.com/embed/wnYB3vx9t6PXiq1ubB" width="150" height="150" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
          </div>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default{
    computed:{
      ...mapState(['loading'])
    }
}
</script>

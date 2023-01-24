<template>
  <div class="auth-layout row align-content--center overlay">
    <div class="flex xs12 pa-3 flex-center">
      <div>

        <router-link class="py-5 flex-center" to="/">
          <vuestic-logo height="64"/>
        </router-link>
        <div class="flex-center">
          <spring-spinner
            :animation-duration="2000"
            :size="40"
            :color="'#01A78D'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { SpringSpinner } from 'epic-spinners';

export default defineComponent({
    name: 'CustomLoader',
    components:{
        SpringSpinner
    },
})
</script>

<style lang="css">
    .overlay{
        position: absolute;
        z-index: 4;
        width: 100%;
        opacity: 0.5;
    }
</style>

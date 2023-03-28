<template>
  <div class="auth-layout row align-content--center">
    <div class="flex xs12 pa-3 flex-center">
      <div>
        <router-link class="py-5 flex-center" to="/">
          <vuestic-logo height="64" />
        </router-link>
        <div class="flex-center">
          <spring-spinner :animation-duration="2000" :size="40" :color="'#01A78D'" />
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import VuesticLogo from '../components/VuesticLogo.vue'
  import { SpringSpinner } from 'epic-spinners'

  export default {
    name: 'AuthLayout',
    components: { VuesticLogo, SpringSpinner },
  }
</script>

<style lang="scss">
  .auth-layout {
    min-height: 100vh;
    background-image: linear-gradient(to right, var(--va-background), var(--va-white));

    &__card {
      width: 100%;
      max-width: 600px;
    }
  }
</style>

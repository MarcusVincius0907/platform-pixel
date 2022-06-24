<template>
  <div class="auth-layout row align-content--center">
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
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { SpringSpinner } from 'epic-spinners';
export default {
  name: 'callback',
  components:{
    SpringSpinner
  },
 

  mounted(){
    console.log('callback',this.$route.fullPath);
    this.$store.commit('setUser',  this.$auth.user)
    this.$router.push({name: 'dashboard'})
  },
  
}
</script>

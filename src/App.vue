<template>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  /* setup() {
    
  }, */
  mounted(){

    if(this.$auth){
      console.log('logged user',this.$auth.user.value );
      
      console.log(' this.$auth.isAuthenticated.value', this.$auth.isAuthenticated.value);
      if(this.$auth && this.$auth.isAuthenticated.value){
        this.$store.commit('setIsAuthenticated', true)
      }else{
        this.$store.commit('setIsAuthenticated', false)
        this.$router.push({name: 'login'})
      }
    }  
    
  }
})
</script>


<style lang="scss">
@import '~@/sass/main.scss';
@import '~@/sass/output.scss';
/* #app {
  font-family: 'Source Sans Pro', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
} */

body {
  margin: 0;
  background: var(--va-background);
}
</style>

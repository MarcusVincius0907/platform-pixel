<template>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  /* setup() {
    
  }, */
  mounted(){
   /*  setTimeout(() => {
      
      console.log('app.vue',this.$auth);
      if(this.$auth && this.$auth.isAuthenticated.value){
        this.$router.push({name:'dashboard'})
        this.$store.commit('setIsAuthenticated', true)
      }else{
        this.$router.push({name:'login'})
        this.$store.commit('setIsAuthenticated', false)
      }
      
    }, 3000); */
    
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

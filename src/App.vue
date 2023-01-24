<template>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import UserService from './services/userService';

export default defineComponent({
  setup() {
    return {
      userService: ref<UserService>()
    }
  },

  async mounted(){
    
    this.userService = new UserService(this.$auth);

    if(this.$auth){
      console.log('logged user',this.$auth.user.value );

      const userExists = await this.getUserByEmail(this.$auth.user.value.email);

      if(userExists){
        this.$store.commit('setIsNewUser', true)
      }

      if(this.$auth && this.$auth.isAuthenticated.value){
        this.$store.commit('setIsAuthenticated', true)
        this.$store.commit('setUser',  this.$auth.user)
      }else{
        this.$store.commit('setIsAuthenticated', false)
        this.$router.push({name: 'login'})
      }

    }  
    
  },

  methods:{
    async getUserByEmail(email: string){
      try{
        return await this.userService?.getUserByEmail(email);
      }catch(ex){
        console.log(ex);
        return null;
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

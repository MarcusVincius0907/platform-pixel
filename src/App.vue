<template>
  <CustomLoader v-if="isLoading"/>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import UserService from './services/userService';
import CustomLoader from './components/loader/customLoader.vue'
import { MutationsType } from './store';

export default defineComponent({
  components:{
    CustomLoader
  },

  setup() {
    return {
      userService: ref<UserService>(),
    }
  },

  async mounted(){
    
    this.userService = new UserService();

    if(this.$auth && this.$auth.user.value){
      console.log('logged user',this.$auth.user.value );

      this.$store.commit(MutationsType.SET_CUSTOM_LOADER, true);
      const userExists = await this.getUserByEmail(this.$auth.user.value.email);
      this.$store.commit(MutationsType.SET_CUSTOM_LOADER, false);

      if(userExists){
        this.$store.commit(MutationsType.SET_IS_NEW_USER, true)
      }

      if(this.$auth && this.$auth.isAuthenticated.value){
        this.$store.commit(MutationsType.SET_IS_AUTHENTICATED, true)
        this.$store.commit(MutationsType.SET_USER,  this.$auth.user)
      }else{
        this.$store.commit(MutationsType.SET_IS_AUTHENTICATED, false)
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
  },

  computed:{
    isLoading(){
      return this.$store.state.customLoader;
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

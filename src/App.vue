<template>
  <CustomLoader v-if="isLoading"/>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import CustomLoader from './components/loader/customLoader.vue'
import { ActionTypes } from './store/actions';
import { MutationsType } from './store/mutations';

export default defineComponent({
  components:{
    CustomLoader
  },

  async mounted(){

    if(this.$auth && this.$auth.user.value){
      console.log('logged user',this.$auth.user.value );

      this.$store.dispatch(ActionTypes.CHECK_USER_EXISTS)

      if(this.$auth && this.$auth.isAuthenticated.value){
        this.$store.commit(MutationsType.SET_IS_AUTHENTICATED, true)
        this.$store.commit(MutationsType.SET_USER,  this.$auth.user)
      }else{
        this.$store.commit(MutationsType.SET_IS_AUTHENTICATED, false)
        this.$router.push({name: 'login'})
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

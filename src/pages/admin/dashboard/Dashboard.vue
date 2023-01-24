<template>
  <div class="dashboard">
    <FirstLogin v-if="isFirstLogin" />
    <Default v-else />
  </div>
</template>

<script>

import { defineComponent } from 'vue';
import FirstLogin from './first-login/FirstLogin.vue';
import Default from './default/Default.vue';

export default defineComponent({
  name: 'dashboard',
  components: {
    FirstLogin,
    Default
   
  },


  computed:{
    isFirstLogin(){
      return this.$store.state.isNewUser;
    }
  }
 
})
</script>


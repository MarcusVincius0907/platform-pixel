<template>
  <div class="dashboard">
    <FirstLogin v-if="true" />
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
 
})
</script>


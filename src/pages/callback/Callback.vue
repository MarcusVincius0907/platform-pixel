<template>
  <CustomLoader />
</template>

<script>
import { MutationsType } from '@/store/index';
import { CustomLoader } from '../../components/loader/customLoader.vue'
export default {
  name: 'callback',
  components:{
    CustomLoader
  },
 

  mounted(){
    console.log('callback',this.$route.fullPath);
    this.$store.commit(MutationsType.SET_USER,  this.$auth.user)
    this.$router.push({name: 'dashboard'})
  },
  
}
</script>

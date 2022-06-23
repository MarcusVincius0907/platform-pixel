<template>
  callback
</template>

<script>
export default {
  name: 'callback',
 

  mounted(){
    console.log('callback',this.$route.fullPath);
    this.$router.push({name: 'dashboard'})
  },
  
}
</script>

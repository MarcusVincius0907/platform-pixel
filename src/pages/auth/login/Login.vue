<template><div></div></template>

<script>
export default {
  name: 'login',
  async mounted(){
    if(this.$auth)
      {await this.$auth.loginWithRedirect();}
  }
}
</script>

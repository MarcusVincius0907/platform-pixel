<template><div></div></template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'logout',
    mounted() {
      this.$auth.logout()
      this.$router.push({ name: 'login' })
    },
  })
</script>

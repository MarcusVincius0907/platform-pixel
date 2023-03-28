<template>
  <CustomLoader />
</template>

<script>
  import CustomLoader from '../../components/loader/customLoader.vue'
  export default {
    name: 'callback',
    components: {
      CustomLoader,
    },

    mounted() {
      console.log('callback', this.$route.fullPath)
      this.$router.push({ name: 'dashboard' })
    },
  }
</script>

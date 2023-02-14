<template>
  <CustomLoader v-if="isLoading" />
  <router-view />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import CustomLoader from "./components/loader/customLoader.vue";
import { ActionTypes } from "./store/actions";
import { MutationsType } from "./store/mutations";
import Notification from "@/types/Notification";

export default defineComponent({
  components: {
    CustomLoader,
  },

  async mounted() {
    if (this.$auth && this.$auth.isAuthenticated.value) {
      console.log("logged user from $auth", this.$auth.user.value);
      this.$store.commit(MutationsType.SET_IS_AUTHENTICATED, true);
      this.$store.commit(MutationsType.SET_AUTH_USER, this.$auth.user);
      const user = this.$store.state.user;
      this.$store.commit(MutationsType.SET_USER, {
        ...user,
        email: this.$auth.user.value.email,
      });
      this.$store.dispatch(ActionTypes.CHECK_USER_EXISTS);
    } else {
      this.$store.commit(MutationsType.SET_IS_AUTHENTICATED, false);
      this.$router.push({ name: "login" });
    }

    this.$store.subscribe((mutation) => {
      if (mutation.type === MutationsType.SET_NOTIFICATION) {
        this.launchNotification(mutation.payload);
      }
    });
  },

  computed: {
    isLoading() {
      return this.$store.state.customLoader;
    },
  },

  methods: {
    launchNotification({ title, message, color }: Notification) {
      this.$vaToast.init({
        title,
        message,
        color,
      });
    },
  },
});
</script>

<style lang="scss">
@import "~@/sass/main.scss";
@import "~@/sass/output.scss";
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

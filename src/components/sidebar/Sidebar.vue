<template>
  <va-sidebar :width="width" :minimized="minimized" :minimized-width="minimizedWidth" :animated="animated">
    <menu-minimized v-if="minimized" :items="items" />
    <menu-accordion v-else :items="items" />
  </va-sidebar>
</template>

<script lang="ts">
  import { defineComponent, ref, withDefaults, defineProps } from 'vue'
  import NavigationRoutes from './NavigationRoutes'
  import MenuAccordion from './menu/MenuAccordion.vue'
  import MenuMinimized from './menu/MenuMinimized.vue'

  export default defineComponent({
    components: {
      MenuAccordion,
      MenuMinimized,
    },

    setup() {
      withDefaults(
        defineProps<{
          width?: string
          color?: string
          animated?: boolean
          minimized?: boolean
          minimizedWidth?: string
        }>(),
        {
          width: '16rem',
          color: 'secondary',
          animated: true,
          minimized: true,
          minimizedWidth: undefined,
        },
      )

      const items = ref([] as any[])

      return {
        items,
      }
    },

    mounted() {
      if (this.user) {
        this.updateItems(this.user)
      }
    },

    methods: {
      updateItems(accessType: string) {
        if (accessType === 'common') this.items = NavigationRoutes.routes.filter((route) => route.admin === false)
        else this.items = NavigationRoutes.routes
      },
    },

    computed: {
      user() {
        return this.$store.state.user?.accessType
      },
    },

    watch: {
      user(nValue) {
        if (nValue) {
          this.updateItems(nValue)
        }
      },
    },
  })
</script>

<style lang="scss">
  .va-sidebar {
    &__menu {
      padding: 2rem 0;
    }

    &-item {
      &__icon {
        width: 1.5rem;
        height: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
</style>

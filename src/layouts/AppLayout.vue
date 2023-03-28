<template>
  <div class="app-layout">
    <navbar />
    <div class="app-layout__content">
      <div class="app-layout__sidebar-wrapper" :class="{ minimized: isSidebarMinimized }">
        <div v-if="isFullScreenSidebar" class="d-flex justify-end">
          <va-button class="px-4 py-4" icon="md_close" preset="plain" color="dark" @click="onCloseSidebarButtonClick" />
        </div>
        <Sidebar
          :width="sidebarWidth"
          :minimized="isSidebarMinimized"
          :minimized-width="sidebarMinimizedWidth"
          :animated="!isMobile"
        />
      </div>
      <div class="app-layout__page tw-bg-gray-100">
        <div class="layout fluid va-gutter-5">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { useStore } from 'vuex'
  import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
  import { onBeforeRouteUpdate } from 'vue-router'
  import Sidebar from '../components/sidebar/Sidebar.vue'
  import Navbar from '@/components/navbar/Navbar.vue'
  import { MutationsType } from '@/store/mutations'

  export default {
    name: 'app-layout',

    components: {
      Navbar,
      Sidebar,
    },

    setup() {
      const store = useStore()
      const mobileBreakPointPX = 640
      const tabletBreakPointPX = 768

      const sidebarWidth = ref('16rem')
      const sidebarMinimizedWidth = ref(undefined)

      const isMobile = ref(false)
      const isTablet = ref(false)
      const isSidebarMinimized = computed(() => store.state.isSidebarMinimized)
      const checkIsTablet = () => window.innerWidth <= tabletBreakPointPX
      const checkIsMobile = () => window.innerWidth <= mobileBreakPointPX

      const onResize = () => {
        store.commit(MutationsType.UPDATE_SIDEBAR_COLLPASED_STATE, checkIsTablet())

        isMobile.value = checkIsMobile()
        isTablet.value = checkIsTablet()
        sidebarMinimizedWidth.value = isMobile.value ? 0 : '4rem'
        sidebarWidth.value = isTablet.value ? '100%' : '16rem'
      }

      onMounted(() => {
        window.addEventListener('resize', onResize)
      })

      onBeforeUnmount(() => {
        window.removeEventListener('resize', onResize)
      })

      onBeforeRouteUpdate(() => {
        if (checkIsTablet()) {
          // Collapse sidebar after route change for Mobile
          store.commit(MutationsType.UPDATE_SIDEBAR_COLLPASED_STATE, true)
        }
      })

      onResize()

      const isFullScreenSidebar = computed(() => isTablet.value && !isSidebarMinimized.value)

      const onCloseSidebarButtonClick = () => {
        store.commit(MutationsType.UPDATE_SIDEBAR_COLLPASED_STATE, true)
      }

      return {
        isSidebarMinimized,
        sidebarWidth,
        sidebarMinimizedWidth,
        isFullScreenSidebar,
        onCloseSidebarButtonClick,
      }
    },
  }
</script>

<style lang="scss">
  $mobileBreakPointPX: 640px;
  $tabletBreakPointPX: 768px;

  .app-layout {
    height: 100vh;
    display: flex;
    flex-direction: column;
    &__navbar {
      min-height: 4rem;
    }

    &__content {
      display: flex;
      height: calc(100vh - 4rem);
      flex: 1;

      @media screen and (max-width: $tabletBreakPointPX) {
        height: calc(100vh - 6.5rem);
      }

      .app-layout__sidebar-wrapper {
        position: relative;
        height: 100%;
        background: #ffffff;

        @media screen and (max-width: $tabletBreakPointPX) {
          &:not(.minimized) {
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0;
            z-index: 999;
          }

          .va-sidebar:not(.va-sidebar--minimized) {
            .va-sidebar__menu {
              padding: 0;
            }
          }
        }
      }
    }
    &__page {
      flex-grow: 2;
      overflow-y: scroll;
    }
  }
</style>

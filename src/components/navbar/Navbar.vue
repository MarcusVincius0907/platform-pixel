<template>
  <div class="app-layout__navbar">
    <va-navbar>
      <template v-slot:left>
        <div class="left">
          <va-icon-menu-collapsed
            @click="isSidebarMinimized = !isSidebarMinimized"
            :class="{ 'x-flip': isSidebarMinimized }"
            class="va-navbar__item"
            :color="colors.primary"
          />
          <router-link to="/">
            <vuestic-logo class="logo" />
          </router-link>
        </div>
      </template>
      <!-- <template v-slot:center>
        <span class="app-navbar__text">
          {{$t('navbar.messageUs')}}&nbsp;
          <a
            href="mailto:hello@epicmax.co"
            target="_blank"
            :style="{color: colors.primary}"
          >
            hello@epicmax.co
          </a>
          <va-button
            href="https://github.com/epicmaxco/vuestic-admin"
            color="#000000"
            class="app-navbar__github-button"
            icon="github"
            target="_blank"
          >
            {{$t('navbar.repository')}}
          </va-button>
        </span>
      </template> -->
      <template #right>
        <app-navbar-actions class="app-navbar__actions md5 lg4" :user-name="userName" />
      </template>
    </va-navbar>
  </div>
</template>

<script>
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useStore } from 'vuex'
  import { useColors } from 'vuestic-ui'
  import VuesticLogo from '../VuesticLogo.vue'
  import VaIconMenuCollapsed from '../icons/VaIconMenuCollapsed.vue'
  import AppNavbarActions from './components/AppNavbarActions.vue'
  import { MutationsType } from '../../store/mutations'

  export default {
    components: { VuesticLogo, AppNavbarActions, VaIconMenuCollapsed },
    setup() {
      const { getColors } = useColors()
      const colors = computed(() => getColors())
      const store = useStore()

      const isSidebarMinimized = computed({
        get: () => store.state.isSidebarMinimized,
        set: (value) => store.commit(MutationsType.UPDATE_SIDEBAR_COLLPASED_STATE, value),
      })

      const { t } = useI18n()

      const userName = computed(() => store.state?.auth0User?.name.split(' ')[0])
      return {
        colors,
        isSidebarMinimized,
        userName,
        t,
      }
    },
  }
</script>

<style lang="scss" scoped>
  .va-navbar {
    box-shadow: var(--va-box-shadow);
    z-index: 2;

    @media screen and (max-width: 950px) {
      .left {
        width: 100%;
      }

      .app-navbar__actions {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
    }
  }

  .left {
    display: flex;
    align-items: center;

    & > * {
      margin-right: 1.5rem;
    }

    & > *:last-child {
      margin-right: 0;
    }
  }

  .x-flip {
    transform: scaleX(-100%);
  }

  .app-navbar-center {
    display: flex;
    align-items: center;

    @media screen and (max-width: 1200px) {
      &__github-button {
        display: none;
      }
    }

    @media screen and (max-width: 950px) {
      &__text {
        display: none;
      }
    }
  }
</style>

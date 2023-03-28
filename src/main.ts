import { createApp } from 'vue'
import i18n from './i18n'
import { createVuestic } from 'vuestic-ui'
import { createGtm } from '@gtm-support/vue-gtm'

import store from './store'
import router from './router'
import vuesticGlobalConfig from './services/vuestic-ui/global-config'
import App from './App.vue'

import { Auth0Plugin } from './auth'
import { initAuth } from './auth/config'
import { Store } from 'vuex'
import { State } from './store/state'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(i18n)
app.use(createVuestic({ config: vuesticGlobalConfig }))

if (import.meta.env.VITE_APP_GTM_ENABLED) {
  app.use(
    createGtm({
      id: import.meta.env.VITE_APP_GTM_KEY,
      debug: false,
      vueRouter: router,
    }),
  )
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $auth: Auth0Plugin
    $store: Store<State>
    $vaToast: any
  }
}

app.provide('auth', app.config.globalProperties.$auth)

initAuth().then((res: any) => {
  app.use(res)
  app.mount('#app')
})

export default app

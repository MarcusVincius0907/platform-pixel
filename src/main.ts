import { VuesticPlugin } from 'vuestic-ui';
import { createApp } from 'vue'
import { createGtm } from 'vue-gtm'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuesticGlobalConfig from './services/vuestic-ui/global-config'
import { Auth0Plugin } from './auth';
import { initAuth } from './auth/config';
import { Store } from 'vuex';
import { State } from './store/state';



const i18nConfig = {
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: require('@/i18n/en.json'),
    ch: require('@/i18n/cn.json'),
    es: require('@/i18n/es.json'),
    ir: require('@/i18n/ir.json'),
    br: require('@/i18n/br.json')
  }
}

const app = createApp(App)
//app.use(store, key) -> useStore not work if we use it
app.use(store)
app.use(router)
if (process.env.VUE_APP_GTM_ENABLED === 'true') {
  const gtmConfig = {
    id: process.env.VUE_APP_GTM_KEY,
    debug: false,
    vueRouter: router,
  }
  app.use(createGtm(gtmConfig))
}
app.use(createI18n(i18nConfig))
app.use(VuesticPlugin, vuesticGlobalConfig)

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $auth: Auth0Plugin;
    $store: Store<State>;
  }
}

app.provide('auth', app.config.globalProperties.$auth);

initAuth().then((res: any) => {
  app.use(res)
  app.mount('#app')
})

export default app;





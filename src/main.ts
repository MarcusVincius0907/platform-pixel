import { VuesticPlugin } from 'vuestic-ui';
import { createApp } from 'vue'
import { createGtm } from 'vue-gtm'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuesticGlobalConfig from './services/vuestic-ui/global-config'



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

// Setup Auth0
/* import { Auth0ClientOptions } from '@auth0/auth0-spa-js' */
import { setupAuth, Auth0Plugin } from './auth'
import authConfig from '../auth_config.json'

function callbackRedirect(appState: any) {
    router.push(
        appState && appState.targetUrl
        ? appState.targetUrl
        : '/'
    );
}


// SETUP AUTH URL
authConfig.redirect_uri = `http://localhost:8080/callback`

// switch(import.meta.env.MODE)
// {
//   case 'development': default: authConfig.redirect_uri = 'http://localhost:3000/callback'; break;
//   case 'staging': case 'production': authConfig.redirect_uri = 'https://rem-frontend-dev.vercel.app/callback'; break;
//   case 'production': authConfig.redirect_uri = 'https://rem-frontend.vercel.app/callback'; break;
// }

setupAuth(authConfig, callbackRedirect).then((auth: any) => {
    app.use(auth)
})

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $auth: Auth0Plugin;
    $store: any;
  }
}

app.mount('#app')

app.provide('auth', app.config.globalProperties.$auth);


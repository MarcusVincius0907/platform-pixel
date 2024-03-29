import createAuth0Client, {
  Auth0Client,
  Auth0ClientOptions,
  GetIdTokenClaimsOptions,
  GetTokenSilentlyOptions,
  GetTokenWithPopupOptions,
  IdToken,
  LogoutOptions,
  PopupLoginOptions,
  RedirectLoginOptions,
  User,
} from '@auth0/auth0-spa-js'

import { computed, ComputedRef, reactive, watchEffect } from 'vue'

let client: Auth0Client

interface Auth0State {
  loading: boolean
  isAuthenticated: boolean
  user?: User
  popupOpen: boolean
  error: any
}

const state = reactive({
  loading: true,
  isAuthenticated: false,
  user: undefined,
  popupOpen: false,
  error: null,
} as Auth0State)

async function loginWithPopup() {
  state.popupOpen = true

  try {
    await client.loginWithPopup()
  } catch (e) {
    console.error(e)
  } finally {
    state.popupOpen = false
  }

  state.user = await client.getUser()
  state.isAuthenticated = true
}

async function handleRedirectCallback() {
  state.loading = true

  try {
    await client.handleRedirectCallback()
    state.user = await client.getUser()
    state.isAuthenticated = true
  } catch (e) {
    state.error = e
  } finally {
    state.loading = false
  }
}

function loginWithRedirect(o?: RedirectLoginOptions) {
  return client.loginWithRedirect(o)
}

function getIdTokenClaims(o?: GetIdTokenClaimsOptions) {
  return client.getIdTokenClaims(o)
}

function getTokenSilently(o?: GetTokenSilentlyOptions) {
  return client.getTokenSilently(o)
}

function getTokenWithPopup(o?: GetTokenWithPopupOptions) {
  return client.getTokenWithPopup(o)
}

function logout(o?: LogoutOptions) {
  return client.logout(o)
}

export interface Auth0Plugin {
  isAuthenticated: ComputedRef<boolean>
  loading: ComputedRef<boolean>
  user: ComputedRef<User | undefined> | User
  //getIdTokenClaims: (o?: GetIdTokenClaimsOptions) => Promise<IdToken>,
  getTokenSilently: (o?: GetTokenSilentlyOptions) => Promise<any>
  getTokenWithPopup: (o?: GetTokenWithPopupOptions) => Promise<string>
  handleRedirectCallback: () => Promise<void>
  loginWithRedirect: (o?: RedirectLoginOptions) => Promise<void>
  loginWithPopup: () => Promise<void>
  logout: (o?: LogoutOptions) => void
}

const authPlugin: Auth0Plugin = {
  isAuthenticated: computed(() => state.isAuthenticated),
  loading: computed(() => state.loading),
  user: computed(() => state.user),
  //getIdTokenClaims,
  getTokenSilently,
  getTokenWithPopup,
  handleRedirectCallback,
  loginWithRedirect,
  loginWithPopup,
  logout,
}

export const routeGuard = (to: any, from: any, next: any) => {
  const { isAuthenticated, loading, loginWithRedirect } = authPlugin

  const verify = () => {
    // If the user is authenticated, continue with the route
    if (isAuthenticated.value) {
      return next()
    }

    // Otherwise, log in
    loginWithRedirect({ appState: { targetUrl: to.fullPath } })
  }

  // If loading has already finished, check our auth state using `fn()`
  if (!loading.value) {
    return verify()
  }

  // Watch for the loading property to change before we check isAuthenticated
  watchEffect(() => {
    if (loading.value === false) {
      return verify()
    }
  })
}

export const setupAuth = async (options: any, callbackRedirect: any) => {
  client = await createAuth0Client({
    ...options,
  })

  try {
    // If the user is returning to the app after authentication

    if (window.location.search.includes('code=') && window.location.search.includes('state=')) {
      // handle the redirect and retrieve tokens
      const { appState } = await client.handleRedirectCallback()

      // Notify subscribers that the redirect callback has happened, passing the appState
      // (useful for retrieving any pre-authentication state)

      //TODO: appState SEMPRE RETORNA "/"
      //COMO ESTAVA
      //callbackRedirect(appState)
      callbackRedirect({ targetUrl: '/callback' })
    }
  } catch (e) {
    state.error = e
  } finally {
    // Initialize our internal authentication state
    state.isAuthenticated = await client.isAuthenticated()
    state.user = (await client.getUser()) as User
    state.loading = false
  }

  return {
    appObj: {
      install: (app: any) => {
        app.config.globalProperties.$auth = authPlugin
      },
    },
    useAuth: authPlugin,
  }
}

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import AuthLayout from '../layouts/AuthLayout.vue'
import AppLayout from '../layouts/AppLayout.vue'

import Callback from '@/pages/callback/Callback.vue'
import Store from '../store/index'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:catchAll(.*)',
    redirect: { name: 'dashboard' },
  },
  {
    name: 'platform',
    path: '/platform',
    component: AppLayout,
    children: [
      {
        name: 'dashboard',
        path: 'dashboard',
        component: () => import('@/pages/admin/dashboard/Dashboard.vue'),
      },
      {
        name: 'pixel',
        path: 'pixel',
        component: () => import('@/pages/admin/pixel/PixelCompra.vue'),
      },
      {
        name: 'personal-info',
        path: 'personal-info',
        component: () => import('@/pages/admin/personal-info/PersonalInfo.vue'),
      },
      {
        name: 'sortition',
        path: 'sortition',
        component: () => import('@/pages/admin/sortition/Sortition.vue'),
      },
      {
        name: 'NFT',
        path: 'NFT',
        component: () => import('@/pages/admin/manage-NFT/ManageNFT.vue'),
      },
      {
        name: 'logout',
        path: 'logout',
        component: () => import('@/pages/admin/logout/Logout.vue'),
      },
      {
        name: 'checkout',
        path: 'checkout',
        component: () => import('@/pages/admin/checkout/Checkout.vue'),
      },
      {
        name: 'my-pixel',
        path: 'my-pixel',
        component: () => import('@/pages/admin/my-pixel/MyPixel.vue'),
      },
    ],
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        name: 'login',
        path: 'login',
        component: () => import('@/pages/auth/login/Login.vue'),
      },
    ],
  },

  {
    path: '/callback',
    component: Callback,
    children: [],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //  mode: process.env.VUE_APP_ROUTER_MODE_HISTORY === 'true' ? 'history' : 'hash',
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && to.path !== '/callback' && Store?.state?.isAuthenticated === false) {
    next({ name: 'login' })
  }
  next()
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/LoginView.vue'
import MainPage from '../views/MainPage.vue'
import { store } from '../store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: HomeView
  },
  {
    path: '/admin',
    name: 'admin',
    component: MainPage
  },
  {
    path: '/admin/menu',
    name: 'menu',
    component: () => import( '../views/MenuView.vue')
  },
  {
    path: '/verif',
    name: 'verif',
    component: () => import( '../views/EmailVerif.vue')
  }
  ,{
    path: '/admin/orders',
    name: 'orders',
    component: () => import( '../views/OrderPage.vue')
  }
  ,{
    path: '/admin/menumodels',
    name: 'menumodels',
    component: () => import( '../views/MenuModel.vue')
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  
  if (to.path !== '/' && store.state.user==null) next({ path: '/' })
  else next()
})
export default router

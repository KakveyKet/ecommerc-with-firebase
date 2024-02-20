import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import SignUpVue from '@/views/SignUp.vue'
import SigninVue from '@/views/Signin.vue'

import CategoriesVue from '@/views/Categories.vue'
import CategoryDetailVue from '@/views/CategoryDetail.vue'
import CardDetailVue from '@/views/CardDetail.vue'
import CheckOutOrderVue from '@/views/CheckOutOrder.vue'

import Report from "../views/Report.vue"
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpVue
  },
  {
    path: '/signin',
    name: 'signin',
    component: SigninVue
  },
  {
    path: '/category',
    name: 'category',
    component: CategoriesVue
  },
  {
    path: '/category/:id',
    name: 'categorydetails',
    component: CategoryDetailVue,
    props: true
  },
  {
    path: '/cart-details',
    name: 'card-deails',
    component: CardDetailVue,
  },
  {
    path: '/order/checkoutorder',
    name: 'checkoutorder',
    component: CheckOutOrderVue
  },
  {
    path: '/report',
    name: 'report',
    component: Report
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

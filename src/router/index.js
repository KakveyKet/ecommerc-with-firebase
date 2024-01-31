import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUpVue from '@/views/SignUp.vue'
import SigninVue from '@/views/Signin.vue'
import CategoriesVue from '@/views/Categories.vue'
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

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

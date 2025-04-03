import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignInView from '@/views/SignInView.vue'
import SignUpView from '@/views/SignUpView.vue'
import MainView from '@/views/MainView.vue'
import ProfileView from '@/views/ProfileView.vue'
import EditView from '@/views/EditView.vue'
import ParksView from '@/views/ParksView.vue'
import ParkView from '@/components/ParkView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/signIn',
      name: 'signIn',
      component: SignInView,
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: SignUpView,
    },
    {
      path: '/main',
      name: 'main',
      component: MainView,
      children: [
        {
          path: '/user/profile',
          name: 'profile',
          component: ProfileView,
        },
        {
          path: '/user/edit',
          name: 'edit',
          component: EditView,
        },
        {
          path: '/parks',
          name: 'parks',
          component: ParksView,
        },
        {
          path: '/parks/:parkCode',
          name: 'park',
          components: {
            default: ParkView,
          },
          props: true,
        },
      ],
    },
  ],
})

export default router

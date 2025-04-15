import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignInView from '@/views/SignInView.vue'
import SignUpView from '@/views/SignUpView.vue'
import MainView from '@/views/MainView.vue'
import ProfileView from '@/views/ProfileView.vue'
import EditUser from '@/views/EditUser.vue'
import SearchParks from '@/views/SearchParks.vue'
import ParkView from '@/components/ParkView.vue'
import ActivitiesView from '@/views/ActivitiesView.vue'
import CampgroundView from '@/views/CampgroundView.vue'
import AllExcursions from '@/views/AllExcursions.vue'
import CreateExcursion from '@/views/CreateExcursion.vue'
import ExcursionView from '@/views/ExcursionView.vue'
import ActivityView from '@/views/ActivityView.vue'

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
          component: EditUser,
        },
        {
          path: '/parks',
          name: 'parks',
          component: SearchParks,
        },
        {
          path: '/parks/:parkCode',
          name: 'park',
          components: {
            default: ParkView,
          },
          props: true,
        },
        {
          path: '/parks/:parkCode/activities',
          name: 'activities',
          components: {
            default: ParkView,
            right: ActivitiesView,
          },
          props: true,
        },
        {
          path: '/activities/:id',
          name: 'activity',
          components: {
            default: ParkView,
            right: ActivityView,
          },
          props: true,
        },
        {
          path: '/parks/:parkCode/campgrounds',
          name: 'campgrounds',
          components: {
            default: ParkView,
            right: CampgroundView,
          },
          props: true,
        },
        {
          path: '/excursions',
          name: 'excursions',
          components: {
            default: AllExcursions,
          },
        },
        {
          path: '/excursions/new',
          name: 'createExcursion',
          components: {
            default: AllExcursions,
            right: CreateExcursion,
          },
        },
        {
          path: '/excursions/:_id',
          name: 'excursion',
          components: {
            default: ExcursionView,
          },
          props: true,
        },
      ],
    },
  ],
})

export default router

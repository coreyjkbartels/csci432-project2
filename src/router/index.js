import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignInView from '@/views/SignInView.vue'
import SignUpView from '@/views/SignUpView.vue'
import MainView from '@/views/MainView.vue'
import ProfileView from '@/views/ProfileView.vue'
import EditUser from '@/views/EditUser.vue'
import ParkList from '@/views/ParkList.vue'
import ParkDetails from '@/views/ParkDetails.vue'
import ActivityList from '@/views/ActivityList.vue'
import CampgroundList from '@/views/CampgroundList.vue'
import ExcursionList from '@/views/ExcursionList.vue'
import CreateExcursion from '@/views/CreateExcursion.vue'
import ExcursionDetails from '@/views/ExcursionDetails.vue'
import ActivityDetails from '@/views/ActivityDetails.vue'
import CampgroundDetails from '@/views/CampgroundDetails.vue'
import CreateTrip from '@/views/CreateTrip.vue'

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
          component: ParkList,
        },

        {
          path: '/parks/:parkCode',
          name: 'park',
          components: {
            default: ParkDetails,
          },
          props: true,
        },
        {
          path: '/parks/:parkCode/activities',
          name: 'activities',
          components: {
            default: ParkDetails,
            right: ActivityList,
          },
          props: true,
        },
        {
          path: '/activities/:id',
          name: 'activity',
          components: {
            default: ParkDetails,
            right: ActivityDetails,
          },
          props: true,
        },
        {
          path: '/parks/:parkCode/campgrounds',
          name: 'campgrounds',
          components: {
            default: ParkDetails,
            right: CampgroundList,
          },
          props: true,
        },
        {
          path: '/campgrounds/:id',
          name: 'campground',
          components: {
            default: ParkDetails,
            right: CampgroundDetails,
          },
          props: true,
        },
        {
          path: '/excursions',
          name: 'excursions',
          components: {
            default: ExcursionList,
          },
        },
        {
          path: '/excursions/new',
          name: 'createExcursion',
          components: {
            default: CreateExcursion,
          },
        },
        {
          path: '/excursions/:excursion_id',
          name: 'excursion',
          components: {
            default: ExcursionDetails,
          },
          props: true,
        },
        {
          path: '/trips/new',
          name: 'createTrip',
          components: {
            default: CreateExcursion,
            right: CreateTrip,
          },
          props: true,
        },
        {
          path: '/trips/new/parks',
          name: 'addParks',
          components: {
            default: CreateExcursion,
            right: ParkList,
          },
          props: true,
        },
        {
          path: '/trips/new/parks/:parkCode',
          name: 'addPark',
          components: {
            default: CreateExcursion,
            right: ParkDetails,
          },
          props: true,
        },
      ],
    },
  ],
})

export default router

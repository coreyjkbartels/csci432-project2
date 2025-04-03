<script setup>
import NavBar from '@/components/NavBar.vue'
import SideBar from '@/components/SideBar.vue'
import { RouterLink, RouterView } from 'vue-router'
import { fetchResponse } from '@/assets/fetch'
import router from '@/router'

async function signOut() {
  const endpoint = '/user/sign-out'

  const response = await fetchResponse(endpoint, 'POST')
  if (response.status == 200) {
    router.push({ name: 'home' })
  } else console.log(response.statusText)
}
</script>

<template>
  <NavBar>
    <div class="nav__links">
      <RouterLink :to="{ name: 'profile' }"><h3>Profile</h3></RouterLink>
      <RouterLink :to="{ name: 'parks' }"><h3>Parks</h3></RouterLink>
      <a @click="signOut">
        <h3>Sign Out</h3>
      </a>
    </div>
  </NavBar>

  <section>
    <div class="container">
      <div class="container__grid">
        <SideBar></SideBar>
        <RouterView></RouterView>
        <RouterView name="right"></RouterView>
      </div>
    </div>
  </section>
</template>

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
      <RouterLink :to="{ name: 'profile' }">Profile</RouterLink>
      <RouterLink :to="{ name: 'parks' }">Parks</RouterLink>
      <a @click="signOut"> Sign Out </a>
    </div>
  </NavBar>

  <section>
    <div class="height-100">
      <div class="container__grid height-100">
        <div class="white-border-right">
          <SideBar></SideBar>
        </div>
        <div class="white-border-right">
          <RouterView></RouterView>
        </div>
        <RouterView name="right"></RouterView>
      </div>
    </div>
  </section>
</template>

<style>
.white-border-right {
  border-right: 1px solid white;
}
</style>

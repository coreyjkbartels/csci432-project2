<script setup>
import NavBar from '@/components/NavBar.vue'
import SideNav from '@/components/SideNav.vue'
</script>

<template>
  <NavBar>
    <div class="nav__links">
      <RouterLink><h3>Profile</h3></RouterLink>
      <RouterLink><h3>Parks</h3></RouterLink>
      <RouterLink :to="{ name: 'home' }"><h3>Sign Out</h3></RouterLink>
    </div>
  </NavBar>

  <section>
    <div class="container">
      <div class="container__grid">
        <SideNav></SideNav>
        <h2 class="heading heading--shiftedRight">Home</h2>
      </div>
    </div>
  </section>
</template>

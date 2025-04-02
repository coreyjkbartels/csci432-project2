<script setup></script>

<template>
  <div class="nav nav--column">
    <h2 class="heading heading--shiftedRight">Navigation</h2>
    <div class="nav__links nav--column">
      <RouterLink :to="{ name: 'main' }"><h3>Home</h3></RouterLink>
      <RouterLink :to="{ name: 'home' }"><h3>Profile</h3></RouterLink>
      <RouterLink :to="{ name: 'home' }"><h3>Parks</h3></RouterLink>
      <RouterLink :to="{ name: 'home' }"><h3>Socials</h3></RouterLink>
    </div>
  </div>
</template>

<style scoped>
.nav {
  border-right: 1px solid white;
  padding-right: 10px;
}
.nav__links {
  width: 100%;
}

a {
  width: 100%;
}
</style>

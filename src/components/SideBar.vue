<script setup></script>

<template>
  <div class="main-column">
    <h2 class="heading heading--shiftedRight">Navigation</h2>
    <div class="nav__links nav--column">
      <RouterLink :to="{ name: 'main' }">Home</RouterLink>
      <RouterLink :to="{ name: 'parks' }">Parks</RouterLink>
      <RouterLink :to="{ name: 'profile' }">Profile</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.main-column {
  align-items: start;

  padding: 0px;
  padding-right: 10px;
}
.nav__links {
  width: 100%;
}

a {
  width: 100%;
}
</style>

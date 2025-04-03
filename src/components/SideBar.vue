<script setup></script>

<template>
  <div class="main-column white-right-border">
    <h2 class="heading heading--shiftedRight">Navigation</h2>
    <div class="nav__links nav--column">
      <RouterLink :to="{ name: 'main' }"><h3>Home</h3></RouterLink>
      <RouterLink :to="{ name: 'parks' }"><h3>Parks</h3></RouterLink>
      <RouterLink :to="{ name: 'profile' }"><h3>Profile</h3></RouterLink>
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

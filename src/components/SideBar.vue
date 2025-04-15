<script setup></script>

<template>
  <div class="main-column">
    <h2 class="heading heading--shiftedRight">Navigation</h2>
    <div class="nav__links nav--column">
      <RouterLink class="list-link list-link--emphasized" :to="{ name: 'main' }">Home</RouterLink>
      <RouterLink class="list-link list-link--emphasized" :to="{ name: 'parks' }">Parks</RouterLink>
      <RouterLink class="list-link list-link--emphasized" :to="{ name: 'excursions' }"
        >Excursions</RouterLink
      >
      <RouterLink class="list-link list-link--emphasized" :to="{ name: 'profile' }"
        >Profile</RouterLink
      >
    </div>
  </div>
</template>

<style scoped>
.main-column {
  align-items: start;
  height: 100vh;

  padding: 0px;
  padding-right: 10px;
}

.nav__links {
  width: 100%;
}
</style>

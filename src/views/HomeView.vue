<script setup>
import NavBar from '@/components/NavBar.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <NavBar
    ><div class="nav__links">
      <RouterLink :to="{ name: 'signIn' }">Sign In</RouterLink>
      <RouterLink :to="{ name: 'signUp' }">Sign Up</RouterLink>
    </div>
  </NavBar>

  <section>
    <div class="hero">
      <h1 class="heading hero__heading">
        Where nature meets planning - Seamless National Park Trips!
      </h1>
      <p class="hero__description">
        Say goodbye to scattered notes and endless group chats. Plan your national park adventure
        seamlessly-wherever the trail takes you.
      </p>
    </div>
  </section>
</template>

<style scoped>
section {
  background-color: transparent;
}

.hero {
  width: 87%;
}

.hero__heading {
  font-size: var(--fs-1000);
  line-height: 95%;
}

.hero__description {
  width: 70%;
}
</style>

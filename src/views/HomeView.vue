<script setup>
import NavBar from '@/components/NavBar.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <NavBar
    ><div class="nav__links">
      <RouterLink :to="{ name: 'signIn' }"><h3>Sign In</h3></RouterLink>
      <RouterLink :to="{ name: 'signUp' }"><h3>Sign Up</h3></RouterLink>
    </div>
  </NavBar>

  <div class="container">
    <div class="hero">
      <h1 class="heading hero__heading">
        Where nature meets planning - Seamless National Park Trips!
      </h1>

      <p class="hero__description">
        Say goodbye to scattered notes and endless group chats. Plan your national park adventure
        seamlessly-wherever the trail takes you.
      </p>
    </div>
  </div>
</template>

<style>
.hero {
  width: 87%;
  margin-top: 100px;
}

.hero__heading {
  font-size: 4.4rem;
  line-height: 95%;
}

.hero__description {
  width: 70%;
}
</style>

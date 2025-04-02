<script setup>
import NavBar from '@/components/NavBar.vue'
import router from '@/router'
import { RouterLink } from 'vue-router'

function signIn() {
  router.push({ name: 'main' })
}
</script>

<template>
  <NavBar>
    <RouterLink :to="{ name: 'home' }"><h3>Home</h3></RouterLink>
  </NavBar>
  <div class="container">
    <div class="form form--left">
      <h1 class="heading form__heading">Sign In</h1>
      <form action="">
        <li class="form__field">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" />
        </li>
        <li class="form__field">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" />
        </li>
      </form>
      <button class="form__button" @click="signIn">Submit</button>
    </div>
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import { RouterLink } from 'vue-router'

NavBar
</script>

<template>
  <NavBar>
    <RouterLink :to="{ name: 'home' }"><h3>Home</h3></RouterLink>
  </NavBar>
  <div class="container">
    <div class="form form--left">
      <h1 class="heading form__heading">Sign Up</h1>
      <form action="">
        <li class="form__field">
          <label for="fname">First Name</label>
          <input type="text" id="fname" name="fname" />
        </li>
        <li class="form__field">
          <label for="lname">Last Name</label>
          <input type="text" id="lname" name="lname" />
        </li>
        <li class="form__field">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" />
        </li>
        <li class="form__field">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" />
        </li>
      </form>
      <button class="form__button">Submit</button>
    </div>
  </div>
</template>

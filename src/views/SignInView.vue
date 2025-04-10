<script setup>
import NavBar from '@/components/NavBar.vue'
import router from '@/router'
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { fetchResponse } from '@/assets/fetch'

const email = ref('')
const password = ref('')

async function signIn() {
  let data = {
    email: email.value,
    password: password.value,
  }

  const endpoint = '/user/sign-in'
  let response = await fetchResponse(endpoint, 'POST', data)
  if (response.status == 200) {
    data = await response.json()
    localStorage.setItem('token', data.token)

    router.push({ name: 'main' })
  } else console.log(response.statusText)
}
</script>

<template>
  <NavBar>
    <RouterLink :to="{ name: 'home' }"><h3>Home</h3></RouterLink>
  </NavBar>

  <section>
    <div class="main-column">
      <div class="form">
        <h2 class="heading form__heading">Sign In</h2>
        <form action="">
          <li class="form__field">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" v-model="email" />
          </li>
          <li class="form__field">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" v-model="password" />
          </li>
        </form>

        <div class="row">
          <RouterLink class="width-100" :to="{ name: 'signUp' }">Sign Up</RouterLink>
          <button @click="signIn">Submit</button>
        </div>
      </div>
    </div>
  </section>
</template>

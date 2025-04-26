<script setup>
import NavBar from '@/components/NavBar.vue'
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { fetchResponse } from '@/assets/fetch'
import router from '@/router'

const userName = ref('')
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')

async function signUp() {
  let data = {
    userName: userName.value,
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
  }

  const endpoint = '/user'
  let response = await fetchResponse(endpoint, 'POST', data)
  if (response.status == 201) {
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

  <section class="height-100">
    <div class="main-column">
      <div class="form">
        <h2 class="heading form__heading">Sign Up</h2>
        <form action="">
          <li class="form__field">
            <label for="uname">Username</label>
            <input type="text" id="uname" name="uname" v-model="userName" />
          </li>
          <div class="row width-100">
            <li class="form__field">
              <label for="fname">First Name</label>
              <input type="text" id="fname" name="fname" v-model="firstName" />
            </li>
            <li class="form__field">
              <label for="lname">Last Name</label>
              <input type="text" id="lname" name="lname" v-model="lastName" />
            </li>
          </div>
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
          <RouterLink class="width-100 center-text invertedLink" :to="{ name: 'signIn' }"
            >Sign In</RouterLink
          >
          <button @click="signUp">Submit</button>
        </div>
      </div>
    </div>
  </section>
</template>

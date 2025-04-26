<script setup>
import { fetchResponse } from '@/assets/fetch'
import { onMounted, ref } from 'vue'
import router from '@/router'

const firstName = ref('')
const lastName = ref('')
const userName = ref('')
const email = ref('')
const password = ref('')

async function edit() {
  let data = {
    userName: userName.value,
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
  }

  const endpoint = '/user'
  let response = await fetchResponse(endpoint, 'PATCH', data)
  if (response.status == 200) {
    data = await response.json()
    localStorage.setItem('userName', data.user.userName)
    router.push({ name: 'profile' })
  } else console.log(response.statusText)
}

//Fix this asap...use a store or local storage
onMounted(async () => {
  const endpoint = '/user'
  const response = await fetchResponse(endpoint, 'GET')

  if (response.status == 200) {
    const data = await response.json()
    firstName.value = data.firstName
    lastName.value = data.lastName
    userName.value = data.userName
    email.value = data.email
  }
})
</script>

<template>
  <div class="main-column">
    <h2 class="heading">Edit Profile</h2>
    <form class="info-display" onsubmit="return false">
      <li class="form__field">
        <label>First Name</label>
        <input type="text" v-model="firstName" />
      </li>

      <li class="form__field">
        <label for="lastName">Last Name</label>
        <input type="text" v-model="lastName" id="lastName" />
      </li>
      <li class="form__field span-2">
        <label for="userName">UserName</label>
        <input type="text" v-model="userName" id="userName" />
      </li>
      <li class="form__field span-2">
        <label for="email">Email</label>
        <input type="text" v-model="email" id="email" />
      </li>
      <li class="form__field span-2">
        <label for="password">Password</label>
        <input type="password" v-model="password" id="password" />
      </li>

      <button class="span-2" @click="edit">Submit</button>
    </form>
  </div>
</template>

<style scoped>
.info-display {
  display: grid;
  grid-template: 1fr 1fr 1fr / 1fr 1fr;
  column-gap: 5px;
}

.info-display input:disabled {
  color: black;
  background-color: var(--clr-neutral-200);
}

.span-2 {
  grid-column: span 2;
}

button {
  margin-top: 20px;
}
</style>

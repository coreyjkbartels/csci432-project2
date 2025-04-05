<script setup>
import { fetchResponse } from '@/assets/fetch'
import router from '@/router'
import { onMounted, ref } from 'vue'

const firstName = ref('')
const lastName = ref('')
const userName = ref('')
const email = ref('')

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
    <h2 class="heading">Profile</h2>
    <form class="info-display">
      <li class="form__field">
        <label>First Name</label>
        <input type="text" v-model="firstName" disabled />
      </li>

      <li class="form__field">
        <label>Last Name</label>
        <input type="text" v-model="lastName" disabled />
      </li>
      <li class="form__field span-2">
        <label>UserName</label>
        <input type="text" v-model="userName" disabled />
      </li>
      <li class="form__field span-2">
        <label>Email</label>
        <input type="text" v-model="email" disabled />
      </li>

      <button class="span-2" @click="router.push({ name: 'edit' })">Edit</button>
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

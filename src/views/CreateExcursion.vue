<script setup>
import { fetchResponse } from '@/assets/fetch'
import router from '@/router'
import { ref } from 'vue'

const name = ref('')
const description = ref('')

async function create() {
  const endpoint = '/excursion'
  const data = {
    name: name.value,
    description: description.value,
  }

  const response = await fetchResponse(endpoint, 'POST', data)

  if (response.status == 201) {
    const responseData = await response.json()
    console.log(responseData)

    router.push({ name: 'excursions' })
  } else console.log(response.statusText)
}
</script>

<template>
  <div class="main-column main-column--right">
    <h2 class="heading">Create Excursion</h2>

    <form class="width-100" onsubmit="return false">
      <li class="form__field">
        <label for="name">Name</label>
        <input type="text" v-model="name" name="name" id="name" />
      </li>

      <li class="form__field">
        <label for="description">Description</label>
        <textarea name="description" id="description" v-model="description"></textarea>
      </li>
      <button class="span-2" @click="create">Submit</button>
    </form>
  </div>
</template>

<style scoped></style>

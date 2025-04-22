<script setup>
import { fetchResponse, getQuery } from '@/assets/fetch'
import router from '@/router'
import { ref } from 'vue'

const stateCode = ref('')
const parks = ref([])

async function search() {
  const queryOptions = {
    stateCode: stateCode.value,
    limit: 15,
  }

  const endpoint = `/national-parks/summary${getQuery(queryOptions)}`
  const response = await fetchResponse(endpoint, 'GET')

  if (response.status == 200) {
    const data = await response.json()
    parks.value = data.data
  } else console.log(response.status)
}
</script>

<template>
  <div class="main-column">
    <h2 class="heading">Parks</h2>

    <form onsubmit="return false">
      <input type="text" v-model="stateCode" placeholder="Enter State Code" />
      <button class="material-symbols-outlined" @click="search">send</button>
    </form>

    <ul>
      <RouterLink
        class="list-link"
        v-for="park in parks"
        :key="park.id"
        :to="{ path: `${router.currentRoute.value.fullPath}/${park.parkCode}` }"
      >
        {{ park.name }}
      </RouterLink>
    </ul>
  </div>
</template>

<style scoped>
form {
  width: 100%;
  margin: 5px auto;

  display: flex;
  gap: 15px;
}
</style>

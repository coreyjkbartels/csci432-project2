<script setup>
import { fetchResponse, getQuery } from '@/assets/fetch'
import router from '@/router'
import { ref } from 'vue'

const stateCode = ref('')
const parks = ref([])

async function search() {
  const queryOptions = {
    stateCode: stateCode.value,
    limit: 10,
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
  <div class="main-column white-right-border">
    <h2 class="heading">Parks</h2>

    <form onsubmit="return false">
      <input type="text" v-model="stateCode" placeholder="Enter State Code" />
      <span class="material-symbols-outlined" @click="search"> send </span>
    </form>

    <ul>
      <a
        v-for="park in parks"
        :key="park.id"
        @click="router.push({ path: `/parks/${park.parkCode}` })"
      >
        {{ park.name }}
      </a>
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

ul {
  padding: 0;
  width: 100%;
  height: 200px;

  overflow: auto;
  scrollbar-color: var(--white-8) transparent;
}

a {
  display: block;
  font: inherit;
  width: 95%;
}
</style>

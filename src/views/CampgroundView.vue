<script setup>
import { fetchResponse, getQuery } from '@/assets/fetch'
import { ref } from 'vue'

const props = defineProps({
  parkCode: String,
})

const camps = ref([])

async function search() {
  const queryOptions = {
    parkCode: props.parkCode,
    limit: 15,
  }

  const endpoint = `/campgrounds${getQuery(queryOptions)}`
  const response = await fetchResponse(endpoint, 'GET')

  if (response.status == 200) {
    const data = await response.json()
    camps.value = data.data
  } else console.log(response.status)
}

search()
</script>

<template>
  <div class="main-column">
    <h2 class="heading">Campgrounds</h2>

    <ul>
      <li v-for="camp in camps" :key="camp.id">
        {{ camp.name }}
        <!-- {{ camp.description }} -->
      </li>
    </ul>
  </div>
</template>

<style scoped>
.main-column {
  align-items: start;

  padding: 0px;
  padding-left: 20px;
}
</style>

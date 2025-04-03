<script setup>
import { fetchResponse, getQuery } from '@/assets/fetch'
import { ref } from 'vue'

const props = defineProps({
  parkCode: String,
})

const activities = ref([])
async function search() {
  const queryOptions = {
    parkCode: props.parkCode,
    limit: 15,
  }

  const endpoint = `/things-to-do${getQuery(queryOptions)}`
  const response = await fetchResponse(endpoint, 'GET')

  if (response.status == 200) {
    const data = await response.json()
    activities.value = data.data
  } else console.log(response.status)
}

search()
</script>

<template>
  <div class="main-column">
    <h2 class="heading">Activities</h2>

    <ul>
      <li v-for="activity in activities" :key="activity.id">
        {{ activity.title }}
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

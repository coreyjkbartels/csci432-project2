<script setup>
import { fetchResponse, getQuery } from '@/assets/fetch'
import router from '@/router'
import { ref } from 'vue'

const props = defineProps({
  parkCode: String,
})

const activities = ref([])
async function search() {
  const queryOptions = {
    parkCode: props.parkCode,
    limit: 50,
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
  <div class="main-column main-column--right">
    <div class="header-grid">
      <a class="material-symbols-outlined" @click="router.back">arrow_back </a>
      <h2 class="heading header-grid__heading">Activities</h2>
    </div>
    <ul>
      <RouterLink
        class="list-link"
        v-for="activity in activities"
        :key="activity.id"
        :to="{ path: `${router.currentRoute.value.fullPath}/${activity.id}` }"
      >
        {{ activity.title }}
      </RouterLink>
    </ul>
  </div>
</template>

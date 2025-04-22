<script setup>
import { fetchResponse, getQuery } from '@/assets/fetch'
import router from '@/router'
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
    console.log(data.data)
  } else console.log(response.status)
}

search()
</script>

<template>
  <div class="main-column main-column--right">
    <h2 class="heading">Campgrounds</h2>

    <ul>
      <RouterLink
        class="list-link"
        v-for="camp in camps"
        :key="camp.id"
        :to="{ path: `${router.currentRoute.value.fullPath}/${camp.id}` }"
      >
        {{ camp.name }}
      </RouterLink>
    </ul>
  </div>
</template>

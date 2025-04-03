<script setup>
import { fetchResponse, getQuery } from '@/assets/fetch'
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

const props = defineProps({
  parkCode: String,
})

const park = ref('')

async function search() {
  const queryOptions = {
    parkCode: props.parkCode,
    limit: 1,
  }

  const endpoint = `/national-parks/summary${getQuery(queryOptions)}`
  const response = await fetchResponse(endpoint, 'GET')

  if (response.status == 200) {
    const data = await response.json()
    park.value = data.data[0]
  } else console.log(response.status)
}

search()
</script>

<template>
  <div class="main-column white-right-border">
    <h2 class="heading">{{ park.fullName }}</h2>
    <p>{{ park.description }}</p>
    <div class="nav__links">
      <RouterLink>Campgrounds</RouterLink>
      <RouterLink>Activities</RouterLink>
      <a :href="park.url" target="_blank">Link to Site</a>
    </div>
  </div>
</template>

<style scoped>
.heading {
  text-align: center;
}

a {
  font-size: 1.1rem;
}
</style>

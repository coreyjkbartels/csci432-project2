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
  <div class="main-column main-column--sbtwn height-100">
    <div>
      <h2 class="heading">{{ park.fullName }}</h2>
      <p>{{ park.description }}</p>
    </div>
    <div class="nav__links">
      <RouterLink :to="{ path: `/parks/${park.parkCode}/campgrounds` }">Campgrounds</RouterLink>
      <RouterLink :to="{ path: `/parks/${park.parkCode}/activities` }">Activities</RouterLink>
      <a :href="park.url" target="_blank">Link to Site</a>
    </div>
  </div>
</template>

<style scoped>
.heading {
  text-align: center;
  margin-bottom: 35px;
}

a {
  font-size: var(--fs-650);
}

.nav__links {
  width: 100%;
}
</style>

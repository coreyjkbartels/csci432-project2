<script setup>
import { fetchResponse } from '@/assets/fetch'
import router from '@/router'
import { onMounted, ref } from 'vue'

const props = defineProps({
  excursion_id: String,
})

const excursion = ref('')
async function getExcursion() {
  const endpoint = `/excursion/${props.excursion_id}`
  const response = await fetchResponse(endpoint, 'GET')

  if (response.status == 200) {
    const data = await response.json()
    excursion.value = data.excursion[0]
  } else console.log(response.status)
}

onMounted(() => {
  getExcursion()
})
</script>

<template>
  <div class="main-column height-100">
    <div class="header-grid">
      <span class="material-symbols-outlined" @click="router.back"> arrow_back </span>
      <h2 class="heading header-grid__heading">{{ excursion.name }}</h2>
      <RouterLink class="material-symbols-outlined" :to="{ name: 'createTrip' }">add</RouterLink>
    </div>

    <p class="width-100"><em>Description:</em> {{ excursion.description }}</p>

    <ul>
      <li v-for="trip in excursion.trips" :key="trip.id">{{ trip }}</li>
    </ul>
  </div>
</template>

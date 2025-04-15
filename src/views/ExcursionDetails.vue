<script setup>
import { fetchResponse } from '@/assets/fetch'
import router from '@/router'
import { onMounted, ref } from 'vue'

const props = defineProps({
  _id: String,
})

const excursion = ref('')
async function getExcursion() {
  const endpoint = `/excursion/${props._id}`
  console.log(endpoint)
  const response = await fetchResponse(endpoint, 'GET')

  if (response.status == 200) {
    const data = await response.json()
    excursion.value = data.excursion
    console.log(excursion.value)
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
      <span class="material-symbols-outlined" @click="router.back"> add </span>
    </div>

    <p class="width-100"><em>Description:</em> {{ excursion.description }}</p>
  </div>
</template>

<script setup>
import { fetchResponse } from '@/assets/fetch'
import router from '@/router'
import { ref, onMounted } from 'vue'

const excursions = ref([])
async function getExcursions() {
  const endpoint = '/excursions'
  const response = await fetchResponse(endpoint, 'GET')

  if (response.status == 200) {
    const data = await response.json()
    excursions.value = data.excursions
    console.log('Success')
  } else console.log(response.status)
}

onMounted(() => {
  getExcursions()
})
</script>

<template>
  <div class="main-column height-100">
    <div class="header-grid">
      <span class="material-symbols-outlined" @click="router.back"> arrow_back </span>
      <h2 class="heading header-grid__heading">Excursions</h2>
      <span class="material-symbols-outlined" @click="router.push({ name: 'createExcursion' })">
        add
      </span>
    </div>

    <ul class="height-100">
      <a
        v-for="excursion in excursions"
        :key="excursion.id"
        @click="router.push({ path: `/excursions/${excursion._id}` })"
      >
        {{ excursion.name }}
      </a>
    </ul>
  </div>
</template>

<style scoped>
a {
  display: block;
  width: 95%;
}
</style>

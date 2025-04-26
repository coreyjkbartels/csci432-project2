<script setup>
import { fetchResponse } from '@/assets/fetch'
import router from '@/router'
import { ref, onMounted } from 'vue'

const excursions = ref([])
const invites = ref([])

async function getExcursions() {
  const endpoint = '/excursions'
  const response = await fetchResponse(endpoint, 'GET')

  if (response.status == 200) {
    const data = await response.json()
    excursions.value = data.excursions
  } else console.log(response.status)
}

async function getInvites() {
  const endpoint = '/share/excursions'
  const response = await fetchResponse(endpoint, 'GET')

  if (response.status == 200) {
    const responseData = await response.json()
    invites.value = responseData.excursionInvites
    console.log(responseData.excursionInvites)
  } else console.log(response.status)
}

onMounted(() => {
  getExcursions()
  getInvites()
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

    <h3>Invites</h3>
    <ul>
      <div v-for="invite in invites" :key="invite.key">
        {{ invite.excursion[0].name }}
      </div>
    </ul>
  </div>
</template>

<style scoped>
a {
  display: block;
  width: 95%;
}
</style>

<script setup>
import { fetchResponse, getQuery } from '@/assets/fetch'
import router from '@/router'
import { onMounted, ref } from 'vue'

const props = defineProps({
  trip_id: String,
})

const trip = ref('')
const park = ref('')

async function getTrip() {
  const endpoint = `/trip/${props.trip_id}`
  const response = await fetchResponse(endpoint, 'GET')

  if (response.status == 200) {
    const data = await response.json()
    trip.value = data.trip
    getPark(trip.value.park)
  } else console.log(response.status)
}

async function deleteTrip() {
  const endpoint = `/trip/${props.trip_id}`
  const response = await fetchResponse(endpoint, 'DElETE')

  if (response.status == 200) {
    router.back()
  } else console.log(response.status)
}

async function getPark(parkId) {
  const queryOptions = {
    q: parkId,
    limit: 1,
  }

  const endpoint = `/national-parks/summary/${getQuery(queryOptions)}`
  const response = await fetchResponse(endpoint, 'GET')

  if (response.status == 200) {
    const data = await response.json()
    park.value = data.data[0]
  } else console.log(response.status)
}

onMounted(() => {
  getTrip()
})
</script>
<template>
  <div class="main-column main-column--right">
    <div class="header-grid">
      <span class="material-symbols-outlined" @click="router.back"> arrow_back </span>
      <h2 class="heading header-grid__heading">{{ trip.name }}</h2>
    </div>

    <div class="width-100">
      <h3>Description</h3>
      <p class="width-100">{{ trip.description }}</p>
    </div>

    <div class="width-100">
      <h3>Park</h3>
      <p>{{ park.fullName }}</p>
    </div>

    <div class="width-100">
      <h3>Things To Do</h3>
      <ul>
        <a class="list-link" v-for="activity in trip.thingstodo" :key="activity.id">{{
          activity.name
        }}</a>
      </ul>
    </div>

    <a @click="deleteTrip">Delete</a>
  </div>
</template>

<script setup>
import { fetchResponse, getQuery } from '@/assets/fetch'
import router from '@/router'
import { onMounted, ref, toRaw } from 'vue'

const props = defineProps({
  trip_id: String,
})

const trip = ref('')
const park = ref('')
const campground = ref('')

async function getTrip() {
  const endpoint = `/trip/${props.trip_id}`
  const response = await fetchResponse(endpoint, 'GET')

  if (response.status == 200) {
    const data = await response.json()
    trip.value = data.trip
    getPark(trip.value.park)
    getCampground(trip.value.campground)
    for (let activityId in toRaw(trip.value.thingstodo)) getActivity(activityId)
  } else console.log(response.status)
}

async function deleteTrip() {
  const endpoint = `/trip/${props.trip_id}`
  const response = await fetchResponse(endpoint, 'DElETE')

  if (response.status == 200) {
    router.back()
  } else console.log(response.status)
}

async function getCampground(campgroundId) {
  const queryOptions = {
    q: campgroundId,
    limit: 1,
  }

  const endpoint = `/campgrounds${getQuery(queryOptions)}`
  const response = await fetchResponse(endpoint, 'GET')

  if (response.status == 200) {
    const data = await response.json()
    campground.value = data.data[0]
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

const activities = ref([])
async function getActivity(activityId) {
  const queryOptions = {
    id: activityId,
    limit: 1,
  }

  const endpoint = `/things-to-do${getQuery(queryOptions)}`
  const response = await fetchResponse(endpoint, 'GET')

  if (response.status == 200) {
    const data = await response.json()
    activities.value.push(data.data[0].title)
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
      <h3>Campground</h3>
      <p>{{ campground.name }}</p>
    </div>

    <div class="width-100">
      <h3>Activities</h3>
      <ul>
        <span v-for="activity in activities" :key="activity.id">{{ activity }}</span>
      </ul>
    </div>

    <a @click="deleteTrip">Delete</a>
  </div>
</template>

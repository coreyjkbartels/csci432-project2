<script setup>
import { fetchResponse } from '@/assets/fetch'
import router from '@/router'
import { useExcursionStore } from '@/stores/excursions'
import { useTripsStore } from '@/stores/trips'
import { storeToRefs } from 'pinia'

const tripStore = useTripsStore()
const {
  name,
  description,
  startDate,
  endDate,
  parkId,
  parkName,
  parkcode,
  campgroundName,
  campgroundId,
} = storeToRefs(tripStore)

const excursionStore = useExcursionStore()
const { trips } = storeToRefs(excursionStore)

async function create() {
  const endpoint = '/trip'
  const data = {
    name: name.value,
    description: description.value,
    startDate: startDate.value,
    endDate: endDate.value,
    park: parkId.value,
    campground: campgroundId.value,
  }

  const response = await fetchResponse(endpoint, 'POST', data)

  if (response.status == 201) {
    const responseData = await response.json()
    console.log(responseData)

    tripStore.$reset()
    trips.value.push(responseData.trip)
    router.push({ name: 'createExcursion' })
  } else console.log(response.statusText)
}
</script>

<template>
  <div class="main-column main-column--right">
    <div class="header-grid">
      <span class="material-symbols-outlined" @click="router.back"> arrow_back </span>
      <h2 class="heading header-grid__heading">Create Trip</h2>
    </div>

    <form class="width-100" onsubmit="return false">
      <li class="form__field">
        <label for="name">Name</label>
        <input type="text" v-model="name" name="name" id="name" />
      </li>

      <li class="form__field">
        <label for="description">Description</label>
        <textarea name="description" id="description" v-model="description"></textarea>
      </li>

      <div class="row">
        <li class="form__field width-100">
          <label for="start-date">Start Date</label>
          <input type="datetime-local" name="start-date" id="start-date" v-model="startDate" />
        </li>
        <li class="form__field width-100">
          <label for="end-date">End Date</label>
          <input type="datetime-local" name="end-date" id="end-date" v-model="endDate" />
        </li>
      </div>

      <li class="form__field">
        <div class="row">
          <h3>Park</h3>
          <a class="material-symbols-outlined" @click="router.push({ name: 'addParks' })">add</a>
        </div>
        <span class="width-100">{{ parkName }}</span>
      </li>

      <li class="form__field">
        <div class="row">
          <h3>Campground</h3>
          <a
            class="material-symbols-outlined"
            @click="router.push({ path: `/trips/new/parks/${parkcode}/campgrounds` })"
            v-if="parkId"
            >add</a
          >
        </div>
        <span class="width-100">{{ campgroundName }}</span>
      </li>
      <button class="span-2 margin-v20" @click="create">Submit</button>
    </form>
  </div>
</template>

<style scoped>
h3 {
  align-self: center;
}
</style>

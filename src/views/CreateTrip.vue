<script setup>
import { fetchResponse } from '@/assets/fetch'
import router from '@/router'
import { useExcursionStore } from '@/stores/excursions'
import { useTripsStore } from '@/stores/trips'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const name = ref('')
const description = ref('')
const startDate = ref('')
const endDate = ref('')

const tripStore = useTripsStore()
const { trip } = storeToRefs(tripStore)

const excursionStore = useExcursionStore()
const { excursion } = storeToRefs(excursionStore)

async function create() {
  const endpoint = '/trip'
  const data = {
    name: name.value,
    description: description.value,
    startDate: startDate.value,
    endDate: endDate.value,
    park: trip.value.park,
  }

  const response = await fetchResponse(endpoint, 'POST', data)

  if (response.status == 201) {
    const responseData = await response.json()
    console.log(responseData)

    tripStore.$reset
    excursion.value.trips.push(responseData.trip._id)
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
      <RouterLink :to="{ name: 'addParks' }">Add Park</RouterLink>
      <button class="span-2" @click="create">Submit</button>
    </form>
  </div>
</template>

<style scoped></style>

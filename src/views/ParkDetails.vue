<script setup>
import { fetchResponse, getQuery } from '@/assets/fetch'
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import DetailsTemplate from '@/components/DetailsTemplate.vue'
import { useTripsStore } from '@/stores/trips'
import { storeToRefs } from 'pinia'
import router from '@/router'

const props = defineProps({
  parkCode: String,
})

const tripStore = useTripsStore()
const { parkId, parkName, parkcode } = storeToRefs(tripStore)

const park = ref('')
const imageUrl = ref('')
const phoneNumbers = ref()
const emailAddresses = ref()
const hasTTD = ref()
const hasCampgrounds = ref()

async function search() {
  const queryOptions = {
    parkCode: props.parkCode,
    limit: 1,
  }

  const endpoint = `/national-parks${getQuery(queryOptions)}`
  const response = await fetchResponse(endpoint, 'GET')

  if (response.status == 200) {
    const data = await response.json()
    park.value = data.data[0]
    phoneNumbers.value = park.value.contacts.phoneNumbers
    emailAddresses.value = park.value.contacts.emailAddresses
    populateImageUrl(data.data[0].images)
    searchTTD()
    searchCampgrounds()
  } else console.log(response.status)
}

async function searchTTD() {
  const queryOptions = {
    parkCode: props.parkCode,
    limit: 1,
  }

  const endpoint = `/things-to-do${getQuery(queryOptions)}`
  const response = await fetchResponse(endpoint, 'GET')

  if (response.status == 200) {
    const data = await response.json()
    hasTTD.value = data.data.length > 0
  } else console.log(response.status)
}

async function searchCampgrounds() {
  const queryOptions = {
    parkCode: props.parkCode,
    limit: 15,
  }

  const endpoint = `/campgrounds${getQuery(queryOptions)}`
  const response = await fetchResponse(endpoint, 'GET')

  if (response.status == 200) {
    const data = await response.json()
    hasCampgrounds.value = data.data.length > 0
  } else console.log(response.status)
}

function populateImageUrl(images) {
  let numImages = images.length
  let imageIndex = Math.floor(Math.random() * numImages)
  imageUrl.value = images[imageIndex].url
}

function addPark() {
  if (router.currentRoute.value.name == 'addPark') {
    parkId.value = park.value.id
    parkName.value = park.value.name
    parkcode.value = park.value.parkCode
    router.push({ name: 'createTrip' })
  }
}

search()
</script>

<template>
  <DetailsTemplate>
    <template #header-grid>
      <a class="material-symbols-outlined" @click="router.back">arrow_back </a>
      <h2 class="heading header-grid__heading">Park</h2>
      <a class="material-symbols-outlined" @click="addPark">add</a>
    </template>

    <template #image>
      <div class="image-card" :style="{ backgroundImage: `url(${imageUrl})` }"></div>
    </template>

    <template #title>
      <h2 class="center-text">{{ park.fullName }}</h2>
    </template>

    <template #description>
      <p>{{ park.description }}</p>
    </template>

    <template #other-info>
      <div class="row">
        <h4>States:</h4>
        <span>{{ park.states }}</span>
      </div>
      <div class="row">
        <h4>Phone:</h4>
        <span v-for="number in phoneNumbers" :key="number.id">{{ number.phoneNumber }}</span>
      </div>
      <div class="row">
        <h4>Email:</h4>
        <span v-for="email in emailAddresses" :key="email.id">{{ email.emailAddress }}</span>
      </div>
    </template>

    <template #links>
      <RouterLink
        :to="{ path: `${router.currentRoute.value.fullPath}/campgrounds` }"
        v-if="hasCampgrounds"
        >Campgrounds</RouterLink
      >
      <RouterLink :to="{ path: `/parks/${park.parkCode}/activities` }" v-if="hasTTD"
        >Activities</RouterLink
      >
      <a :href="park.url" target="_blank">Site</a>
    </template>
  </DetailsTemplate>
</template>

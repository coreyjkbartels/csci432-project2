<script setup>
import { fetchResponse, getQuery } from '@/assets/fetch'
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

const props = defineProps({
  parkCode: String,
})

const park = ref('')
const imageUrl = ref('')
const phoneNumbers = ref()
const emailAddresses = ref()

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
  } else console.log(response.status)
}

function populateImageUrl(images) {
  let numImages = images.length
  let imageIndex = Math.floor(Math.random() * numImages)
  imageUrl.value = images[imageIndex].url
}

search()
</script>

<template>
  <div class="main-column main-column--sbtwn height-100">
    <div class="main-column padding-10">
      <div class="header-grid">
        <RouterLink class="material-symbols-outlined" :to="{ name: 'parks' }"
          >arrow_back
        </RouterLink>
        <h2 class="heading header-grid__heading">Park</h2>
        <RouterLink class="material-symbols-outlined" :to="{ name: 'parks' }">add</RouterLink>
      </div>

      <div class="image-card" :style="{ backgroundImage: `url(${imageUrl})` }"></div>
      <h2 class="center-text">{{ park.fullName }}</h2>

      <p>{{ park.description }}</p>
    </div>

    <div class="main-column padding-0 width-100">
      <div class="width-100 padding-10">
        <div class="row">
          <h4>States:</h4>
          <span>{{ park.states }}</span>
        </div>
        <div class="row">
          <h4>Phone Numbers:</h4>
          <span v-for="number in phoneNumbers" :key="number.id">{{ number.phoneNumber }}</span>
        </div>
        <div class="row">
          <h4>Email Addresses:</h4>
          <span v-for="email in emailAddresses" :key="email.id">{{ email.emailAddress }}</span>
        </div>
      </div>

      <div class="nav__links">
        <RouterLink :to="{ path: `/parks/${park.parkCode}/campgrounds` }">Campgrounds</RouterLink>
        <RouterLink :to="{ path: `/parks/${park.parkCode}/activities` }">Activities</RouterLink>
        <a :href="park.url" target="_blank">Link to Site</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nav__links {
  width: 100%;
}
</style>

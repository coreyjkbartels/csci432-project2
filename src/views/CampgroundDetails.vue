<script setup>
import { fetchResponse, getQuery } from '@/assets/fetch'
import router from '@/router'
import { ref } from 'vue'
import DetailsTemplate from '@/components/DetailsTemplate.vue'

const props = defineProps({
  id: String,
})

const campground = ref('')
const imageUrl = ref('')
const phoneNumbers = ref()
const emailAddresses = ref()

async function search() {
  const queryOptions = {
    q: props.id,
    limit: 1,
  }

  const endpoint = `/campgrounds${getQuery(queryOptions)}`
  const response = await fetchResponse(endpoint, 'GET')

  if (response.status == 200) {
    const data = await response.json()
    campground.value = data.data[0]
    phoneNumbers.value = campground.value.contacts.phoneNumbers
    emailAddresses.value = campground.value.contacts.emailAddresses

    populateImageUrl(data.data[0].images)
  } else console.log(response.status)
}

function populateImageUrl(images) {
  imageUrl.value = images[0].url
}

search()
</script>

<template>
  <DetailsTemplate class="main-column--right">
    <template #header-grid>
      <span class="material-symbols-outlined" @click="router.back"> arrow_back </span>
      <h2 class="heading header-grid__heading">Campground</h2>
      <span class="material-symbols-outlined" @click="router.back"> add </span>
    </template>

    <template #image>
      <div class="image-card" :style="{ backgroundImage: `url(${imageUrl})` }"></div>
    </template>

    <template #title>
      <h2 class="center-text">{{ campground.name }}</h2>
    </template>

    <template #description>
      <p>{{ campground.description }}</p>
    </template>

    <template #other-info>
      <div class="row">
        <h4>Phone Numbers:</h4>
        <span v-for="number in phoneNumbers" :key="number.id">{{ number.phoneNumber }}</span>
      </div>
      <div class="row">
        <h4>Email Addresses:</h4>
        <span v-for="email in emailAddresses" :key="email.id">{{ email.emailAddress }}</span>
      </div>
    </template>

    <template #links
      ><a :href="campground.url" style="margin-left: auto" target="_blank"
        >Link to Site</a
      ></template
    >
  </DetailsTemplate>
</template>

<script setup>
import { fetchResponse, getQuery } from '@/assets/fetch'
import router from '@/router'
import { ref } from 'vue'
import DetailsTemplate from '@/components/DetailsTemplate.vue'
import { useTripsStore } from '@/stores/trips'
import { storeToRefs } from 'pinia'

const props = defineProps({
  id: String,
})

const tripStore = useTripsStore()
const { activityIds, activityNames } = storeToRefs(tripStore)

const activity = ref('')
const imageUrl = ref('')

async function search() {
  const queryOptions = {
    id: props.id,
    limit: 1,
  }

  const endpoint = `/things-to-do${getQuery(queryOptions)}`
  const response = await fetchResponse(endpoint, 'GET')

  if (response.status == 200) {
    const data = await response.json()
    activity.value = data.data[0]
    populateImageUrl(data.data[0].images)
  } else console.log(response.status)
}

function populateImageUrl(images) {
  imageUrl.value = images[0].url
}

function addActivity() {
  if (router.currentRoute.value.name == 'addActivity') {
    activityIds.value.push(activity.value.id)
    activityNames.value.push(activity.value.title)
    router.push({ name: 'createTrip' })
  }
}

search()
</script>

<template>
  <DetailsTemplate class="main-column--right">
    <template #header-grid>
      <span class="material-symbols-outlined" @click="router.back"> arrow_back </span>
      <h2 class="heading header-grid__heading">Activity</h2>
      <span class="material-symbols-outlined" @click="addActivity"> add </span>
    </template>

    <template #image>
      <div class="image-card" :style="{ backgroundImage: `url(${imageUrl})` }"></div>
    </template>

    <template #title>
      <h2 class="center-text">{{ activity.title }}</h2>
    </template>

    <template #description>
      <p>{{ activity.shortDescription }}</p>
    </template>

    <template #other-info>
      <div class="row">
        <h4>Location:</h4>
        <span>{{ activity.location }}</span>
      </div>
      <div class="row">
        <h4>Duration:</h4>
        <span>{{ activity.duration }}</span>
      </div>
      <div class="row">
        <h4>Do Fees Apply:</h4>
        <span>{{ activity.doFeesApply }}</span>
      </div>
    </template>

    <template #links
      ><a :href="activity.url" style="margin-left: auto" target="_blank">Link to Site</a></template
    >
  </DetailsTemplate>
</template>

<script setup>
import { fetchResponse, getQuery } from '@/assets/fetch'
import router from '@/router'
import { ref } from 'vue'

const props = defineProps({
  id: String,
})

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
    console.log(activity.value)
  } else console.log(response.status)
}

function populateImageUrl(images) {
  imageUrl.value = images[0].url
}

search()
</script>

<template>
  <div class="main-column main-column--sbtwn main-column--right height-100">
    <div class="main-column padding-0">
      <div class="header-grid">
        <span class="material-symbols-outlined" @click="router.back"> arrow_back </span>
        <h2 class="heading header-grid__heading">Activity</h2>
        <span class="material-symbols-outlined" @click="router.back"> add </span>
      </div>

      <div class="image-card" :style="{ backgroundImage: `url(${imageUrl})` }"></div>
      <h2 class="center-text">{{ activity.title }}</h2>

      <p>{{ activity.shortDescription }}</p>
    </div>

    <div class="main-column padding-0 width-100">
      <div class="width-100">
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
      </div>

      <div class="nav__links">
        <a :href="activity.url" style="align-self: flex-end" target="_blank">Link to Site</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nav__links {
  display: flex;
  justify-content: end;
  width: 100%;
}
</style>

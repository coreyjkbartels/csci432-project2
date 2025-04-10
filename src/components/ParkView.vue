<script setup>
import { fetchResponse, getQuery } from '@/assets/fetch'
import { RouterLink } from 'vue-router'
import router from '@/router'
import { ref } from 'vue'

const props = defineProps({
  parkCode: String,
})

const park = ref('')
const imageUrl = ref('')

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
  <div class="main-column height-100">
    <div>
      <div class="header-grid">
        <span class="material-symbols-outlined" @click="router.back"> arrow_back </span>
        <h2 class="heading header-grid__heading">{{ `${park.fullName}, ${park.states}` }}</h2>
        <span class="material-symbols-outlined" @click="router.back"> add </span>
      </div>

      <div class="park-image" :style="{ backgroundImage: `url(${imageUrl})` }"></div>

      <p>{{ park.description }}</p>
    </div>

    <div class="nav__links">
      <RouterLink :to="{ path: `/parks/${park.parkCode}/campgrounds` }">Campgrounds</RouterLink>
      <RouterLink :to="{ path: `/parks/${park.parkCode}/activities` }">Activities</RouterLink>
      <a :href="park.url" target="_blank">Link to Site</a>
    </div>
  </div>
</template>

<style scoped>
.header-grid {
  margin-bottom: 20px;
}
a {
  font-size: var(--fs-650);
}

.nav__links {
  width: 100%;
}

.contacts {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  width: 100%;
  margin-bottom: 10px;
}

.park-image {
  border-radius: 7px;
  height: 300px;
  margin-bottom: 20px;

  background-size: cover;
  overflow: hidden;
}
</style>

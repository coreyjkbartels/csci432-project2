<script setup>
import { fetchResponse } from '@/assets/fetch'
import router from '@/router'
import { useExcursionStore } from '@/stores/excursions'
import { storeToRefs } from 'pinia'
import { ref, toRaw } from 'vue'

const name = ref('')
const description = ref('')

const excursionStore = useExcursionStore()
const { trips } = storeToRefs(excursionStore)

async function create() {
  const endpoint = '/excursion'
  const data = {
    name: name.value,
    description: description.value,
    trips: getIds(toRaw(trips.value)),
  }

  const response = await fetchResponse(endpoint, 'POST', data)

  if (response.status == 201) {
    const responseData = await response.json()
    console.log(responseData)

    excursionStore.$reset()
    router.push({ name: 'excursions' })
  } else console.log(response.statusText)
}

function getIds(tripObjects) {
  console.log(tripObjects)
  let result = []

  for (let trip of tripObjects) {
    result.push(trip._id)
  }

  console.log(result)

  return result
}
</script>

<template>
  <div class="main-column">
    <h2 class="heading">Create Excursion</h2>

    <form class="width-100" onsubmit="return false">
      <li class="form__field">
        <label for="name">Name</label>
        <input type="text" v-model="name" name="name" id="name" />
      </li>

      <li class="form__field">
        <label for="description">Description</label>
        <textarea name="description" id="description" v-model="description"></textarea>
      </li>

      <li class="form__field">
        <div class="row">
          <h3>Trips</h3>
          <RouterLink class="material-symbols-outlined" :to="{ name: 'createTrip' }"
            >add</RouterLink
          >
        </div>
        <ul>
          <li v-for="trip in trips" :key="trip.id">{{ trip.name }}</li>
        </ul>
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

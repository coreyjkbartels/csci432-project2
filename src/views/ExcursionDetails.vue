<script setup>
import { fetchResponse, getQuery } from '@/assets/fetch'
import router from '@/router'
import { onMounted, ref } from 'vue'

const props = defineProps({
  excursion_id: String,
})

const excursion = ref('')

const users = ref([])
const invitedUsers = ref([])
const showInviteUserForm = ref(false)

async function getExcursion() {
  const endpoint = `/excursion/${props.excursion_id}`
  const response = await fetchResponse(endpoint, 'GET')

  if (response.status == 200) {
    const data = await response.json()
    excursion.value = data.excursion[0]
  } else console.log(response.status)
}

async function deleteExcursion() {
  const endpoint = `/excursion/${props.excursion_id}`
  const response = await fetchResponse(endpoint, 'DELETE')

  if (response.status == 200) {
    router.push({ name: 'excursions' })
  } else console.log(response.status)
}

async function loadUsers() {
  const queryParameters = {
    limit: 15,
  }

  const endpoint = `/users${getQuery(queryParameters)}`
  const response = await fetchResponse(endpoint, 'GET')

  if (response.status == 200) {
    users.value = await response.json()
    showInviteUserForm.value = true
  }
}

async function inviteUsers() {
  const endpoint = `/share/excursion/${props.excursion_id}`
  for (let user of invitedUsers.value) {
    const data = {
      friendId: user,
    }

    const response = await fetchResponse(endpoint, 'POST', data)
    if (response.status == 201) {
      const responseData = await response.json()
      console.log(responseData)
      showInviteUserForm.value = false
    } else console.log(response.status)
  }
}

onMounted(() => {
  getExcursion()
})
</script>

<template>
  <div class="main-column height-100">
    <div class="header-grid">
      <span class="material-symbols-outlined" @click="router.back"> arrow_back </span>
      <h2 class="heading header-grid__heading">{{ excursion.name }}</h2>
      <RouterLink class="material-symbols-outlined" :to="{ name: 'createTrip' }">add</RouterLink>
    </div>

    <div class="width-100">
      <h3>Description</h3>
      <p class="width-100">{{ excursion.description }}</p>
    </div>
    <div class="width-100">
      <h3>Trips</h3>
      <ul>
        <RouterLink
          class="list-link"
          v-for="trip in excursion.trips"
          :key="trip.id"
          :to="{ path: `/trips/${trip._id}` }"
          >{{ trip.name }}</RouterLink
        >
      </ul>
    </div>

    <a @click="loadUsers">Add Participants</a>
    <a @click="deleteExcursion">Delete</a>

    <form onsubmit="return false" v-if="showInviteUserForm">
      <ul>
        <li v-for="user in users" :key="user.id" class="row">
          <input type="checkbox" :value="user._id" :id="user._id" v-model="invitedUsers" />
          <label :for="user._id">{{ user.userName }}</label>
        </li>
      </ul>

      <button type="button" @click="inviteUsers">Submit</button>
    </form>
  </div>
</template>

<style scoped>
.main-column {
  align-items: flex-start;
}

input {
  width: auto;
}
</style>

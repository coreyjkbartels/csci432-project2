<script setup>
import { fetchResponse, getQuery } from '@/assets/fetch'
import router from '@/router'
import { onMounted, ref } from 'vue'

const props = defineProps({
  excursion_id: String,
})

const excursion = ref('')
const host = ref()
const userName = ref(localStorage.getItem('userName'))

const users = ref([])
const invitedUsers = ref([])
const showInviteUserForm = ref(false)

async function getExcursion() {
  const endpoint = `/excursion/${props.excursion_id}`
  const response = await fetchResponse(endpoint, 'GET')

  if (response.status == 200) {
    const data = await response.json()
    excursion.value = data.excursion[0]
    host.value = excursion.value.host[0].userName
  } else console.log(response.status)
}

async function deleteExcursion() {
  if (!confirm('Are you sure you want to delete this excursion?')) return

  const endpoint = `/excursion/${props.excursion_id}`
  const response = await fetchResponse(endpoint, 'DELETE')

  if (response.status == 200) {
    router.push({ name: 'excursions' })
  } else console.log(response.status)
}

async function loadUsers() {
  const queryParameters = {
    limit: 70,
  }

  const endpoint = `/users${getQuery(queryParameters)}`
  const response = await fetchResponse(endpoint, 'GET')

  if (response.status == 200) {
    users.value = await response.json()
    showInviteUserForm.value = true
  }
}

async function inviteUsers() {
  showInviteUserForm.value = false
  const endpoint = `/share/excursion/${props.excursion_id}`
  for (let user of invitedUsers.value) {
    const data = {
      friendId: user,
    }

    const response = await fetchResponse(endpoint, 'POST', data)
    if (response.status == 201) {
      const responseData = await response.json()
      console.log(responseData)
    } else console.log(response.status)
  }
}

async function leaveExcursion() {
  if (!confirm('Are you sure you want to leave this excursion?')) return

  const endpoint = `/leave/excursions/${props.excursion_id}`
  const response = await fetchResponse(endpoint, 'DELETE')

  if (response.status == 200) {
    router.push({ name: 'excursions' })
  }
}

async function removeParticipant(participantId) {
  const data = {
    participantId: participantId,
  }
  const endpoint = `/remove/excursions/${props.excursion_id}`

  const response = await fetchResponse(endpoint, 'DELETE', data)

  if (response.status == 200) {
    getExcursion()
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

    <div class="width-100 padding-10">
      <h3>Description</h3>
      <p class="width-100">{{ excursion.description }}</p>
    </div>

    <div class="width-100">
      <h3 class="padding-10">Trips</h3>
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

    <div class="width-100 padding-10" v-if="host != userName">
      <h3>Host</h3>
      <span>{{ host }}</span>
    </div>

    <div class="width-100 padding-10">
      <div class="row">
        <h3>Participants</h3>
        <a @click="loadUsers" class="material-symbols-outlined">add</a>
      </div>

      <ul>
        <li
          class="row row--space-between width-100"
          v-for="participant in excursion.participants"
          :key="participant.key"
        >
          <span>{{ participant.userName }}</span>
          <a class="material-symbols-outlined" @click="removeParticipant(participant._id)"
            >remove</a
          >
        </li>
      </ul>
    </div>

    <form class="width-100" onsubmit="return false" v-if="showInviteUserForm">
      <ul class="width-100">
        <li v-for="user in users" :key="user.id" class="row">
          <input type="checkbox" :value="user._id" :id="user._id" v-model="invitedUsers" />
          <label :for="user._id">{{ user.userName }}</label>
        </li>
      </ul>

      <button type="button" @click="inviteUsers">Submit</button>
    </form>

    <div class="row row--space-between width-100 padding-10">
      <button class="red-button" @click="leaveExcursion">Leave</button>
      <button class="red-button" @click="deleteExcursion">Delete</button>
    </div>
  </div>
</template>

<style scoped>
.main-column {
  align-items: flex-start;
}

input {
  width: auto;
}

form > ul {
  margin-bottom: 20px;
  padding: 5px;
  border: 0.5px solid white;
  border-radius: 7px;
}
</style>

<script setup>
import { fetchResponse } from '@/assets/fetch'
import router from '@/router'
import { ref, onMounted } from 'vue'

const excursions = ref([])
const invites = ref([])
const userName = ref(localStorage.getItem('userName'))

async function getExcursions() {
  const endpoint = '/excursions'
  const response = await fetchResponse(endpoint, 'GET')

  if (response.status == 200) {
    const data = await response.json()
    excursions.value = data.excursions
  } else console.log(response.status)
}

async function getInvites() {
  const endpoint = '/share/excursions'
  const response = await fetchResponse(endpoint, 'GET')

  if (response.status == 200) {
    const responseData = await response.json()
    invites.value = responseData.excursionInvites
  } else console.log(response.status)
}

async function handleInvite(accepted, inviteId) {
  const data = {
    isAccepted: accepted,
  }

  const endpoint = `/share/excursions/${inviteId}`
  const response = await fetchResponse(endpoint, 'PATCH', data)

  getExcursions()
  getInvites()
}

async function revokeInvitation(inviteId) {
  if (!confirm('Are you sure you want to revoke this invitation?')) return

  const endpoint = `/share/excursions/${inviteId}`
  const response = await fetchResponse(endpoint, 'DELETE')

  getExcursions()
  getInvites()
}
onMounted(() => {
  getExcursions()
  getInvites()
})
</script>

<template>
  <div class="main-column height-100">
    <div class="header-grid">
      <span class="material-symbols-outlined" @click="router.back"> arrow_back </span>
      <h2 class="heading header-grid__heading">Excursions</h2>
      <span class="material-symbols-outlined" @click="router.push({ name: 'createExcursion' })">
        add
      </span>
    </div>

    <ul class="height-100" v-if="excursions.length > 0">
      <a
        v-for="excursion in excursions"
        :key="excursion.id"
        @click="router.push({ path: `/excursions/${excursion._id}` })"
      >
        {{ excursion.name }}
      </a>
    </ul>

    <h3 class="align-left padding-10">Invites</h3>
    <ul class="invites">
      <div v-for="invite in invites" :key="invite.key" class="invite-card">
        <h3>{{ invite.excursion[0].name }}</h3>

        <div>
          <p>{{ invite.excursion[0].description }}</p>
          <span v-if="invite.sender[0].userName != userName"
            >From: {{ invite.sender[0].userName }}</span
          >
          <span v-if="invite.sender[0].userName == userName"
            >To: {{ invite.receiver[0].userName }}</span
          >
        </div>

        <div class="row" v-if="invite.sender[0].userName != userName">
          <button @click="handleInvite(true, invite._id)">Accept</button>
          <button @click="handleInvite(false, invite._id)">Decline</button>
        </div>

        <button
          class="red-button"
          @click="revokeInvitation(invite._id)"
          v-if="invite.sender[0].userName == userName"
        >
          Revoke
        </button>
      </div>
    </ul>
  </div>
</template>

<style scoped>
a {
  display: block;
  width: 95%;
}

.invite-card {
  margin-bottom: 10px;
  padding: 20px 25px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  gap: 10px;
}

.invites {
  max-height: 500px;
}

.align-left {
  align-self: flex-start;
}
</style>

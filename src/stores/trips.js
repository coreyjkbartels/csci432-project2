import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTripsStore = defineStore('trips', () => {
  const name = ref('')
  const description = ref('')
  const startDate = ref('')
  const endDate = ref('')
  const parkId = ref('')
  const parkName = ref('')

  function $reset() {
    name.value = ref('')
    description.value = ref('')
    startDate.value = ref('')
    endDate.value = ref('')
    parkId.value = ref('')
    parkName.value = ref('')
  }
  return { name, description, startDate, endDate, parkId, parkName, $reset }
})

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTripsStore = defineStore('trips', () => {
  const name = ref('')
  const description = ref('')
  const startDate = ref('')
  const endDate = ref('')
  const parkId = ref('')
  const parkName = ref('')
  const campgroundName = ref('')
  const campgroundId = ref('')
  const activityIds = ref([])
  const activityNames = ref([])
  const parkcode = ref('')

  function $reset() {
    name.value = ref('')
    description.value = ref('')
    startDate.value = ref('')
    endDate.value = ref('')
    parkId.value = ref('')
    parkName.value = ref('')
    campgroundName.value = ref('')
    campgroundId.value = ref('')
    activityIds.value = ref([])
    activityNames.value = ref([])
    parkcode.value = ref('')
  }
  return {
    name,
    description,
    startDate,
    endDate,
    parkId,
    parkcode,
    parkName,
    campgroundName,
    campgroundId,
    activityIds,
    activityNames,
    $reset,
  }
})

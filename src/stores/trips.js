import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTripsStore = defineStore('trips', () => {
  const trip = ref({})

  function $reset() {
    console.log('reset success')

    trip.value = {}
  }
  return { trip, $reset }
})

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useExcursionStore = defineStore('excursions', () => {
  const trips = ref([])

  function $reset() {
    trips.value = ref([])
  }
  return { trips, $reset }
})

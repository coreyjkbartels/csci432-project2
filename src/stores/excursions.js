import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useExcursionStore = defineStore('excursions', () => {
  const excursion = ref({
    trips: [],
  })

  function $reset() {
    console.log('reset success')

    excursion.value = {
      trips: [],
    }
  }
  return { excursion, $reset }
})

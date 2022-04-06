import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  id: 'main',
  state: () => {
    return {
      ranges: [
        { id: 'scale', value: 2 },
        { id: 'translate', value: 5}
      ],
      constants: {
        TRANSLATE: 'translate',
        SCALE: 'scale'
      }
    }
  },
  actions: {
    changeRange(id, newValue, scene) {
      const range = this.ranges.find(range => range.id === id)
      range.value = newValue
      scene?.changeRange({ propertyToChange: id, range: newValue })
    }
  },

  getters: {
    getRange(state) {
      return (id) => state.ranges.find(range => range.id === id).value
    }
  }
})
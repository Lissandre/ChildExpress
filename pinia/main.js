import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  id: 'main',
  state: () => {
    return {
      ranges: [
        { id: 'scale', value: 2 },
        { id: 'position', value: 5 },
        { id: 'rotation', value: 2 }
      ],
      constants: {
        POSITION: 'position',
        SCALE: 'scale',
        ROTATION: 'rotation',
      },
      activeForm: 1,
      totalForms: 2,
      isHealthy: true,
      isFace: true,
    }
  },
  actions: {
    changeActiveForm(newValue) {
      console.log(newValue)
      this.activeForm = newValue
    },
    changeRange(id, newValue) {
      const range = this.ranges.find(range => range.id === id)
      range.value = newValue
      this.$nuxt.$scene?.changeRange({ propertyToChange: id, range: newValue })
    },
    toggleIsHealthy(newValue) {
      this.isHealthy = newValue
      this.$nuxt.$scene.camera?.changeScene({isHealthy: newValue})
    },
  
    toggleIsFace(newValue) {
      this.isFace = newValue
      this.$nuxt.$scene?.changeFocus({isFace: newValue})
    }
  },

  getters: {
    getActiveForm() {
      return this.activeForm
    },
    getTotalForms() {
      return this.totalForms
    },
    getRange(state) {
      return (id) => state.ranges.find(range => range.id === id).value
    },
    isHealthy(state) {
      return state.isHealthy
    },
    isFace(state) {
      return state.isFace
    }
  }
})
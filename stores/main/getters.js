export const getters = {
  getActiveForm() {
    return this.activeForm
  },
  getTotalForms() {
    return this.totalForms
  },
  getRange(state) {
    return (id) => state.ranges.find((range) => range.id === id).value
  },
  isHealthy(state) {
    return state.isHealthy
  },
  isFace(state) {
    return state.isFace
  },
}

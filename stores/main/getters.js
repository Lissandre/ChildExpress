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
}

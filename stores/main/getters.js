export const getters = {
  getActiveForm() {
    return this.activeForm
  },
  getTotalForms() {
    return this.totalForms
  },
  getJobs() {
    return this.job
  },
  getRange(state) {
    return (id) => state.ranges.find((range) => range.id === id).value
  },
  isHealthy() {
    return this.health
  },
  isFace() {
    return this.face
  },
}

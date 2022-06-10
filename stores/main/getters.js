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
  getXtras(state) {
    return (id) => state.xtras.find((xtra) => xtra.value === true).id
  },
  getRange(state) {
    return (id) => state.ranges.find((range) => range.id === id).value
  },
  getText(state) {
    return (id) => state.texts.find((text) => text.id === id).value
  },
  getCounter(state) {
    return (id) => state.counters.find((counter) => counter.id === id).value
  },
  getRoundSlider(state) {
    return (id) => state.roundSliders.find((roundSlider) => roundSlider.id === id).value
  },
  isHealthy() {
    return this.health
  },
  isFace() {
    return this.face
  },
}

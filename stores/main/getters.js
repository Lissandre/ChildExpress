export const getters = {
  getActiveForm() {
    return this.activeForm
  },
  getTotalForms() {
    return this.totalForms
  },
  getJob() {
    return this.newJob
  },
  getXtras(state) {
    return (id) => state.checkboxs.find((xtra) => xtra.id === id).value
  },
  getRadio(state) {
    return (id) => state.radios.find((radio) => radio.id === id).value
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
    return (id) =>
      state.roundSliders.find((roundSlider) => roundSlider.id === id).value
  },
  isHealthy() {
    return this.health
  },
  isFace() {
    return this.face
  },
}

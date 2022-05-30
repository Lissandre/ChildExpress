export default class Sounds {
  constructor(options) {
    // Set options
    this.store = options.store

    // Set up
    this.getEvent()
  }
  getEvent() {
    $nuxt.$on('updateSound', (step, type, name, value) => {
      if (value <= 0.2) {
        this.store.updateSubtitle(`${step}_${name}_small`)
      } else if (value <= 0.8) {
        this.store.updateSubtitle(`${step}_${name}_big`)
      }
    })
  }
}

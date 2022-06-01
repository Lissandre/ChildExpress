export default class Sounds {
  constructor(options) {
    // Set options
    this.store = options.store

    // Set up
    this.getEvent()
  }
  getEvent() {
    $nuxt.$on('updateSound', (step, type, name, value) => {
      console.log(step, name)
      console.log(type)
      // If speech
      if(type === 'speech') {
        console.log('speech')
        this.store.updateSubtitle(`${step}_${name}_${value}`)
      }
      // If checkbox

      if(type === 'checkbox') {

      }

      if(type === 'radio') {
        if(name === 'gender') {
          // Check 1 ou 2 ou 3
        }
      }


      if (value <= 0.2) {
        this.store.updateSubtitle(`${step}_${name}_small`)
      } else if (value >= 0.8) {
        this.store.updateSubtitle(`${step}_${name}_big`)
      }
      // If radio, divide by length in the radio input

      // If unfilled, check length of array, that is fill when inputs are touched
    })
  }
}

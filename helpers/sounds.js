export default class Sounds {
  constructor(options) {
    // Set options
    this.store = options.store


    // Some booleans
    this.selectChange = false

    // Set up
    this.getEvent()
  }
  getEvent() {
    $nuxt.$on('updateSound', (step, type, name, value) => {
      console.log(step, name)
      console.log(type)
      // If speech

      switch (type) {
        case 'speech':
          this.store.updateSubtitle(`${step}_${name}_${value}`)
          break;
        case 'checkbox':
            this.store.updateSubtitle(`${step}_${name}_true`)
          break;
        case 'text':
          this.store.updateSubtitle(`${step}_${type}_${name}`)
          break;
        case 'select':
          if (this.selectChange && (value >= 90 && value <= 150)) {
            this.store.updateSubtitle(`${step}_${name}_change`)
            return;
          } else if (value <= 90) {
            this.store.updateSubtitle(`${step}_${name}_small`)
            this.selectChange = true
            return;
          } else if (value >= 150) {
            this.store.updateSubtitle(`${step}_${name}_big`)
            this.selectChange = true
            return;
          }
          break;
        case 'range':
          if (name === 'skinTint') {
            if (value === 'different') {
              this.store.updateSubtitle(`${step}_${name}_different`)
              return;
            } else {
              this.store.updateSubtitle(`${step}_${name}_small`)
              return;
            }
          } else if (name === "skinType") {
            this.store.updateSubtitle(`${step}_${name}_change`)
            return;
          } else {
            this.defaultCase(value, step, name)
          }
          break;
        case 'face':
          this.store.updateSubtitle(`${step}_${type}_change`)
          break;
        // If radio, divide by length in the radio input
        case 'radio':
          console.log(value, step, name)
          if (name === 'gender') {
            if (value === '0') {
              this.store.updateSubtitle(`${step}_${name}_man`)
              return;
            } else if (value === '0.5') {
              this.store.updateSubtitle(`${step}_${name}_woman`)
              return;
            } else if (value === '1') {
              this.store.updateSubtitle(`${step}_${name}_nonbinary`)
              return;
            }
          } else if (step === 'form3' && name === 'creativeLogic') {
            this.store.updateSubtitle(`${step}_${name}_change`)
            return;
          } else if (step === 'form3' && value.length === 4) {
            console.log(value)
            this.store.updateSubtitle(`${step}_${name}_${this.jobAssociation(value)}`)
            return;
          } else {
            this.defaultCase(value, step, name)
            return;
          }
          break;
        default:
          this.defaultCase(value, step, name)
          break;
      }

      // If unfilled, check length of array, that is fill when inputs are touched
    })
  }
  defaultCase(value, step, name) {
    if (value <= 0.2) {
      this.store.updateSubtitle(`${step}_${name}_small`)
    } else if (value >= 0.8) {
      this.store.updateSubtitle(`${step}_${name}_big`)
    }
  }

  jobAssociation(value) {
    switch (value) {
      case '1000':
        return 'lawyer';
      case '1001':
        return 'engineer';
      case '1010':
        return 'tinder';
      case '1011':
        return 'musician';
      case '1100':
        return 'rap';
      case '1101':
        return 'doctor';
      case '1110':
        return 'mason';
      case '1111':
        return 'NFT';
      case '0111':
        return 'homeless';
      case '0011':
        return 'influencer';
      case '0101':
        return 'crypto';
      case '0110':
        return 'footballer';
      case '0001':
        return 'president';
      case '0100':
        return 'facetime';
      case '0010':
        return 'estate';
      case '0000':
        return 'chatbot';
    }
  }
}

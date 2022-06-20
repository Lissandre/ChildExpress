import { useStore } from '@/stores'

export default class Helpers {
  constructor() {
    this.store = useStore()
  }

  updateInput(type, name, value, step) {
    switch (type) {
      case 'range':
        this.store.changeRange(
          this.store.constants[name.toUpperCase()],
          value,
          step
        )
        break
      case 'color':
        this.store.changeColor(
          this.store.constants[name.toUpperCase()],
          value,
          step
        )
        break
      case 'radio':
        this.store.changeRadio(
          this.store.constants[name.toUpperCase()],
          value,
          step
        )
        // this.store.changeJob()
        break
      case 'checkbox':
        this.store.changeCheckbox(
          this.store.constants[name.toUpperCase()],
          value,
          step
        )
        // this.store.changeJob()
        break
      case 'counter':
        this.store.changeCounter(
          this.store.constants[name.toUpperCase()],
          value,
          step
        )
        break
      case 'submit':
        this.store.changeActiveForm()
      default:
        break
    }
  }
}

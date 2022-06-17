import { state } from "./state"

export const actions = {
  changeActiveForm() {
    this.activeForm++
    if (this.activeForm === 2 && this.$nuxt.$scene.assets.needsLoad) {
      this.$nuxt.$scene.assets.on('ressourcesReady', () => {
        this.$nuxt.$scene.init()
      })
    } else if (this.activeForm === 2 && !this.$nuxt.$scene.assets.needsLoad) {
      this.$nuxt.$scene.init()
    }
  },
  changeRange(id, newValue, step) {
    const range = this.ranges.find((range) => range.id === id)
    range.value = newValue

    //if (step != 'form1')
      //this.$nuxt.$scene.world.baby.updateUniform(id, newValue)
  },
  changeColor(id, newValue, step) {
    const color = this.colors.find((color) => color.id === id)
    color.value = newValue
    //if (step != 'form1')
      //this.$nuxt.$scene.world.baby.updateUniform(id, newValue)
  },
  changeRadio(id, newValue, step) {
    const radio = this.radios.find((radio) => radio.id === id)
    radio.value = newValue
    // this.$nuxt.$scene.world.baby.updateUniform(id, newValue)
  },
  changeText(id, newValue) {
    const text = this.texts.find((text) => text.id === id)
    text.value = newValue
  },
  changeCheckbox(id, newValue) {
    console.log('here')
    const checkbox = this.checkboxs.find((checkbox) => checkbox.id === id)
    if (checkbox.value === 0) checkbox.value = 1
    else checkbox.value = 0
    // this.$nuxt.$scene.world.baby.updateUniform(id, newValue)
  },
  changeCounter(id, newValue, step) {
    console.log(id,newValue)
    const counter = this.counters.find((counter) => counter.id === id)
    counter.value = newValue
    //if (step != 'form1')
      //this.$nuxt.$scene.world.baby.updateUniform(id, newValue)
  },
  changeJob(value) {
    this.newJob = value
  },
  changeRoundSlider(id, newValue) {
    const roundSlider = this.roundSliders.find((roundSlider) => roundSlider.id === id)
    roundSlider.value = newValue
    console.log('yes')
    //if (step != 'form1')
      //this.$nuxt.$scene.world.baby.updateUniform(id, newValue)
  },
  changeBox(job, name, xtras, personality, iq, weight, height) {
    // console.log(this.$scene.world.baby.updateUniform('test', "test"))
    console.log(this.$nuxt.$scene.world)
    if (this.$nuxt.$scene.world)
      this.$nuxt.$scene.world.box.createBox(job, name, xtras, personality, iq, weight, height)
  },

  focusBox() {
    this.$nuxt.$scene?.focusOnBox()
  },
  focusBin() {
    this.$nuxt.$scene?.focusOnBin()
  },
  toggleIsHealthy(newValue) {
    this.health = newValue
    this.$nuxt.$scene.camera?.changeScene({ health: newValue })
  },
  toggleIsFace(newValue) {
    this.face = newValue
    this.$nuxt.$scene?.changeFocus({ face: newValue })
  },
  updateSubtitle(id) {
    this.subtitle = id
  },
}

import { state } from './state'

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
    else if (this.activeForm != 2) {

      this.$nuxt.$scene.world.baby.progress = 1 + this.activeForm
    }
  },
  changeRange(id, newValue, step) {
    const range = this.ranges.find((range) => range.id === id)
    range.value = newValue

    if((id === 'hair' || id === 'mouthWidth' | id === 'eyesHeight') && step != 'form1')
      this.$nuxt.$scene.world.baby.updateOneBlend(id, newValue)
    if (step != 'form1')
      this.$nuxt.$scene.world.baby.updateUniform(id, newValue)
  },
  changeColor(id, newValue, step) {
    const color = this.colors.find((color) => color.id === id)
    color.value = newValue
    if (step != 'form1')
      this.$nuxt.$scene.world.baby.updateUniform(id, newValue)
  },
  changeRadio(id, newValue, step) {
    const radio = this.radios.find((radio) => radio.id === id)
    radio.value = newValue
    if (step == 'form2')
      this.$nuxt.$scene.world.baby.updateUniform(id, newValue)

    if (step == 'form3')
      this.$nuxt.$scene.world.baby.updateBlendShapes(id, newValue)

    if(step == 'form3' && id == 'eloquentHonest') {
      console.log('tit', newValue)
      // add this.$nuxt.$scene.world.baby.updateUniform(id, newValue)
    }
  },
  changeText(id, newValue) {
    const text = this.texts.find((text) => text.id === id)
    text.value = newValue
  },
  changeCheckbox(id, newValue) {
    const checkbox = this.checkboxs.find((checkbox) => checkbox.id === id)
    //if (checkbox.value === 0) checkbox.value = 1
    checkbox.value = newValue

    if (id === 'visionary' || id === 'silent' || id === 'independant' || id === 'clean')
      this.$nuxt.$scene.world.baby.setXtras(id, newValue)
  },
  changeCounter(id, newValue, step) {
    const counter = this.counters.find((counter) => counter.id === id)
    counter.value = newValue
    if (step != 'form1')
    this.$nuxt.$scene.world.baby.updateUniform(id, newValue)
  },
  changeJob(value) {
    this.newJob = value
  },
  changeRoundSlider(id, newValue, step) {
    const roundSlider = this.roundSliders.find(
      (roundSlider) => roundSlider.id === id
    )
    roundSlider.value = newValue
    if (step != 'form1' && this.$nuxt.$scene.world)
      this.$nuxt.$scene.world.baby.updateUniform(id, newValue)
  },
  changeCurrentMoney(value) {
    this.currentMoney = value
  },
  changeOverallSize(newValue) {
    this.overallSize = newValue
    this.$nuxt.$scene.world.baby.updateUniform('overallSize', newValue / 8)
  },
  changeBox(job, name, money, xtras, personality, iq, weight, height) {
    if (this.$nuxt.$scene.world)
      this.$nuxt.$scene.world.box.createBox(
        job,
        name,
        money,
        xtras,
        personality,
        iq,
        weight,
        height
      )
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
    console.log(this.face)
    this.$nuxt.$scene?.changeFocus({ face: newValue })
    if (this.face === 'face')
      this.$nuxt.$scene.world.baby.progress = 2
    else if (this.face === 'middle')
      this.$nuxt.$scene.world.baby.progress = 3


  },
  updateSubtitle(id) {
    this.subtitle = id
  },
}

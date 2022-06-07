export const actions = {
  changeActiveForm() {
    this.activeForm++
    console.log(this.activeForm)
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

    if (step != 'form1') this.$nuxt.$scene.world.baby.updateUniform(id, newValue)
  },
  changePicker(id, newValue, step) {
    // const picker = this.pickers.find((picker) => picker.id === id
    // picker.value = newValu
    console.log(newValue)
    // this.$nuxt.$scene.world.baby.updateUniform(id, newValue
  },
  changeRadio(id, newValue, step) {
    // const picker = this.pickers.find((picker) => picker.id === id)
    // picker.value = newValue
    // console.log(newValue)
    // this.$nuxt.$scene.world.baby.updateUniform(id, newValue)
  },
  changeCheckbox(id, newValue) {
    const checkbox = this.checkboxs.find((checkbox) => checkbox.id === id)
    // checkbox.value = newValue
    // console.log(newValue)
    // this.$nuxt.$scene.world.baby.updateUniform(id, newValue)
  },
  changeCounter(id, newValue) {
    if (step != 'form1') this.$nuxt.$scene.world.baby.updateUniform(id, newValue)
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
    console.log(id)
  },
}

export const actions = {
  changeActiveForm() {
    this.activeForm++
    console.log(this.activeForm)
  },
  changeRange(id, newValue) {
    const range = this.ranges.find((range) => range.id === id)
    range.value = newValue
    this.$nuxt.$scene.world.baby.updateUniform(id, newValue)
  },
  changePicker(id, newValue) {
    // const picker = this.pickers.find((picker) => picker.id === id
    // picker.value = newValu
    console.log(newValue)
    // this.$nuxt.$scene.world.baby.updateUniform(id, newValue
  },
  changeRadio(id, newValue) {
    // const picker = this.pickers.find((picker) => picker.id === id)
    // picker.value = newValue
    // console.log(newValue)
    // this.$nuxt.$scene.world.baby.updateUniform(id, newValue)
  },
  toggleIsHealthy(newValue) {
    this.health = newValue
    this.$nuxt.$scene.camera?.changeScene({ health: newValue })
  },
  toggleIsFace(newValue) {
    this.face = newValue
    this.$nuxt.$scene?.changeFocus({ face: newValue })
  },
}

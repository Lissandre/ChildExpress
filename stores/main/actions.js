export const actions = {
  changeActiveForm(newValue) {
    console.log(newValue)
    this.activeForm = newValue
  },
  changeRange(id, newValue, scene) {
    const range = this.ranges.find((range) => range.id === id)
    range.value = newValue
    scene?.changeRange({ propertyToChange: id, range: newValue })
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

export default {
  toggleIsHealthy(state, isHealthy) {
    state.isHealthy = isHealthy
    this.$scene.camera?.changeScene({isHealthy: state.isHealthy})
  },

  toggleIsFace(state, isFace) {
    state.isFace = isFace
    this.$scene?.changeFocus({isFace: state.isFace})
  }
}
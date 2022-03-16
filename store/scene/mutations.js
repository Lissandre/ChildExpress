export default {
  toggleIsHealthy(state, isHealthy) {
    state.isHealthy = isHealthy
    this.$scene.camera?.changeScene({isHealthy: state.isHealthy})
  }
}
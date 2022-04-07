export default {
    changeRange(state, id, newValue) {
        console.group(state[id], newValue)
        state[id] = newValue
        this.$scene?.changeRange({ range: state[id] })
    }
}
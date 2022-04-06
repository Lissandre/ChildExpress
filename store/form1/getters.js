export default {
    getRange(state) {
        console.log(state, id)
        return state[id]
    }

    /*getRange: (state) => (id) => {
    console.log(state, id)
    return state.ranges.find(range => range.id === id)
}*/
}
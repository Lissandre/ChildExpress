// import { state } from './state'
import properties from '@/data/dbModData'

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
    this.setDatabase()
  },
  changeRange(id, newValue, step) {
    const range = this.ranges.find((range) => range.id === id)
    range.value = newValue

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
  },
  changeText(id, newValue) {
    const text = this.texts.find((text) => text.id === id)
    text.value = newValue
  },
  changeCheckbox(id, newValue) {
    const checkbox = this.checkboxs.find((checkbox) => checkbox.id === id)
    //if (checkbox.value === 0) checkbox.value = 1
    checkbox.value = newValue

    if (
      id === 'visionary' ||
      id === 'silent' ||
      id === 'independant' ||
      id === 'clean'
    )
      this.$nuxt.$scene.world.baby.setXtras(id, newValue)
  },
  changeCounter(id, newValue, step) {
    const counter = this.counters.find((counter) => counter.id === id)
    counter.value = newValue
    //if (step != 'form1')
    //this.$nuxt.$scene.world.baby.updateUniform(id, newValue)
  },
  changeJob(value) {
    this.newJob = value
  },
  changeRoundSlider(id, newValue, step) {
    const roundSlider = this.roundSliders.find(
      (roundSlider) => roundSlider.id === id
    )
    roundSlider.value = newValue
    // A DECOMMENTER LEITH
    // if (step != 'form1')
    //this.$nuxt.$scene.world.baby.updateUniform(id, newValue)
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
    this.$nuxt.$scene?.changeFocus({ face: newValue })
  },
  updateSubtitle(id) {
    this.subtitle = id
  },
  setUserValues(step, formData) {
    const tempForm = require(`@/data/forms/form${step}.json`)
    Object.keys(tempForm.inputs).forEach((key) => {
      if (tempForm.inputs[key]['name'] != 'submit') {
        this.userState[tempForm.inputs[key]['name']] = formData.get(
          tempForm.inputs[key]['name']
        )
      }
    })
    console.log(this.userState)
  },
  setDatabase() {
    Object.keys(properties.properties).forEach((key) => {
      if (properties.properties[key].hasOwnProperty('rich_text')) {
        properties.properties[key].rich_text[0].plain_text =
          this.userState[key] || ''
        properties.properties[key].rich_text[0].text.content =
          this.userState[key] || ''
      } else {
        properties.properties[key].title[0].plain_text =
          this.userState[key] || ''
        properties.properties[key].title[0].text.content =
          this.userState[key] || ''
      }
    })

    const data = JSON.stringify({
      parent: { database_id: 'ac8c6a801c3d4f5a80136c862373545d' },
      properties: properties.properties,
    })

    this.$nuxt.$axios.setToken(process.env.TOKEN, 'Bearer')
    this.$nuxt.$axios.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    this.$nuxt.$axios.$post('/api/pages/', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
}

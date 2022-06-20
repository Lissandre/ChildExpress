import { AxesHelper, Object3D } from 'three'

import AmbientLightSource from './AmbientLight'
import PointLightSource from './PointLight'
import Spotlights from './Spotlights'
import Cube from './Cube'
import Baby from './Baby'
import Box from './Box'
import Bin from './Bin'

export default class World {
  constructor(options) {
    // Set options
    this.time = options.time
    this.assets = options.assets
    this.debug = options.debug

    // Set up
    this.container = new Object3D()
    this.container.name = 'World'

    if (this.debug) {
      this.container.add(new AxesHelper(5))
      this.debugFolder = this.debug.addFolder({
        title: 'World',
        expanded: true,
      })
    }

    this.init()
  }
  init() {
    this.setAmbientLight()
    this.setPointLight()
    // this.setCube()
    this.setBaby()
    this.setBox()
    this.setBin()
  }
  setAmbientLight() {
    this.ambientlight = new AmbientLightSource({
      debug: this.debugFolder,
    })
    this.container.add(this.ambientlight.container)
  }
  setPointLight() {
    this.light = new PointLightSource({
      debug: this.debugFolder,
    })
    console.log(this.light)
    // this.container.add(this.light.container)
  }
  setSpotLights() {
    this.spotlights = new Spotlights({})
    this.container.add(this.spotlights.container)
  }
  setCube() {
    this.cube = new Cube({
      time: this.time,
    })
    this.container.add(this.cube.container)
  }
  setBaby() {
    this.baby = new Baby({
      time: this.time,
      assets: this.assets,
      debug: this.debugFolder,
    })
    this.container.add(this.baby.container)
  }
  setBox() {
    this.box = new Box({
      time: this.time,
      assets: this.assets,
    })
    this.container.add(this.box.container)
  }
  setBin() {
    this.bin = new Bin({
      time: this.time,
      assets: this.assets,
    })
    this.container.add(this.bin.container)
  }
}

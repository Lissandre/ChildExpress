import { AxesHelper, Object3D } from 'three'

import AmbientLightSource from './AmbientLight'
import PointLightSource from './PointLight'
import Baby from './Baby'

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
        expanded: false,
      })
    }

    this.init()
  }
  init() {
    this.setAmbientLight()
    this.setPointLight()
    this.setBaby()
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
    this.container.add(this.light.container)
  }
  setBaby() {
    this.baby = new Baby({
      time: this.time,
      assets: this.assets,
    })
    this.container.add(this.baby.container)
  }
}

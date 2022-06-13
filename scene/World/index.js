import { AxesHelper, Object3D } from 'three'

import AmbientLightSource from './AmbientLight'
import PointLightSource from './PointLight'
import Cube from './Cube'
import Baby from './Baby'
import Box from './Box'

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
        expanded: false
      })
    }

    this.init()

    console.log('initWorld')
  }
  init() {
    this.setAmbientLight()
    this.setPointLight()
    // this.setCube()
    // this.setBaby()
    this.setBox()
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
  setCube() {
    this.cube = new Cube({
      time: this.time,
    })
    this.container.add(this.cube.container)
  }
  setBaby() {
    this.baby = new Baby({
      time: this.time,
      assets: this.assets
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
}
import { Scene, sRGBEncoding, WebGLRenderer } from 'three'

import { Pane } from 'tweakpane'
import * as EssentialsPlugin from '@tweakpane/plugin-essentials';
import * as CamerakitPlugin from '@tweakpane/plugin-camerakit';

import Sizes from './Tools/Sizes'
import Time from './Tools/Time'

import Camera from './Camera'
import World from './World'

export default class App {
  constructor(options) {
    // Set options
    this.debug = true
    this.time = new Time()
    this.sizes = new Sizes()
  }
  init(element) {
    this.elementApp = element
    // Set up
    this.setConfig()
    this.setRenderer()
    this.setCamera()
    this.setWorld()
  }
  setRenderer() {
    // Set scene
    this.scene = new Scene()
    // Set renderer
    this.renderer = new WebGLRenderer({
      canvas: this.elementApp,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    // this.elementApp.append(this.renderer.domElement)
    this.renderer.outputEncoding = sRGBEncoding
    // this.renderer.gammaFactor = 2.2
    // Set background color
    this.renderer.setClearColor(0x000000, 0)
    // Set renderer pixel ratio & sizes
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.sizes.viewport.width, this.sizes.viewport.height)
    // Resize renderer on resize event
    this.sizes.on('resize', () => {
      this.renderer.setSize(
        this.sizes.viewport.width,
        this.sizes.viewport.height
      )
    })

    this.time.on('tick', () => {
      this.debug && this.fpsGraph.begin()

      this.renderer.render(this.scene, this.camera.camera)
    
      this.debug && this.fpsGraph.end()
    })

    if (this.debug) {
      this.renderOnBlur = { activated: true }
      const folder = this.debug.addFolder({
        title: 'Renderer',
        expanded: false
      })
      folder
        .addInput(this.renderOnBlur, 'activated', {
          label: 'Opti'
        })
    }
  }
  setCamera() {
    // Create camera instance
    this.camera = new Camera({
      sizes: this.sizes,
      renderer: this.renderer,
      debug: this.debug,
    })
    // Add camera to scene
    this.scene.add(this.camera.container)
  }
  setWorld() {
    // Create world instance
    this.world = new World({
      time: this.time,
      debug: this.debug,
    })
    // Add world to scene
    this.scene.add(this.world.container)
  }
  setConfig() {
    if (this.debug === true) {
      this.debug = new Pane({
        title: 'DEBUG',
        expanded: false,
      })
      this.debug.containerElem_.classList.add('z-50')

      this.debug.registerPlugin(EssentialsPlugin)
      this.debug.registerPlugin(CamerakitPlugin)

      this.fpsGraph = this.debug.addBlade({
        view: 'fpsgraph',
        label: 'FPS',
        lineCount: 2,
      })
    }
  }
}
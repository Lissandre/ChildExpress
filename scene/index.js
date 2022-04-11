import { Scene, sRGBEncoding, WebGLRenderer, Vector3 } from 'three'

import gsap, { Power3 } from 'gsap'

import { Pane } from 'tweakpane'
import * as EssentialsPlugin from '@tweakpane/plugin-essentials';
import * as CamerakitPlugin from '@tweakpane/plugin-camerakit';

import Sizes from './Tools/Sizes'
import Time from './Tools/Time'
import Loader from './Tools/Loader'

import Camera from './Camera'
import World from './World'

export default class App {
  constructor(options) {
    // Set options
    this.debug = true
    this.time = new Time()
    this.sizes = new Sizes()
    this.assets = new Loader({
      template: `
        <div class="loaderScreen">
        <div class="loaderScreen__progressBar">
            <div class="loaderScreen__progress"></div>
        </div>
        <h1 class="loaderScreen__load">0%</h1>
        <div class="loaderScreen__progressBar">
            <div class="loaderScreen__progress"></div>
        </div>
        </div>
    `
    })


  }
  init(options) {

    this.elementApp = options.canvas
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

    this.renderer.setSize(this.elementApp.parentNode.offsetWidth, this.elementApp.parentNode.offsetHeight)

    // Resize renderer on resize event
    this.sizes.on('resize', () => {
      this.renderer.setSize(this.elementApp.parentNode.offsetWidth, this.elementApp.parentNode.offsetHeight)
    })

    this.time.on('tick', () => {
      this.debug && this.fpsGraph.begin()

      this.camera.camera.controls.update();

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
      parentNode: this.elementApp.parentNode
    })
    // Add camera to scene
    this.scene.add(this.camera.container)
  }
  setWorld() {
    // Create world instance
    this.world = new World({
      time: this.time,
      assets: this.assets,
      debug: this.debug,
    })
    // Add world to scene
    this.scene.add(this.world.container)

  }

  changeFocus(options) {
    this.isFace = options.face
    //const vec = new Vector3(this.camera.camera.position, this.camera.camera.position, this.camera.camera.position)

    if (this.isFace) {
      gsap.to(this.camera.camera.controls.target, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1,
        ease: Power3.easeOut,
      })
    } else {
      gsap.to(this.camera.camera.controls.target, {
        x: 0,
        y: 3,
        z: 0,
        duration: 1,
        ease: Power3.easeOut,
      })
    }
  }

  changeRange(options) {
    const vec = new Vector3(this.world.cube.cube.scale.x, this.world.cube.cube.scale.y, this.world.cube.cube.scale.z)

    gsap.to(
      this.world.cube.cube[options.propertyToChange], {
      x: options.range,
      y: options.range,
      z: options.range,
      duration: 1,
      ease: Power3.easeOut,
    }
    )
  }

  changeRadio(options) {
    gsap.to(
      this.world.cube.cube[options.propertyToChange], {
      x: options.range,
      y: options.range,
      z: options.range,
      duration: 1,
      ease: Power3.easeOut,
    }
    )
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
import { Scene, sRGBEncoding, WebGLRenderer } from 'three'

import gsap, { Power3 } from 'gsap'

import { Pane } from 'tweakpane'
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'
import * as CamerakitPlugin from '@tweakpane/plugin-camerakit'

import Sizes from './Tools/Sizes'
import Time from './Tools/Time'
import Loader from './Tools/Loader'

import Camera from './Camera'
import World from './World'
import Plane from './World/Plane'

export default class App {
  constructor(options) {
    // Set options
    this.debug = false
    this.time = new Time()
    this.sizes = new Sizes()
    this.assets = new Loader()
  }
  init(options) {
    if (this.canvas) {
      this.elementApp = this.canvas
    } else {
      this.elementApp = options.canvas
    }
    // Set up
    if (this.elementApp.id === '_canvas1') {
      this.setConfig()
      this.setScene()
      this.setRenderer()
      this.setRAF()
      this.setCamera()
      this.setWorld()
    } else if (this.elementApp.id === '_canvas2') {
      this.setConfig()
      this.setScene()
      this.setRenderer()
      this.setRAF()
      this.setCamera()
      this.setBackgroundShader()
    } else {
      this.DOMElements = options.DOMElements.querySelectorAll('.viewer')
      this.setMultipleScenes()
      this.setRenderer()
      this.setRAFs()
      this.setCameras()
      this.setWorlds()
    }
  }
  setCanvas(canvas = this.renderer?.canvas) {
    this.canvas = canvas
  }
  setScene() {
    // Set scene
    this.scene = new Scene()
  }
  setRenderer() {
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

    this.renderer.setSize(
      this.renderer.domElement.parentElement.offsetWidth,
      this.renderer.domElement.parentElement.offsetHeight
    )

    // Resize renderer on resize event
    this.sizes.on('resize', () => {
      this.renderer.setSize(
        this.renderer.domElement.parentElement.offsetWidth,
        this.renderer.domElement.parentElement.offsetHeight
      )
    })

    if (this.debug) {
      this.renderOnBlur = { activated: true }
      const folder = this.debug.addFolder({
        title: 'Renderer',
        expanded: false,
      })
      folder.addInput(this.renderOnBlur, 'activated', {
        label: 'Opti',
      })
    }
  }
  setRAF() {
    this.time.on('tick', () => {
      this.debug && this.fpsGraph.begin()

      this.cameraInstance.camera.controls.update()

      this.renderer.render(this.scene, this.cameraInstance.camera)

      this.debug && this.fpsGraph.end()
    })
  }
  setCamera() {
    // Create camera instance
    this.cameraInstance = new Camera({
      sizes: this.sizes,
      renderer: this.renderer,
      debug: this.debug,
    })
    // Add camera to scene
    this.scene.add(this.cameraInstance.container)
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
  setBackgroundShader() {
    this.plane = new Plane({
      time: this.time,
    })
    this.scene.add(this.plane.container)
  }

  changeFocus(options) {
    this.isFace = options.face
    //const vec = new Vector3(this.cameraInstance.camera.position, this.cameraInstance.camera.position, this.cameraInstance.camera.position)

    if (this.isFace) {
      gsap.to(this.cameraInstance.camera.controls.target, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1,
        ease: Power3.easeOut,
      })
    } else {
      gsap.to(this.cameraInstance.camera.controls.target, {
        x: 0,
        y: 3,
        z: 0,
        duration: 1,
        ease: Power3.easeOut,
      })
    }
  }
  changeRange(options) {
    // const vec = new Vector3(this.world.cube.cube.scale.x, this.world.cube.cube.scale.y, this.world.cube.cube.scale.z)
    gsap.to(this.world.cube.cube[options.propertyToChange], {
      x: options.range / 10,
      y: options.range / 10,
      z: options.range / 10,
      duration: 1,
      ease: Power3.easeInOut,
    })
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
  setRAFs() {
    this.time.on('tick', () => {
      this.renderer.setClearColor(0xffffff)
      this.renderer.setScissorTest(false)
      this.renderer.clear()

      this.renderer.setClearColor(0xfafafa)
      this.renderer.setScissorTest(true)

      this.scenes.forEach((scene) => {
        const element = scene.userData.element
        const rect = element.getBoundingClientRect()

        if (
          rect.bottom < 0 ||
          rect.top > this.renderer.domElement.offsetHeight ||
          rect.right < 0 ||
          rect.left > this.renderer.domElement.offsetWidth
        ) {
          return // it's off screen
        }

        const width = rect.right - rect.left
        const height = rect.bottom - rect.top
        const left = rect.left
        const bottom = this.renderer.domElement.offsetHeight - rect.bottom

        this.renderer.setViewport(left, bottom, width, height)
        this.renderer.setScissor(left, bottom, width, height)

        const camera = scene.userData.camera

        scene.userData.controls.update()

        this.renderer.render(scene, camera)
      })
    })
  }
  setMultipleScenes() {
    this.scenes = []
    this.DOMElements.forEach((element) => {
      const scene = new Scene()
      scene.userData.element = element

      this.scenes.push(scene)
    })
  }
  setCameras() {
    this.scenes.forEach((scene) => {
      const cameraInstance = new Camera({
        sizes: this.sizes,
        renderer: this.renderer,
        debug: this.debug,
        controlElement: scene.userData.element,
      })
      scene.userData.camera = cameraInstance.camera
      scene.userData.controls = cameraInstance.controls
    })
  }
  setWorlds() {
    this.scenes.forEach((scene) => {
      const world = new World({
        time: this.time,
        assets: this.assets,
        debug: this.debug,
      })
      scene.add(world.container)
    })
  }
}

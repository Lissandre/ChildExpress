import { Scene, sRGBEncoding, Vector3, WebGLRenderer } from 'three'

import gsap, { Power3, Linear } from 'gsap'

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
    this.debug = true
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
    this.setConfig()
    this.setRenderer()
    this.setCamera()
    if (this.elementApp.id === '_canvas1') {
      // console.log('yes')
      this.setWorld()
    } else {
      this.setBackgroundShader()
    }
  }
  setCanvas(canvas = this.renderer?.canvas) {
    this.canvas = canvas
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

    this.renderer.setSize(
      this.elementApp.parentNode.offsetWidth,
      this.elementApp.parentNode.offsetHeight
    )

    // Resize renderer on resize event
    this.sizes.on('resize', () => {
      this.renderer.setSize(
        this.elementApp.parentNode.offsetWidth,
        this.elementApp.parentNode.offsetHeight
      )
    })

    this.time.on('tick', () => {
      this.debug && this.fpsGraph.begin()

      this.camera.camera.controls.update()

      this.renderer.render(this.scene, this.camera.camera)

      this.debug && this.fpsGraph.end()
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
  setCamera() {
    // Create camera instance
    this.camera = new Camera({
      sizes: this.sizes,
      renderer: this.renderer,
      debug: this.debug,
      parentNode: this.elementApp.parentNode,
    })
    // Add camera to scene
    this.scene.add(this.camera.container)

    this.camera.camera.controls.saveState()
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

    this.camera.camera.add(this.world.light.container)
  }
  setBackgroundShader() {
    this.plane = new Plane({
      time: this.time,
    })
    this.scene.add(this.plane.container)
  }

  changeFocus(options) {
    this.isFace = options.face
    this.world.baby.isFace = options.face
    //const vec = new Vector3(this.camera.camera.position, this.camera.camera.position, this.camera.camera.position)
    if (this.isFace === 'face') {
      gsap
        .to(this.camera.camera.controls.target, {
          x: 0,
          y: 1.5,
          z: -2,
          duration: 1,
          ease: Power3.easeOut,
        })
        .then(this.resetCamera())
    } else if (this.isFace === 'middle') {
      gsap.to(this.camera.camera.controls.target, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1,
        ease: Power3.easeOut,
      })
    }
  }

  resetCamera() {
    this.camera.camera.controls.autoRotate = false

    this.camera.camera.controls.maxAzimuthAngle = Math.PI
    this.camera.camera.controls.minAzimuthAngle = -Math.PI

    this.camera.camera.controls.maxPolarAngle = Math.PI
    this.camera.camera.controls.minPolarAngle = 0

    var tl = gsap.timeline({
      onComplete: () => {
        ;(this.camera.camera.controls.maxAzimuthAngle = Infinity),
          (this.camera.camera.controls.minAzimuthAngle = -Infinity)
      },
    })

    tl.to(this.camera.camera.controls, {
      maxAzimuthAngle: 0,
      minAzimuthAngle: 0,

      minPolarAngle: Math.PI / 2,
      maxPolarAngle: Math.PI / 2,

      duration: 1,
      ease: Power3.easeOut,
    })
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

  focusOnBox() {

    this.world.baby.shrinkGlasses()
    // this.camera.camera.lookAt(this.world.box.box.position)
    if (this.world.box) {
      var tlBox = gsap.timeline()
      var tlBaby = gsap.timeline()

      tlBox.fromTo(
        [this.world.box.box.position],
        { x: 0, y: -5, z: 0 },
        { x: 0, y: 0, z: 0, duration: 1, delay: 3}
      )
      tlBox.fromTo(
        [this.world.box.box.rotation],
        { x: Math.PI, y: 0, z: 0 },
        { x: Math.PI, y: 2 * Math.PI, z: 0, duration: 4, delay: 3 }
      )
      tlBox.to([this.world.box.box.position], {
        x: -3.5,
        y: 0,
        z: -3,
        duration: 3,
        delay: 3,
      })
      tlBox.fromTo(
        [this.world.box.box.rotation],
        { x: Math.PI, y: 2 * Math.PI, z: 0 },
        {
          x: Math.PI,
          y: 4 * Math.PI,
          z: 0,
          duration: 12,
          ease: Linear.easeNone,
          delay: 1,
          repeat: -1,
        }
      )

      tlBaby.fromTo(
        [this.world.baby.baby.position],
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0, duration: 1 }
      )
      tlBaby.fromTo(
        [this.world.baby.baby.rotation],
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 2 * -Math.PI, z: 0, duration: 4, delay: 3 }
      )
      tlBaby.to([this.world.baby.baby.position], {
        x: -3.5,
        y: 0,
        z: -3,
        duration: 3,
        delay: 3,
      })
      tlBaby.fromTo(
        [this.world.baby.baby.rotation],
        { x: 0, y: 2 * Math.PI, z: 0 },
        {
          x: 0,
          y: 0,
          z: 0,
          duration: 12,
          ease: Linear.easeNone,
          delay: 1,
          repeat: -1,
        }
      )
    }
  }

  focusOnBin() {

    // this.world.baby.shrinkGlasses()

    if (this.world.bin) {

      gsap.to(
        this.world.baby.baby.scale,
        { x: 0.7, y: 0.7, z: 0.7, duration: 0.5, delay: 2}
      )
      gsap.to(
        this.world.baby.baby.position,
        { x: 0, y: -1, z: 0, duration: 0.5, delay: 2}
      )
      
      gsap.fromTo(
        this.world.bin.bin.children[0].position,
        { y: 5 },
        { y: 0.4, duration: 0.5, delay: 3}
      )
      gsap.fromTo(
        this.world.bin.bin.children[0].position,
        { y: 5 },
        { y: 0.4, duration: 0.5, delay: 3}
      )
      gsap.fromTo(
        this.world.bin.bin.children[1].position,
        { y: -5 },
        { y: -0.175, duration: 0.5, delay: 3}
      )
    }
  }

  setConfig() {
    if (this.debug === true) {
      this.debug = new Pane({
        title: 'DEBUG',
        expanded: true,
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

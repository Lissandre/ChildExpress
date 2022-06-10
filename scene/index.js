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
    this.setConfig()
    this.setRenderer()
    this.setCamera()
    console.log(this.elementApp)
    if (this.elementApp.id === '_canvas1') {
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

    this.camera.camera.controls.saveState();

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
    //const vec = new Vector3(this.camera.camera.position, this.camera.camera.position, this.camera.camera.position)

    if (this.isFace === 'face') {
      console.log(this.camera)
      gsap.to(this.camera.camera.controls.target, {
        x: 0,
        y: 2,
        z: 0,
        duration: 1,
        ease: Power3.easeOut,
      }).then(this.resetCamera())
    } else {
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
    console.log(this.camera.camera.controls.maxAzimuthAngle)
    this.camera.camera.controls.autoRotate = false;

    this.camera.camera.controls.maxAzimuthAngle = Math.PI
    this.camera.camera.controls.minAzimuthAngle = - Math.PI

    this.camera.camera.controls.maxPolarAngle = Math.PI
    this.camera.camera.controls.minPolarAngle = 0


    var tl = gsap.timeline({
      onComplete: () => {
        this.camera.camera.controls.maxAzimuthAngle = Infinity,
          this.camera.camera.controls.minAzimuthAngle = - Infinity
      }
    });

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

    console.log(options)
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
}

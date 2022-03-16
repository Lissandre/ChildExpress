import { Object3D, PerspectiveCamera, Vector3 } from 'three'
import gsap from 'gsap'

export default class Camera {
  constructor(options) {
    // Set Options
    this.sizes = options.sizes
    this.renderer = options.renderer
    this.debug = options.debug

    // Set up
    this.container = new Object3D()
    this.container.name = 'Camera'

    this.setCamera()
    this.setPosition()

    if (this.debug) {
      this.debugFolder = this.debug.addFolder({
        title: 'Camera',
        expanded: false,
      })
      this.setDebug()
    }
  }
  setCamera() {
    // Create camera
    this.camera = new PerspectiveCamera(
      75,
      this.sizes.viewport.width / this.sizes.viewport.height,
      0.1,
      1000
    )
    this.container.add(this.camera)
    // Change camera aspect on resize
    this.sizes.on('resize', () => {
      this.camera.aspect =
        this.sizes.viewport.width / this.sizes.viewport.height
      // Call this method because of the above change
      this.camera.updateProjectionMatrix()
    })
  }
  setPosition() {
    // Set camera position
    this.camera.position.x = 0
    this.camera.position.y = 0
    this.camera.position.z = 5
  }
  changeScene(options) {
    this.isHealthy = options.isHealthy
    const vec = new Vector3(this.camera.position.x, this.camera.position.y, this.camera.position.z)

    if(this.isHealthy) {
      gsap.to(vec, {
        x: 0,
        y: 0,
        z: 5,
        duration: 1,
        onUpdate: () => {
          this.camera.position.set(vec.x, vec.y, vec.z)
        },
      })
    } else {
      gsap.to(vec, {
        x: -2,
        y: 0,
        z: 3,
        duration: 1,
        onUpdate: () => {
          this.camera.position.set(vec.x, vec.y, vec.z)
        },
      })
    }
  }
  setDebug() {
    this.debugFolder
      .addInput(this.camera, 'fov', {
        view: 'cameraring',
        series: 1,
        wide: false,
      })
      .on('change', () => {
        this.camera.updateProjectionMatrix()
      })
    this.debugFolder
      .addInput(this.camera, 'position', {
        label: 'x, y, z',
        x: {min: -5, max: 5},
        y: {min: -5, max: 5},
        z: {min: -5, max: 5},
      })
  }
}
import { Object3D, PerspectiveCamera, Vector3 } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap'

export default class Camera {
  constructor(options) {
    // Set Options
    this.sizes = options.sizes
    this.renderer = options.renderer
    this.debug = options.debug
    this.parentNode = options.parentNode

    // Set up
    this.container = new Object3D()
    this.container.name = 'Camera'

    this.setCamera()
    this.setPosition()
    this.setOrbitControls()

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
      this.parentNode.offsetWidth / this.parentNode.offsetHeight,
      0.1,
      1000
    )
    this.container.add(this.camera)
    // Change camera aspect on resize
    this.sizes.on('resize', () => {
      this.camera.aspect =
        this.parentNode.offsetWidth / this.parentNode.offsetHeight
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
  setOrbitControls() {
    this.camera.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.camera.controls.minDistance = 8;
    this.camera.controls.maxDistance = 8;

    this.camera.controls.minPolarAngle = Math.PI / 3;
    this.camera.controls.maxPolarAngle = 2 * Math.PI / 3;

    this.camera.controls.update();
  }
  changeScene(options) {
    this.isHealthy = options.isHealthy
    const vec = new Vector3(this.camera.position.x, this.camera.position.y, this.camera.position.z)

    if (this.isHealthy) {
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
        x: { min: -5, max: 5 },
        y: { min: -5, max: 5 },
        z: { min: -5, max: 5 },
      })
  }
}
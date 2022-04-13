import { Mesh, MeshBasicMaterial, Object3D, PlaneGeometry } from 'three'

export default class Plane {
  constructor(options) {
    // Options
    this.time = options.time
    this.assets = options.assets

    // Set up
    this.container = new Object3D()
    this.container.name = 'Plane'

    this.createPlane()
    // this.setMovement()
  }
  createPlane() {
    this.plane = new Mesh(
      new PlaneGeometry(20, 20, 20),
      new MeshBasicMaterial({
        color: 0xd2dfee,
      })
    )
    this.container.add(this.plane)
    
  }
  setMovement() {
    this.time.on('tick', () => {
      this.plane.rotation.y += 0.001 * this.time.delta
    })
  }
}
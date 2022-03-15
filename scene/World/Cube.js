import { Mesh, MeshLambertMaterial, Object3D, BoxGeometry } from 'three'

export default class Cube {
  constructor(options) {
    // Options
    this.time = options.time
    this.assets = options.assets

    // Set up
    this.container = new Object3D()
    this.container.name = 'Cube'

    this.createCube()
    this.setMovement()
  }
  createCube() {
    this.cube = new Mesh(
      new BoxGeometry(2, 2, 2),
      new MeshLambertMaterial({
        color: 0x565656,
      })
    )
    this.container.add(this.cube)
  }
  setMovement() {
    this.time.on('tick', () => {
      this.cube.rotation.y += 0.001 * this.time.delta
    })
  }
}
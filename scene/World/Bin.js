import {
  Mesh,
  MeshBasicMaterial,
  Object3D,
  BoxGeometry,
  MeshPhongMaterial,
} from 'three'
import gsap from 'gsap'
import { MeshStandardMaterial } from 'three'

export default class Bin {
  constructor(options) {
    // Options
    this.time = options.time
    this.assets = options.assets

    // Set up
    this.container = new Object3D()
    this.container.name = 'Bin'

    this.createBin()
    this.setMovement()
  }
  createBin() {
    // console.log('createBin')
    this.bin = this.assets.models.bin.scene
    this.texture = this.assets.textures.map_bin

    let material = new MeshStandardMaterial({
      //ambient: 0x050505,
      color: 0x0033ff,
      specular: 0x555555,
      shininess: 30,
      map: this.texture,
      metalness: 1,
      roughness: 1,
    })

    this.bin.material = material
    // console.log(this.bin.material)

    /*
                this.bin.traverse((child) => {
        
                    if (child.isMesh) {
        
                        // console.log(this.texture)
        
                        // console.log(child.geometry.attributes.uv);
                        child.metalnessMap = material2; // assign your diffuse texture here
        
                    }
        
                });
        */

    this.bin.scale.set(1.75, 1.75, 1.75)

    this.bin.children[0].position.set(0, 5, 0)
    this.bin.children[1].position.set(0, -5, 0)
    this.container.add(this.bin)
  }
  setMovement() {
    this.time.on('tick', () => {
      // this.bin.children[0].rotation.y += 0.001 * this.time.delta
      // this.bin.children[1].rotation.y -= 0.001 * this.time.delta
    })
  }
}

import {
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PlaneGeometry,
  RawShaderMaterial,
  Vector2,
  Color,
} from 'three'

export default class Plane {
  constructor(options) {
    // Options
    this.time = options.time
    this.assets = options.assets

    // Set up
    this.container = new Object3D()
    this.container.name = 'Plane'

    this.createPlane()
    this.setMovement()
  }
  createPlane() {
    const vertex = /* glsl */ `
        attribute vec2 uv;
        attribute vec2 position;
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = vec4(position, 0, 1);
        }
    `

    const fragment = /* glsl */ `
    precision highp float;
    uniform float uTime;
    uniform vec3 uColor;
    varying vec2 vUv;
    void main() {
        gl_FragColor.r = 0.4;
        gl_FragColor.g = 0.4;
        gl_FragColor.b = 0.5 + 0.3 * cos(vUv.x + uTime) + uColor.b;
        gl_FragColor.a = 0.6;
    }
    `
    this.material = new RawShaderMaterial({
      uniforms: {
        resolution: { value: new Vector2() },
        uTime: { value: 0 },
        uColor: { value: new Color(0.3, 0.2, 0.5) },
      },
      fragmentShader: fragment,
      vertexShader: vertex,
    })

    this.plane = new Mesh(new PlaneGeometry(20, 20, 20), this.material)
    this.container.add(this.plane)
  }
  setMovement() {
    this.time.on('tick', () => {
      this.plane.rotation.y += 0.001 * this.time.delta
      this.material.uniforms.uTime.value += 0.001 * this.time.delta
    })
  }
}

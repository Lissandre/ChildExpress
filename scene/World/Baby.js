import { Object3D, RepeatWrapping } from 'three'

export default class Baby {
    constructor(options) {
        // Options
        this.time = options.time
        this.assets = options.assets

        // Set up
        this.container = new Object3D()
        this.container.name = 'Baby'

        this.transition = 0

        this.noseSize = 0
        this.earsSize = 0
        this.handsSize = 0
        this.overallSize = 0

        this.createBaby()
        this.modifyShader()
        this.setMovement()
    }
    createBaby() {
        this.baby = this.assets.models.baby.scene


        this.map1 = this.assets.textures.map1
        this.map1.wrapS = RepeatWrapping;
        this.map1.wrapT = RepeatWrapping;

        this.container.add(this.baby)
    }

    modifyShader() {
        // this.baby.children[1].geometry = new PlaneBufferGeometry(15, 15, 1, 1)
        // this.baby.rotation.x = Math.PI / 2.
        this.baby.children[1].material.onBeforeCompile = (s) => {
            s.uniforms.map1 = { value: this.map1 }
            s.uniforms.noseSize = { value: 0 }
            s.uniforms.earsSize = { value: 0 }
            s.uniforms.handsSize = { value: 0 }
            s.uniforms.overallSize = { value: 0 }
            s.uniforms.time = { value: 0 }
            s.vertexShader = `
        uniform sampler2D map1;
        uniform float noseSize;
        uniform float earsSize;
        uniform float handsSize;
        uniform float overallSize;
        uniform float time;
      ` + s.vertexShader

            s.fragmentShader = `uniform sampler2D map1;
      ` + s.fragmentShader

            s.vertexShader = s.vertexShader.replace('#include <begin_vertex>', /*glsl*/`
                vec4 tex1 = texture2D(map1, vUv*vec2(1., -1.));
                float nose = tex1.r*  noseSize;
                float ears = tex1.g* earsSize;
                float hands = tex1.b*  handsSize;
                float transformation = overallSize + nose + ears + hands;
                vec3 transformed = position+ transformation * normal;
            `)
            s.fragmentShader = s.fragmentShader.replace('vec4 diffuseColor = vec4( diffuse, opacity );',
            /*glsl*/`

               vec3 diff = diffuse;
               vec4 tex1 = texture2D(map1, vUv*vec2(1., -1.));
               vec4 diffuseColor = vec4(diff, opacity);
            `)

            this.shader = s
        }
    }

    updateUniform(uniform, value) {
        this.shader.uniforms[uniform].value = value;
    }

    setMovement() {
        this.time.on('tick', () => {
            if (!this.shader) return
            this.shader.uniforms.time.value = this.time.current * 100.;

        })
    }

    lerp(start, end, amt) {
        return (1 - amt) * start + amt * end
    }

    easeOutElastic(x) {
        const c4 = (2 * Math.PI) / 3;

        return x === 0
            ? 0
            : x === 1
                ? 1
                : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;

    }
}

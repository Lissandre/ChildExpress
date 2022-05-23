import { Object3D, RepeatWrapping, BufferAttribute } from 'three'
import { GPUComputationRenderer } from 'three/examples/jsm/misc/GPUComputationRenderer.js';

import gsap, { Power3 } from 'gsap'
import { Mesh } from 'three';
import { PlaneBufferGeometry } from 'three';
import { MeshBasicMaterial } from 'three';

export default class Baby {
    constructor(options) {
        // Options
        this.time = options.time
        this.assets = options.assets
        this.renderer = options.renderer

        // Set up
        this.container = new Object3D()
        this.container.name = 'Baby'

        this.transition = 0

        this.noseSize = 0
        this.earsSize = 0
        this.handsSize = 0
        this.overallSize = 0

        this.createBaby()
        this.initGPGPU()
        this.initGPGPUDebug()
        this.modifyShader()
        this.setMovement()
    }

    initGPGPU() {
        this.gpuCompute = new GPUComputationRenderer(this.bufferWidth, this.bufferWidth, this.renderer)

        this.dtPosition = this.gpuCompute.createTexture();

        this.fillPositions()

        this.positionVariable = this.gpuCompute.addVariable("positionTexture", this.positionShader(), this.dtPosition);

        this.gpuCompute.setVariableDependencies(this.positionVariable, [this.positionVariable]);

        this.positionVariable.wrapS = RepeatWrapping
        this.positionVariable.wrapT = RepeatWrapping

        let error = this.gpuCompute.init()

        if (error) {
            console.error(error)
        } else {
            console.warn('GPGPU is on :)')
        }
    }

    initGPGPUDebug() {
        let plane = new Mesh(new PlaneBufferGeometry(10, 10, 1, 1), new MeshBasicMaterial({ map: this.dtPosition }))
        this.container.add(plane)
    }

    fillPositions() {
        let data = this.dtPosition.image.data
        let pos = this.baby.geometry.getAttribute('position')

        for (let i = 0; i < data.length; i += 4) {
            data[i + 0] = pos.array[i + 0]
            data[i + 1] = pos.array[i + 1]
            data[i + 2] = pos.array[i + 2]
            data[i + 3] = 1
            console.log({
                x: pos.array[i + 0],
                y: pos.array[i + 1],
                z: pos.array[i + 2]
            })
        }

    }


    createBaby() {
        this.baby = this.assets.models.baby.scene.children[1]

        this.babyMin = this.baby.geometry.boundingBox.min.z
        this.babyMax = this.baby.geometry.boundingBox.max.z
        this.baby.material.transparent = true

        this.map1 = this.assets.textures.map1
        this.map1.wrapS = RepeatWrapping;
        this.map1.wrapT = RepeatWrapping;

        this.babyGeo = this.baby.geometry
        this.babyPositions = this.babyGeo.attributes.position

        this.bufferWidth = Math.ceil(Math.sqrt(this.babyPositions.count))

        let reference = new Float32Array(this.bufferWidth * this.bufferWidth * 2)



        for (let i = 0; i < this.bufferWidth; i++) {
            let xx = (i % this.bufferWidth) / this.bufferWidth
            let yy = ~~(i / this.bufferWidth) / this.bufferWidth

            reference.set([xx, yy], i * 2)

        }

        this.babyGeo.setAttribute('reference', new BufferAttribute(reference, 2))


        this.container.add(this.baby)
    }

    modifyShader() {
        // this.baby.children[1].geometry = new PlaneBufferGeometry(15, 15, 1, 1)
        // this.baby.rotation.x = Math.PI / 2.
        this.baby.material.onBeforeCompile = (s) => {
            s.uniforms.map1 = { value: this.map1 }
            s.uniforms.noseSize = { value: 0 }
            s.uniforms.earsSize = { value: 0 }
            s.uniforms.handsSize = { value: 0 }
            s.uniforms.overallSize = { value: 0 }
            s.uniforms.time = { value: 0 }
            s.uniforms.startAnimation = { value: 0 }
            s.uniforms.babyMin = { value: this.babyMin }
            s.uniforms.babyMax = { value: this.babyMax }
            s.uniforms.positionTex = { value: this.dtPosition }

            s.vertexShader = `
            attribute vec2 reference;
            
            uniform sampler2D map1;
            uniform sampler2D positionTex;
        uniform float noseSize;
        uniform float earsSize;
        uniform float handsSize;
        uniform float overallSize;
        uniform float time;
        uniform float startAnimation;
        uniform float babyMin;
        uniform float babyMax;

        varying float normHeight;
        varying float startProgress;

        vec2 rotate(vec2 v, float a) {
            float s = sin(a);
            float c = cos(a);
            mat2 m = mat2(c, -s, s, c);
            return m * v;
        }
        
        float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
        vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
        vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}
        
        float noise(vec3 p){
            vec3 a = floor(p);
            vec3 d = p - a;
            d = d * d * (3.0 - 2.0 * d);
        
            vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
            vec4 k1 = perm(b.xyxy);
            vec4 k2 = perm(k1.xyxy + b.zzww);
        
            vec4 c = k2 + a.zzzz;
            vec4 k3 = perm(c);
            vec4 k4 = perm(c + 1.0);
        
            vec4 o1 = fract(k3 * (1.0 / 41.0));
            vec4 o2 = fract(k4 * (1.0 / 41.0));
        
            vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
            vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);
        
            return o4.y * d.y + o4.x * (1.0 - d.y);
        }

      ` + s.vertexShader

            s.fragmentShader = `uniform sampler2D map1;
      ` + s.fragmentShader

            s.vertexShader = s.vertexShader.replace('#include <begin_vertex>', /*glsl*/`
                vec4 tex1 = texture2D(map1, vUv*vec2(1., -1.));
                float nose = tex1.r*  noseSize;
                float ears = tex1.g* earsSize;
                float hands = tex1.b*  handsSize;
                float transformation = overallSize + nose + ears + hands;
                float n = noise(position*0.5)*(1.-startAnimation);
                normHeight = (position.z-babyMax)/(babyMin-babyMax)+n;
                startProgress = smoothstep(0.6,1.,startAnimation*2.-normHeight)*0.98;
                startProgress += smoothstep(0.,0.4,startAnimation*2.-normHeight)*0.02;
                
                float effect = smoothstep(0.9,1.,1.-distance(startAnimation*2.-normHeight+0.1,1.));
                vec3 pos = position;
                pos.xy *=  1. + effect/length(pos.xy);
                
                vec3 posTex = texture2D(positionTex, reference).xyz;
                
                vec3 transformed = posTex + transformation * normal;

            `)

            s.fragmentShader = `
            uniform float startAnimation;
            varying float startProgress;
            varying float normHeight;

            vec2 rotate(vec2 v, float a) {
                float s = sin(a);
                float c = cos(a);
                mat2 m = mat2(c, -s, s, c);
                return m * v;
            }
            
            ` + s.fragmentShader.replace('vec4 diffuseColor = vec4( diffuse, opacity );',
            /*glsl*/`
               vec3 diff = diffuse;
               vec4 tex1 = texture2D(map1, vUv*vec2(1., -1.));

                vec2 uv = vUv;
                uv -= vec2(0.5);
                uv = rotate(uv, (1.- startProgress)*PI/4.);
                uv += vec2(0.5);

                float grid = 0.;
                grid += step(0.1 + startProgress*0.3,abs(sin(uv.x*300.*(0.8+ 0.2*startProgress))));
                grid *= step(0.1 + startProgress*0.3,abs(sin(uv.y*300.*(0.8+ 0.2*startProgress))));
                grid /= 2.;
                grid = 1. - grid;
                grid = step((1.-startProgress)*1.01 - 0.005, grid);
                
                float colorness = step(0.9, startProgress);
                diff = mix(vec3(0.), diff, colorness);

                vec4 diffuseColor = vec4(diff*startProgress, grid);
            `)

            this.shader = s
            this.appear()
        }




        this.updateUniform = (uniform, value) => {
            gsap.to(
                this.shader.uniforms[uniform], {
                value,
                duration: 1,
                ease: Power3.easeOut,
            }
            )

        }
    }

    positionShader() {
        return /*glsl*/`

		void main() {
			vec2 uv = gl_FragCoord.xy / resolution.xy;

			vec4 tmpPos = texture2D( positionTexture, uv );

			vec3 pos = tmpPos.xyz;

			gl_FragColor = vec4( pos, 1.0 );

		}
        `
    }

    setMovement() {
        this.time.on('tick', () => {
            if (!this.shader) return
            this.shader.uniforms.time.value = this.time.current * 100.;

            // this.shader.uniforms.startAnimation.value = Math.sin(this.time.current * 0.0008) / 2. + 0.5
            // this.gpuCompute.compute()
        })
    }


    appear() {
        gsap.to(
            this.shader.uniforms.startAnimation, {
            value: 1,
            duration: 5,
            ease: Power3.easeOut,
        }
        )
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

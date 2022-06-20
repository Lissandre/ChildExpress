import { Object3D, RepeatWrapping, Vector3 } from 'three'
import gsap, { Power3, Bounce } from 'gsap'

export default class Baby {
  constructor(options) {
    // Options
    this.time = options.time
    this.assets = options.assets
    this.debug = false //options.debug

    // Set up
    this.container = new Object3D()
    this.container.name = 'Baby'

    this.morphCtrls = []
    this.transition = 0

    if (this.debug) {
      this.debugFolder = this.debug.addFolder({
        title: 'Baby',
        expanded: true,
      })
    }

    this.createBaby()
    this.modifyShader()
    this.container.add(this.baby)
    this.setMovement()
  }
  createBaby() {
    this.baby = this.assets.models.baby.scene.children[0]
    this.baby.scale.set(1.2, 1.2, 1.2)
    this.baby.position.set(0, -1.2, 0)
    console.log(this.assets.models, this.baby)

    if (this.debug) {
      this.morphMeshes = []
      this.baby.traverse((node) => {
        if (node.isMesh && node.morphTargetInfluences) {
          this.morphMeshes.push(node)
        }
      })
      console.log(this.morphMeshes.length)
      if (this.morphMeshes.length) {
        this.morphMeshes.forEach((mesh) => {
          mesh.material.needsUpdate = true

          let i = 0
          for (const [key, value] of Object.entries(mesh.morphTargetDictionary)) {
            console.log(mesh.morphTargetDictionary)
            mesh.morphTargetInfluences[i] = 0
            const ctrl = this.debugFolder.addInput(
              mesh.morphTargetInfluences,
              `${i}`,
              {
                label: key,
                min: 0,
                max: 1,
                step: 0.01,
              }
            )
            this.morphCtrls.push(ctrl)
            i++
          }
        })
      }
    }

    this.babyMin = this.baby.children[1].geometry.boundingBox.min.z
    this.babyMax = this.baby.children[1].geometry.boundingBox.max.z

    this.babyMin = this.baby.children[1].geometry.boundingBox.min.z
    this.babyMax = this.baby.children[1].geometry.boundingBox.max.z
    this.baby.children[1].material.transparent = true

    // faire des variables
    this.map1 = this.assets.textures.magic1
    this.map2 = this.assets.textures.magic2
    this.map3 = this.assets.textures.magic3

    this.map1.wrapS = RepeatWrapping
    this.map1.wrapT = RepeatWrapping
    this.map2.wrapS = RepeatWrapping
    this.map2.wrapT = RepeatWrapping
    this.map3.wrapS = RepeatWrapping
    this.map3.wrapT = RepeatWrapping
  }

  modifyShader() {
    this.baby.children[1].material.needsUpdate = true
    this.baby.children[1].material.onBeforeCompile = (s) => {
      s.uniforms.map1 = { value: this.map1 }
      s.uniforms.map2 = { value: this.map2 }
      s.uniforms.map3 = { value: this.map3 }

      s.uniforms.hairColor = { value: new Vector3(1, 0, 0) } //map1 R
      s.uniforms.eyesColor = { value: new Vector3(0, 1, 0) }  //map1 G
      s.uniforms.skin = { value: new Vector3(0, 0, 1) } //map1 B

      s.uniforms.titSize = { value: 0.5 }    //map2 R
      s.uniforms.handsSize = { value: 0.5 }  //map2 G
      s.uniforms.noseHeight = { value: 0.5 } //map2 B
      s.uniforms.headSize = { value: 0.5 }   //map2 A

      s.uniforms.noseSize = { value: 0.5 }   //map3 R
      s.uniforms.earsSize = { value: 0.5 }   //map3 G
      s.uniforms.mouthSize = { value: 0.5 }  //map3 B
      s.uniforms.eyeSize = { value: 0.5 }    //map3 A

      s.uniforms.overallSize = { value: 0.5 }

      s.uniforms.time = { value: 0 }
      s.uniforms.startAnimation = { value: 0 }

      s.uniforms.babyMin = { value: this.babyMin }
      s.uniforms.babyMax = { value: this.babyMax }

      s.uniforms.scale = { value: 0.5 }

      s.vertexShader =
        `
        uniform sampler2D map1;
        uniform sampler2D map2;
        uniform sampler2D map3;
        
        uniform vec3 hairColor;
        uniform vec3 eyesColor;
        uniform vec3 skinColor;

        uniform float titSize;
        uniform float handsSize;
        uniform float noseHeight;
        uniform float headSize;

        uniform float noseSize;
        uniform float earsSize;
        uniform float mouthSize;
        uniform float eyeSize;

        uniform float overallSize;
        uniform float eyeHeight;

        uniform float time;
        uniform float startAnimation;
        uniform float babyMin;
        uniform float babyMax;
        uniform float scale;

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

        float map(float value, float min, float max) {
          return min + value * (max - min);
        }

      ` + s.vertexShader

      s.fragmentShader =
        `uniform sampler2D map1;
      ` + s.fragmentShader

      s.vertexShader = s.vertexShader.replace(
        '#include <begin_vertex>',
        /*glsl*/ `
              vec4 tex1 = texture2D(map1, vUv*vec2(1., -1.));
              vec4 tex2 = texture2D(map2, vUv*vec2(1., -1.));
              vec4 tex3 = texture2D(map3, vUv*vec2(1., -1.));
              
              float tit = tex2.r * (titSize - 0.5);
              float hands = tex2.g * (handsSize - 0.5);
              float noiseH = tex2.b * (noseHeight - 0.5);
              float head = tex2.a * (headSize - 0.5);

              float nose = tex3.r * map(noseSize,-0.004, 0.02);
              float ears = tex3.g *  map(earsSize,-0.004, 0.03);
              float mouth = tex3.b * map(mouthSize,-0.004, 0.01);
              float eye = (1.-tex3.a) * map(eyeSize,-0.003, 0.005);

              float transformation = tit + hands + noiseH + head + nose + ears + mouth + eye;
              float n = noise(position * 0.5) * (1. - startAnimation);
              vec3 pos = position * map(scale,1., 1.5);
              vec3 transformed = pos + (transformation + map(overallSize,-0.008,0.008)) * normal;
            `
      )

      s.fragmentShader =
        `
            uniform float startAnimation;
            uniform float time;
            uniform vec3 hairColor;
            uniform vec3 eyesColor;
            uniform vec3 skin;

            vec2 rotate(vec2 v, float a) {
                float s = sin(a);
                float c = cos(a);
                mat2 m = mat2(c, -s, s, c);
                return m * v;
            }
            
            ` +
        s.fragmentShader.replace(
          'vec4 diffuseColor = vec4( diffuse, opacity );',
          /*glsl*/ `
               vec3 diff = diffuse;
               vec4 tex1 = texture2D(map1, vUv*vec2(1., -1.));
               float hair = tex1.r;
               float eye = tex1.g;
               float skin_ = tex1.b;
               diff = mix(diff,length(diff)/3. * hairColor, hair);
               diff = mix(diff,length(diff)/3. * eyesColor, eye);
               diff = mix(diff,length(diff)/3. * skin, skin_);

               vec4 diffuseColor = vec4(diff, 1.);
            `
        )
      this.shader = s
      this.appear()
    }
  }

  updateUniform = (uniform, value) => {
    if (value.r)
      value = new Vector3(value.r, value.g, value.b)

    gsap.to(this.shader.uniforms[uniform], {
      value,
      duration: 1,
      ease: Power3.easeOut,
    })
    console.log(value, this.shader.uniforms[uniform], uniform)
  }
  setXtras() {
    console.log('setXtras')
    if (this.morphMeshes.length) {
      this.morphMeshes.forEach((mesh) => {
        for (let i = 0; i < mesh.morphTargetInfluences.length; i++) {
          mesh.morphTargetInfluences[i] = 0
        }
      })
    }
  }

  babyAppearForm4() {
    console.log('appear')

    var tl = gsap.timeline({ delay: 2 });

    /*tl.fromTo(this.baby.position, { x: 0, y: 0, z: -2},{
      x: Math.sin(tl.progress() * Math.PI),
      y: 0,
      z: Math.cos(tl.progress() * Math.PI) * 2,
      duration: 2,
      ease: Power3.easeIn
    })*/

    tl.fromTo(this.baby.rotation, { x: 0, y: 0, z: 0 }, {
      x: 0,
      y: Math.PI * 2,
      z: 0,
      duration: 2,
      ease: Power3.easeInOut
    })
  }

  shrinkGlasses() {

    console.log(this.morphMeshes[0].morphTargetInfluences)

    gsap.to(this.morphMeshes[0].morphTargetInfluences, {
      1: 0.8,
      duration: 2,
      ease: Bounce.easeInOut
    })
  }

  setMovement() {
    this.time.on('tick', () => {

      if (!this.shader) return
      this.shader.uniforms.time.value += 0.1
    })
  }

  appear() {
    gsap.to(this.shader.uniforms.startAnimation, {
      value: 1,
      duration: 5,
      ease: Power3.easeOut,
    })
  }

  lerp(start, end, amt) {
    return (1 - amt) * start + amt * end
  }

  easeOutElastic(x) {
    const c4 = (2 * Math.PI) / 3

    return x === 0
      ? 0
      : x === 1
        ? 1
        : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1
  }
}

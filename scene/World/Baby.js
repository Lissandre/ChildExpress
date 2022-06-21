import { Color, Object3D, RepeatWrapping, Vector3 } from 'three'
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
    this.xtrasToAdd = []
    this.xtrasToChange = []
    this.blendShapes = ['R_mouth_R,', 'L_mouth_L']
    this.blendShapesId = []

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

    if (!this.debug) {
      this.morphMeshes = []
      this.baby.traverse((node) => {
        console.log(node)
        if (node.isMesh && node.morphTargetInfluences) {

          this.morphMeshes.push(node)
        }
      })
      if (this.morphMeshes.length) {
        this.morphMeshes.forEach((mesh) => {
          mesh.material.needsUpdate = true

          let i = 0
          /*for (const [key, value] of Object.entries(
            mesh.morphTargetDictionary
          )) {
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
          }*/
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
      s.uniforms.skin = { value: new Vector3(252 / 255, 220 / 255, 210 / 255) } //map1 B

      s.uniforms.titSize = { value: 0.5 }    //map2 R
      s.uniforms.handsSize = { value: 0.5 }  //map2 G
      s.uniforms.noseHeight = { value: 0.5 } //map2 B
      s.uniforms.headSize = { value: 110. }   //map2 A

      s.uniforms.noseSize = { value: 0.5 }   //map3 R
      s.uniforms.earsSize = { value: 0.5 }   //map3 G
      s.uniforms.mouthSize = { value: 0.5 }  //map3 B
      s.uniforms.eyeSize = { value: 0.5 }    //map3 A

      s.uniforms.overallSize = { value: 0.5 }

      s.uniforms.time = { value: 0 }
      s.uniforms.startAnimation = { value: 0 }

      s.uniforms.babyMin = { value: this.babyMin }
      s.uniforms.babyMax = { value: this.babyMax }

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
              float head = (1. -tex2.a) * map((headSize-50.)/200., -0.02, 0.03);

              float nose = tex3.r * map(noseSize,-0.004, 0.02);
              float ears = tex3.g *  map(earsSize,-0.004, 0.03);
              float mouth = tex3.b * map(mouthSize,-0.004, 0.01);
              float eye = (1.-tex3.a) * map(eyeSize,-0.003, 0.005);

              float transformation = hands + nose + ears + mouth + eye;
              float n = noise(position * 0.5) * (1. - startAnimation);
              vec3 pos = position;
              vec3 transformed = (pos + (transformation + map(overallSize,-0.008,0.008) + head) * normal);
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
               diff = mix(diff, hairColor, hair);
               diff = mix(diff, eyesColor, eye);
               diff = mix(diff, skin, skin_);

               vec4 diffuseColor = vec4(diff, 1.);
            `
        )
      this.shader = s
      this.appear()
    }
  }

  updateUniform = (uniform, value) => {
    console.log(uniform, value)
    if (uniform == 'scale') {
      let v = value / 100
      v -= 0.5
      v *= 0.2
      v += 1.2
      console.log(v)
      this.baby.scale.set(v, v, v)
      return
    }



    if (value.r) {
      this.shader.uniforms[uniform].value.x = value.r / 255
      this.shader.uniforms[uniform].value.y = value.g / 255
      this.shader.uniforms[uniform].value.z = value.b / 255
      return
    }

    if (uniform == 'hairColor') {
      value *= 5;
      switch (value) {
        case 0:
          this.shader.uniforms[uniform].value.x = 221 / 255
          this.shader.uniforms[uniform].value.y = 192 / 255
          this.shader.uniforms[uniform].value.z = 117 / 255
          break;
        case 1:
          this.shader.uniforms[uniform].value.x = 188 / 255
          this.shader.uniforms[uniform].value.y = 88 / 255
          this.shader.uniforms[uniform].value.z = 15 / 255
          break;
        case 2:
          this.shader.uniforms[uniform].value.x = 161 / 255
          this.shader.uniforms[uniform].value.y = 129 / 255
          this.shader.uniforms[uniform].value.z = 90 / 255
          break;
        case 3:
          this.shader.uniforms[uniform].value.x = 133 / 255
          this.shader.uniforms[uniform].value.y = 99 / 255
          this.shader.uniforms[uniform].value.z = 59 / 255
          break;
        case 4:
          this.shader.uniforms[uniform].value.x = 94 / 255
          this.shader.uniforms[uniform].value.y = 57 / 255
          this.shader.uniforms[uniform].value.z = 13 / 255
          break;
        case 5:
          this.shader.uniforms[uniform].value.x = 50 / 255
          this.shader.uniforms[uniform].value.y = 28 / 255
          this.shader.uniforms[uniform].value.z = 7 / 255
          break;

      }

      console.log(value)
      return;
    }

    if (uniform == 'eyesColor') {
      value *= 3;
      switch (value) {
        case 0:
          this.shader.uniforms[uniform].value.x = 177 / 255
          this.shader.uniforms[uniform].value.y = 207 / 255
          this.shader.uniforms[uniform].value.z = 153 / 255
          break;
        case 1:
          this.shader.uniforms[uniform].value.x = 75 / 255
          this.shader.uniforms[uniform].value.y = 110 / 255
          this.shader.uniforms[uniform].value.z = 184 / 255
          break;
        case 2:
          this.shader.uniforms[uniform].value.x = 133 / 255
          this.shader.uniforms[uniform].value.y = 99 / 255
          this.shader.uniforms[uniform].value.z = 59 / 255
          break;
        case 3:
          this.shader.uniforms[uniform].value.x = 50 / 255
          this.shader.uniforms[uniform].value.y = 28 / 255
          this.shader.uniforms[uniform].value.z = 7 / 255
          break;

      }

      console.log(value)
      return;
    }


    gsap.to(this.shader.uniforms[uniform], {
      value,
      duration: 1,
      ease: Power3.easeOut,
    })
  }

  updateOneBlend(id, value) {
    console.log(id, value)

    if(id === 'mouthWidth') {
      const blend1 = this.findOneBlend('L_mouth_L')
      const blend2 = this.findOneBlend('R_mouth_R')


      console.log(blend1, blend2)
      gsap.to(this.morphMeshes[0].morphTargetInfluences, {
        [blend1]: 1 - value,
        [blend2]: 1 - value,
        duration: 1,
        ease: Power3.easeOut,
      })

    } else if (id === 'eyesHeight') {
      const blend1 = this.findOneBlend('L_eye_squint')
      const blend2 = this.findOneBlend('L_oeil_squit_down')
      const blend3 = this.findOneBlend('R_eye_squint')
      const blend4 = this.findOneBlend('R_eye_squint_down')
      
      gsap.to(this.morphMeshes[0].morphTargetInfluences, {
        [blend1]: 1 - value,
        [blend2]: 1 - value,
        [blend3]: 1 - value,
        [blend4]: 1 - value,
        duration: 1,
        ease: Power3.easeOut,
      })
    } else {
      const blend1 = this.findOneBlend(id)

      gsap.to(this.morphMeshes[0].morphTargetInfluences, {
        [blend1]: 1 - value,
        duration: 1,
        ease: Power3.easeOut,
      })
    }
  }

  findOneBlend(id) {
    console.log(id)
    console.log(this.morphMeshes[0].morphTargetDictionary)
    console.log(this.morphMeshes[0].morphTargetDictionary[id])
    if (this.morphMeshes) {
      console.log('uyes')
      if (this.morphMeshes[0].morphTargetDictionary.hasOwnProperty(id)) {
          console.log('uyes2')
          return this.morphMeshes[0].morphTargetDictionary[id]
        }
      }
    }

  updateBlendShapes(id, newValue) {
    console.log(id, newValue)
    const blendShapestoChange = []
    if (newValue > 1) this.inversed = 1 - newValue
    switch (id) {
      case 'eloquentHonest':
        blendShapestoChange.push({ id:'L_mouth_corner_L', inversed: true}, { id:'R_eyebrow_what', inversed: true}, { id:'L_mouth_L', inversed: true}, { id:'R_mouth_R', inversed: true})
        this.findBlendShapes(blendShapestoChange, newValue)
        break;
      case 'creativeLogic':
        blendShapestoChange.push({ id:'hair', inversed: false})
        this.findBlendShapes(blendShapestoChange, newValue)
        break;
      case 'courageousGreedy':
        break;
      case 'hyperactiveSensitive':
        blendShapestoChange.push({ id:'hyperactive', inversed: false }, { id:'L_mouth_down', inversed: false }, { id:'R_mouth_down', inversed: false }, { id:'L_eyebrow_sad', inversed: false }, { id:'R_eyebrow_sad', inversed: false })
        this.findBlendShapes(blendShapestoChange, newValue)

        break;
    }
  }

  findBlendShapes(blendShapestoChange, value) {
    this.blendShapesId = []
    if (blendShapestoChange && this.morphMeshes) {
      blendShapestoChange.forEach((blend) => {
        if (this.morphMeshes[0].morphTargetDictionary.hasOwnProperty(blend.id)) {
          this.blendShapesId.push({ id: this.morphMeshes[0].morphTargetDictionary[blend.id], inversed: blend.inversed })
        }
      })
    }


    this.changeBlendShapes(this.blendShapesId, value)
  }
  changeBlendShapes(blendShapesId, value) {
    blendShapesId.forEach((blend) => {
      gsap.to(this.morphMeshes[0].morphTargetInfluences, {
        [blend.id]: blend.inversed ? 1 - value : value,
        duration: 1,
        ease: Power3.easeOut,
      })
    })
  }
  setXtras(id) {
    // this.baby.position.set(0, 5, -1)

    const index = this.xtrasToAdd.indexOf(id)
    if (index > -1) {
      this.xtrasToAdd.splice(index, 1);
    } else {
      this.xtrasToAdd.push(id)
    }

    if (this.xtrasToAdd.length && this.morphMeshes) {
      this.xtrasToAdd.forEach((xtra) => {
        if (this.morphMeshes[0].morphTargetDictionary.hasOwnProperty(xtra)) {
          this.xtrasToChange.push(this.morphMeshes[0].morphTargetDictionary[xtra])
        }
      })
    }

  }

  babyAppearForm4() {
    var tl = gsap.timeline({ delay: 2 })
    this.xtrasToChange.forEach((xtra) => {
      const current = this.morphMeshes[0].morphTargetInfluences
      gsap.to(current, {
        [xtra]: 0,
        duration: 2,
        ease: Bounce.easeOut,
        delay: 3.5
      })
    })

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

    this.xtrasToChange.forEach((xtra) => {
      const current = this.morphMeshes[0].morphTargetInfluences
      gsap.to(current, {
        [xtra]: 0.8,
        duration: 2,
        ease: Bounce.easeInOut,
      })
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

import { Object3D, RepeatWrapping, SpotLight } from 'three'
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

    this.noseSize = 0
    this.earsSize = 0
    this.handsSize = 0
    this.overallSize = 0

    if (this.debug) {
      this.debugFolder = this.debug.addFolder({
        title: 'Baby',
        expanded: true,
      })
    }

    this.createBaby()
    // this.modifyShader()
    this.container.add(this.baby)
    this.setMovement()
  }
  createBaby() {
    this.baby = this.assets.models.baby.scene.children[0]
    console.log(this.assets.models, this.baby)

    if (!this.debug) {
      this.morphMeshes = []
      this.baby.traverse((node) => {
        console.log(node)
        if (node.isMesh && node.morphTargetInfluences) {
          console.log(node.morphTargetInfluences)

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

    // this.babyMin = this.baby.geometry.boundingBox.min.z
    // this.babyMax = this.baby.geometry.boundingBox.max.z

    // this.babyMin = this.baby.children[2].geometry.boundingBox.min.z
    // this.babyMax = this.baby.children[2].geometry.boundingBox.max.z
    // this.baby.children[2].material.transparent = true

    // faire des variables
    this.map1 = this.assets.textures.map1
    this.map1.wrapS = RepeatWrapping
    this.map1.wrapT = RepeatWrapping

    this.baby.scale.set(1.5, 1.5, 1.5)

    // this.baby.children.forEach((bone) => {
    //   bone.position.set(0, -0.5, 0)
    // })
    this.baby.position.set(0, -2, 0)

    // this.baby.children[2].material.metalness = 1
    // this.baby.children[3].material.metalness = 1
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
      s.uniforms.scale = { value: 0 }
      s.vertexShader =
        `
        uniform sampler2D map1;
        uniform float noseSize;
        uniform float earsSize;
        uniform float handsSize;
        uniform float overallSize;
        uniform float time;
        uniform float startAnimation;
        uniform float babyMin;
        uniform float babyMax;
        uniform float scale;

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

      s.fragmentShader =
        `uniform sampler2D map1;
      ` + s.fragmentShader

      s.vertexShader = s.vertexShader.replace(
        '#include <begin_vertex>',
        /*glsl*/ `
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
                vec3 pos = position * (0.8 + scale * 0.4);
                pos.xy *=  1. + effect/length(pos.xy);
                
                vec3 transformed = pos + transformation * normal;
                

            `
      )

      s.fragmentShader =
        `
            uniform float startAnimation;
            varying float startProgress;
            varying float normHeight;

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
            `
        )
      this.shader = s
      this.appear()
    }
  }

  updateUniform = (uniform, value) => {
    //Yo Leith, les valeurs dont tu as besoin pour les uniforms vont descendre ici,
    // notemment IQ pour la taille du crâne, scale pour la taille, overallSize pour la grosseur
    // handsSize pour les mains, hairColor, eyesColor, mouthSize, noseStyle et noseSize
    /*gsap.to(this.shader.uniforms[uniform], {
      value,
      duration: 1,
      ease: Power3.easeOut,
    })*/
  }

  updateBlendShapes(id, newValue) {
    console.log(id, newValue)
    const blendShapestoChange = []
    if(newValue > 1) this.inversed = 1 - newValue
    switch(id) {
        case 'eloquentHonest':
          blendShapestoChange.push('L_mouth_L', 'R_mouth_R')
          this.findBlendShapes(blendShapestoChange, newValue, false)
        break;
        case 'creativeLogic':
          blendShapestoChange.push('hair')
          this.findBlendShapes(blendShapestoChange, newValue, true)
        break;
        case 'courageousGreedy':
        break;
        case 'hyperactiveSensitive':
        break;
    }
    console.log('there')
  }

  findBlendShapes(blendShapestoChange, value, inversed) {
    this.blendShapesId = []
    if (blendShapestoChange && this.morphMeshes) {
      blendShapestoChange.forEach((blend) => {
        console.log(this.morphMeshes[0].morphTargetDictionary)
        if(this.morphMeshes[0].morphTargetDictionary.hasOwnProperty(blend)) {
          this.blendShapesId.push(this.morphMeshes[0].morphTargetDictionary[blend])
        }
      })
    }

    console.log(this.blendShapesId)

    this.changeBlendShapes(this.blendShapesId, value, inversed)
  }
  changeBlendShapes(blendShapesId, value, inversed) {
    blendShapesId.forEach((blend) => {
      console.log(blend)
      const current = this.morphMeshes[0].morphTargetInfluences
      gsap.to(current, {
        [blend]: inversed ? value : 1 - value,
        duration: 1,
        ease: Power3.easeOut,
      })
    })
  }
  setXtras(id) {
    // this.baby.position.set(0, 5, -1)
    console.log(id)
    console.log(this.morphMeshes)

    const index = this.xtrasToAdd.indexOf(id)
    if (index > -1) {
      this.xtrasToAdd.splice(index, 1);
    } else {
      this.xtrasToAdd.push(id)
    }

    if (this.xtrasToAdd.length && this.morphMeshes) {
      this.xtrasToAdd.forEach((xtra) => {
        if(this.morphMeshes[0].morphTargetDictionary.hasOwnProperty(xtra)) {
          this.xtrasToChange.push(this.morphMeshes[0].morphTargetDictionary[xtra])
        }
      })
    }

    console.log(this.xtrasToAdd)
  }

  babyAppearForm4() {
    var tl = gsap.timeline({ delay: 2 })
      this.xtrasToChange.forEach((xtra) => {
        console.log(this.morphMeshes[0].morphTargetInfluences[xtra])
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

    tl.fromTo(
      this.baby.rotation,
      { x: 0, y: 0, z: 0 },
      {
        x: 0,
        y: Math.PI * 2,
        z: 0,
        duration: 2,
        ease: Power3.easeInOut,
      }
    )
  }

  shrinkGlasses() {

    this.xtrasToChange.forEach((xtra) => {
      console.log(this.morphMeshes[0].morphTargetInfluences[xtra])
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
      this.shader.uniforms.time.value = this.time.current * 100

      // this.shader.uniforms.startAnimation.value = Math.sin(this.time.current * 0.0008) / 2. + 0.5
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

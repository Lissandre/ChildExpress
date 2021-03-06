import {
  Mesh,
  Object3D,
  BoxGeometry,
  RepeatWrapping,
  CanvasTexture,
  LinearFilter,
  ClampToEdgeWrapping,
  DoubleSide,
  PlaneGeometry,
  ImageLoader,
  ShaderMaterial,
  MeshBasicMaterial
} from 'three'

export default class Box {
  constructor(options) {
    // Options
    this.time = options.time
    this.assets = options.assets

    // Set up
    this.container = new Object3D()
    this.container.name = 'Box'

    this.oldMeasure = { width: -30 }

    // this.createBox()
  }
  createBox(job, name, money, xtras, personality, iq, weight, height) {
    var link = document.createElement('link')
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = 'https://use.typekit.net/tju5ktt.css'
    document.getElementsByTagName('head')[0].appendChild(link)

    var image = new Image()
    image.src = link.href
    image.onerror = () => {
      const canvas = this.makeCanvas(
        job,
        name,
        money,
        xtras,
        personality,
        iq,
        weight,
        height
      )
      setTimeout(() => {
        this.texture = new CanvasTexture(canvas)
        this.texture.needsUpdate = true
        this.texture.minFilter = LinearFilter
        this.texture.wrapS = ClampToEdgeWrapping
        this.texture.wrapT = ClampToEdgeWrapping

        this.texture.wrapS = RepeatWrapping
        this.texture.wrapT = RepeatWrapping

        const material = new ShaderMaterial({
          // map: this.texture,
          // map: this.assets.textures.map_box,
          side: DoubleSide,
          transparent: true,
          uniforms: {
            u_texture: { value: this.texture },
            black: { value: 0 }
          },
          vertexShader: `
        varying vec2 vUv;
  
        void main()	{
  
          vUv = uv;
  
          vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
          gl_Position = projectionMatrix * mvPosition;  

        }`,
          fragmentShader: `
        varying vec2 vUv;
        uniform float black;

        uniform sampler2D u_texture;

        void main() {

          vec3 color = texture2D(u_texture, vUv).xyz;
          if(color == vec3(0., 1., 0.)) {
            discard;
          }
          gl_FragColor = vec4(mix(color.ggg,mix(vec3(99./255.), vec3(180./255.), vUv.x), black), 1.);
        }
        `,
        })
        //99 --> 180

        this.box = this.assets.models.baby_box.scene
        //this.babyMin = this.baby.geometry.boundingBox.min.z
        //this.babyMax = this.baby.geometry.boundingBox.max.z

        //this.babyMin = this.baby.children[2].geometry.boundingBox.min.z
        //this.babyMax = this.baby.children[2].geometry.boundingBox.max.z
        // this.baby.children[2].material.transparent = true

        // faire des variables

        this.box.traverse(function (child) {
          if (child.isMesh) {
            child.material = material // assign your diffuse texture here
          }
        })
        // this.map1 = this.assets.textures.map_box
        // this.map1.wrapS = RepeatWrapping;
        // this.map1.wrapT = RepeatWrapping;
        this.container.scale.set(-3, -3, -3)
        this.container.rotation.set(Math.PI, 0, 0)

        this.container.position.set(0, -10, 0)

        this.box.children[0].position.set(0, 0, 0)

        const black = material.clone()
        black.uniforms.black.value = 1;
        this.blackBox = this.box.clone()
        this.blackBox.traverse(function (child) {
          if (child.isMesh) {
            child.material = black
          }
        })

        this.blackBox.children[0].position.set(0, 0, 0)
        this.blackBox.scale.set(0.999, 0.999, 0.999)
        this.container.add(this.box, this.blackBox)


        // this.setMovement()
      }, 2000)
    }
  }

  makeCanvas(job, name, money, xtras, personality, iq, weight, babyHeight) {
    const borderSize = 200
    this.ctx = document.createElement('canvas').getContext('2d')
    this.ctx.canvas.width = 2048
    this.ctx.canvas.height = 2048
    var imageObj = new Image()
    imageObj.src = this.assets.textures.map_box.image.src
    imageObj.addEventListener('load', () => {
      this.ctx.drawImage(this.assets.textures.map_box.image, 0, 0, 2048, 2048)
      this.ctx.font = '40pt "roc-grotesk"'
      this.ctx.fillText('My TEXT!', 20, 20)

      // const font = `${size}px bold "roc-grotesk"`;
      // this.ctx.font = font;
      // measure how long the name will be
      const doubleBorderSize = borderSize * 2

      // need to set font again after resizing canvas
      // this.ctx.font = font;
      this.ctx.textBaseline = 'top'

      this.ctx.fillStyle = 'blue'
      //ctx.fillRect(0, 0, width, height);
      this.ctx.fillStyle = 'black'

      //this.ctx.fillRect(0, 0, 1000, 1500);

      /* Nom */
      this.ctx.save()
      this.ctx.translate(550, 1200)
      this.ctx.rotate(-0.5 * Math.PI)
      this.ctx.font = `52px "roc-grotesk-wide"`
      this.ctx.fillText(name, 0, 0)
      this.ctx.restore()

      /* Job */

      this.ctx.save()
      this.ctx.translate(610, 1200)
      this.ctx.rotate(-0.5 * Math.PI)
      this.ctx.font = `40px "roc-grotesk"`
      this.ctx.fillText(job, 0, 0)
      this.ctx.restore()

      /* Money */
      this.ctx.save()
      this.ctx.translate(610, 1200)
      this.ctx.rotate(-0.5 * Math.PI)
      this.ctx.fillStyle = 'lightgrey'
      this.ctx.font = `32px "roc-grotesk"`
      this.ctx.fillText('$$$$$$$$$$', 0, 50)
      this.ctx.restore()

      this.ctx.save()
      this.ctx.translate(610, 1200)
      this.ctx.rotate(-0.5 * Math.PI)
      this.ctx.fillStyle = 'black'
      this.ctx.font = `32px "roc-grotesk"`
      this.ctx.fillText(money, 0, 50)
      this.ctx.restore()

      /* xtras */

      var xtrasFinal = Array.from(xtras)
      for (const [key, value] of Object.entries(xtrasFinal)) {
        this.ctx.save()
        this.ctx.translate(600, 1175)
        this.ctx.rotate(-0.5 * Math.PI)
        this.ctx.strokeStyle = 'black'
        this.ctx.font = `20px "roc-grotesk"`
        const uppercase = value.toUpperCase()
        if(key < 2 ) {
          this.ctx.fillText(uppercase, this.oldMeasure.width + 20, 102)
          const measure = this.ctx.measureText(uppercase)
  
          this.ctx.strokeRect(
            this.oldMeasure.width + 10,
            100,
            measure.width + 20,
            20
          )
          this.oldMeasure = measure
        } else {
          this.ctx.fillText(uppercase, this.oldMeasure.width - 115, 132)
          const measure = this.ctx.measureText(uppercase)
  
          this.ctx.strokeRect(
            this.oldMeasure.width -125,
            132,
            measure.width + 20,
            20
          )
          this.oldMeasure = measure
        }

        this.ctx.restore()
      }

      /* personnalit?? */
      var height = 80
      personality.forEach((perso) => {
        this.ctx.save()
        this.ctx.translate(2000, 800)
        this.ctx.rotate(0.5 * Math.PI)

        this.ctx.strokeStyle = 'black'
        this.ctx.fillStyle = 'black'
        this.ctx.font = '16px "roc-grotesk"'

        this.ctx.strokeRect(50, height, 300, 30)
        this.ctx.fillRect(50, height, perso.percentage * 3, 30)
        this.ctx.font = '28px "roc-grotesk"'
        this.ctx.fillText(perso.percentage + '%', 370, height)

        height += 40

        this.ctx.fillText(perso.label, 50, height)
        height += 40

        this.ctx.restore()
      })

      /* qi */
      this.ctx.save()
      this.ctx.translate(1800, 800)
      this.ctx.rotate(0.5 * Math.PI)
      this.ctx.font = `42px bold "roc-grotesk-wide"`
      this.ctx.fillText(iq, 40, 260)
      this.ctx.restore()

      /* poids */
      this.ctx.save()
      this.ctx.translate(1130, 1394)
      // this.ctx.rotate(0.5 * Math.PI)
      this.ctx.rotate(Math.PI)

      this.ctx.font = `420px bold "roc-grotesk-wide"`
      //this.ctx.fillText(weight + 'KG', -100, 65)
      this.ctx.fillText(3 + 'KG', -100, 65)

      this.ctx.restore()

      /* taille */
      this.ctx.save()
      this.ctx.translate(1130, 1394)
      this.ctx.rotate(Math.PI)

      this.ctx.font = `28px bold "roc-grotesk"`
      this.ctx.fillText(babyHeight * 100 + 'cm', 175, 65)
      this.ctx.restore()

      /* qi */
      // ctx.fillText(iq, 50, 200);

      /* poids */
      // ctx.fillText(weight + 'KG', 50, 250);

      /* taille */
      // ctx.fillText(height, 50, 300);
    })
    return this.ctx.canvas
  }

  boxAppear() {
    this.container.scale.set(-3, -3, -3)
    this.container.rotation.set(Math.PI, 0, 0)

    this.container.position.set(0, -5, 0)

    this.container.children[0].position.set(0, 0, 0)
  }
  setMovement() {
    if (this.container)
      this.time.on('tick', () => {
        this.container.rotation.y += 0.001 * this.time.delta
      })
  }
}

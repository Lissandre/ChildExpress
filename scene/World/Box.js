import { Mesh, MeshBasicMaterial, Object3D, BoxGeometry, RepeatWrapping, CanvasTexture, LinearFilter, ClampToEdgeWrapping, DoubleSide, ImageLoader } from 'three'


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
    // this.setMovement()

  }
  createBox(job, name, xtras, personality, iq, weight, height) {

    setTimeout(() => {
      const canvas = this.makeCanvas(32, job, name, xtras, personality, iq, weight, height);

      this.texture = new CanvasTexture(canvas);
      this.texture.needsUpdate = true;
      this.texture.minFilter = LinearFilter;
      this.texture.wrapS = ClampToEdgeWrapping;
      this.texture.wrapT = ClampToEdgeWrapping;


      this.texture.wrapS = RepeatWrapping;
      this.texture.wrapT = RepeatWrapping;


      const material = new MeshBasicMaterial({
        map: this.texture,
        // map: this.assets.textures.map_box,
        side: DoubleSide,
        transparent: true,
      });

      console.log(this.assets.models)
      this.box = this.assets.models.baby_box.scene
      console.log(this.box)
      //this.babyMin = this.baby.geometry.boundingBox.min.z
      //this.babyMax = this.baby.geometry.boundingBox.max.z

      //this.babyMin = this.baby.children[2].geometry.boundingBox.min.z
      //this.babyMax = this.baby.children[2].geometry.boundingBox.max.z
      // this.baby.children[2].material.transparent = true

      // faire des variables

      this.box.traverse(function (child) {

        if (child.isMesh) {

          console.log(material)

          console.log(child.geometry.attributes.uv);
          child.material = material; // assign your diffuse texture here

        }

      });
      // this.map1 = this.assets.textures.map_box
      // this.map1.wrapS = RepeatWrapping;
      // this.map1.wrapT = RepeatWrapping;

      this.container.add(this.box)
      this.box.scale.set(-3, -3, -3)
      this.box.rotation.set(Math.PI, 0, 0)

      this.box.position.set(1, 0, 0)

    }, 2000)

  }

  makeCanvas(size, job, name, xtras, personality, iq, weight, height) {
    const borderSize = 200;
    this.ctx = document.createElement('canvas').getContext('2d');
    console.log(this.assets.textures.map_box)
    this.ctx.canvas.width = 2048
    this.ctx.canvas.height = 2048

    var imageObj = new Image();
    console.log(this.assets)
    imageObj.src = this.assets.textures.map_box.image.src;
    imageObj.addEventListener("load", () => {
      console.log('her')
      console.log(this.ctx)
      this.ctx.drawImage(this.assets.textures.map_box.image, 0, 0, 2048, 2048);
      console.log('draw')
      this.ctx.font = "40pt Calibri";
      this.ctx.fillText("My TEXT!", 20, 20);


      const font = `${size}px bold Calibri`;
      this.ctx.font = font;
      // measure how long the name will be
      const doubleBorderSize = borderSize * 2;

      // need to set font again after resizing canvas
      this.ctx.font = font;
      this.ctx.textBaseline = 'top';


      this.ctx.fillStyle = 'blue';
      //ctx.fillRect(0, 0, width, height);
      this.ctx.fillStyle = 'black';

      //this.ctx.fillRect(0, 0, 1000, 1500);


      /* Job */

      this.ctx.save()
      this.ctx.font = `100px bold Calibri`;
      this.ctx.translate(550, 1200);
      this.ctx.rotate(-0.5 * Math.PI);
      this.ctx.fillText(name, 0, 0);
      this.ctx.restore()

      /* Nom */
      this.ctx.save()
      this.ctx.translate(650, 1200);
      this.ctx.rotate(-0.5 * Math.PI);
      this.ctx.font = `80px bold Calibri`;
      this.ctx.fillText(job, 0, 0);
      this.ctx.restore()

      /* xtras */

      var xtrasFinal = Array.from(xtras)
      for (const [key, value] of Object.entries(xtrasFinal)) {
        this.ctx.save()
        this.ctx.translate(650, 1200);
        this.ctx.rotate(-0.5 * Math.PI);
        this.ctx.font = `20px bold Calibri`;
        this.ctx.strokeStyle = "black";
        const uppercase = value.toUpperCase()
        this.ctx.fillText(uppercase, this.oldMeasure.width + 20, 100);
        const measure = this.ctx.measureText(uppercase)


        this.ctx.strokeRect(this.oldMeasure.width + 10, 100, (measure.width + 20), 20);
        this.oldMeasure = measure
        console.log(this.oldMeasure)
        this.ctx.restore()
      }

      /* personnalité */

      console.log(personality)
      var height = 80
      personality.forEach((perso) => {
        this.ctx.save()
        this.ctx.translate(2000, 800);
        this.ctx.rotate(0.5 * Math.PI);

        this.ctx.strokeStyle = "black";
        this.ctx.fillStyle = "black";
        this.ctx.font = `22px bold Calibri`;


        this.ctx.strokeRect(50, height, 300, 30);
        this.ctx.fillRect(50, height, perso.percentage * 3, 30);
        this.ctx.font = `28px bold Calibri`;
        this.ctx.fillText(perso.percentage + '%', 370, height);

        height += 40

        this.ctx.fillText(perso.label, 50, height);
        height += 40

        this.ctx.restore();
      })




    /* qi */
    console.log(iq)
    this.ctx.save()
    this.ctx.translate(1800, 800);
    this.ctx.rotate(0.5 * Math.PI);
    this.ctx.font = `42px bold Calibri`;
    this.ctx.fillText(iq, 40, 260);
    this.ctx.restore()

    /* poids */

    
    this.ctx.save()
    this.ctx.translate(100, 100);
    this.ctx.rotate(180* Math.PI / 180);

    this.ctx.font = `420px bold Calibri`;
    this.ctx.fillText(weight + 'KG', 500, 1500);
    this.ctx.restore()

    /* taille */
    // ctx.fillText(height, 50, 300);
    /* qi */
    // ctx.fillText(iq, 50, 200);

    /* poids */
    // ctx.fillText(weight + 'KG', 50, 250);

    /* taille */
    // ctx.fillText(height, 50, 300);

  })
    return this.ctx.canvas;
  }
  setMovement() {
    this.time.on('tick', () => {
      this.texture.needsUpdate = true;

      // this.box.rotation.y += 0.001 * this.time.delta
    })
  }

}
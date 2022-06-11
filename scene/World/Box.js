import { Mesh, MeshBasicMaterial, Object3D, BoxGeometry, RepeatWrapping, CanvasTexture, LinearFilter, ClampToEdgeWrapping, DoubleSide, ImageLoader } from 'three'

export default class Box {
  constructor(options) {
    // Options
    this.time = options.time
    this.assets = options.assets

    // Set up
    this.container = new Object3D()
    this.container.name = 'Box'

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

    this.box.position.set(1, 1, 3)

  }, 2000)

  }

  makeCanvas(size, job, name, xtras, personality, iq, weight, height) {
    const borderSize = 200;
    this.ctx = document.createElement('canvas').getContext('2d');
    console.log(this.assets.textures.map_box)
    this.ctx.canvas.width = 2048
    this.ctx.canvas.height = 2048
    
    this.ctx.drawImage(this.assets.textures.map_box.image, 0, 0, 2048, 2048);


    const font = `${size}px bold NeueBit`;
    this.ctx.font = font;
    // measure how long the name will be
    const doubleBorderSize = borderSize * 2;

    // need to set font again after resizing canvas
    this.ctx.font = font;
    this.ctx.textBaseline = 'top';


    this.ctx.fillStyle = 'blue';
    //ctx.fillRect(0, 0, width, height);
    this.ctx.fillStyle = 'red';

    this.ctx.fillRect(1500, 1500,  1000, 1500);

    
    /* Job */
    this.ctx.font =`100px bold NeueBit`;
    this.ctx.fillText(name, 50, 0);
    
    /* Nom */
    this.ctx.fillStyle = 'white';
    this.ctx.font =`80px bold NeueBit`;
    this.ctx.fillText(job, 50, 50);
    
    /* xtras */
    this.ctx.font =`40px bold NeueBit`;
    this.ctx.strokeStyle = "white";
    this.ctx.fillText(xtras[0], 50, 100);
    this.ctx.strokeRect(5, 100, 250, 50);

    /* personnalité */
    
    console.log(personality)
    var height = 100
    personality.forEach((perso) => {
      this.ctx.fillText(perso.label, 50, height);
      height += 50

      this.ctx.strokeStyle = "white";
      this.ctx.fillStyle = "white";

      this.ctx.strokeRect(50, height, 500, 50);
      this.ctx.fillRect(50, height,  perso.percentage * 3, 50);
      height += 50
    })


    /* qi */
    // ctx.fillText(iq, 50, 200);

    /* poids */
    // ctx.fillText(weight + 'KG', 50, 250);

    /* taille */
    // ctx.fillText(height, 50, 300);
    /* qi */
    // ctx.fillText(iq, 50, 200);

    /* poids */
    // ctx.fillText(weight + 'KG', 50, 250);

    /* taille */
    // ctx.fillText(height, 50, 300);

    return this.ctx.canvas;
  }
  imageCanvas() {
    const loader = new ImageLoader();
    const ctx = document.createElement('canvas').getContext('2d');

    loader.load(
      // resource URL
      '@assets/textures/map_box.png',

      // onLoad callback
      function (image) {
        // use the image, e.g. draw part of it on a canvas
        this.img = image
      },
    )

    ctx.drawImage(this.img, 0, 0)


    /*var img1 = new Image();
    
        img1.crossOrigin='anonymous'
        img1.onload = () => {
          // onLoad callback
          console.log(typeof img1)
          // use the image, e.g. draw part of it on a canvas
        };
        img1.src = this.assets.textures.map_box
    
        console.log(typeof this.assets.textures.map_box)
        //ctx.drawImage(this.assets.textures.map_box, 0, 0)
    */
  }
  writeOnBox(job) {
    console.log('writed')
  }
  setMovement() {
    this.time.on('tick', () => {
      this.texture.needsUpdate = true;
      
      // this.box.rotation.y += 0.001 * this.time.delta
    })
  }

}
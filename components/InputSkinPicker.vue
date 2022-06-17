<template>
  <div class="relative pointer-events-auto h-[240px] w-fit">
    <fieldset :class="`animate-bounce-in ${input.class} flex flex-col h-full w-full`">
      <div class="skinpicker-wrapper">
        <div class="borderbox"></div>
          <span ref="skinThumb" id="skinpicker-thumb"></span>
          <canvas ref="skinCanvas" id="skinCanvas"></canvas>
        </div>
    <label class="w-20 mt-5 w-max text-white text-[22px]">{{ locale }}</label>
    </fieldset>
  </div>
</template>


<script>
let glslCanvas = null
if (process.client) {
  glslCanvas = require('glslCanvas')
}

export default {
  name: 'InputSkinPicker',
  props: ['input', 'locale'],
  data() {
    return {}
  },
  mounted() {
    this.canvas = this.$refs.skinCanvas
    this.thumb = this.$refs.skinThumb
    this.sandbox = new glslCanvas.default(this.canvas)
    this.sandbox.load(`
        #ifdef GL_ES
        precision highp float;
        #endif

        uniform vec2 u_resolution;
        uniform vec2 u_mouse;
        uniform float u_time;

        vec3 c1a = vec3(252,220,210)/255.;
        vec3 c2a = vec3(245,192,158)/255.;
        vec3 c3a = vec3(219,178,136)/255.;
        vec3 c4a = vec3(178,91,32)/255.;

        vec3 c1b = vec3(245.,192.,158.)/255.;
        vec3 c2b = vec3(255.,209.,166.)/255.;
        vec3 c3b = vec3(204.,142.,74.)/255.;
        vec3 c4b = vec3(135.,76.,43.)/255.;

        vec3 c1c = vec3(242,170,145)/255.;
        vec3 c2c = vec3(249,173,115)/255.;
        vec3 c3c = vec3(204,125,54)/255.;
        vec3 c4c = vec3(85,49,23)/255.;

        void main() {
            vec2 st = gl_FragCoord.xy/u_resolution.xy;
            
            vec3 color = vec3(0.);
            
            vec3 c1 = vec3(0.);
            vec3 c2 = vec3(0.);
            vec3 c3 = vec3(0.);
            vec3 c4 = vec3(0.);
            
            if(st.x < 1. / 2.){
                c1 = mix(c1a, c1b,smoothstep(0./2., 1./2., st.x));
                c2 = mix(c2a, c2b,smoothstep(0./2., 1./2., st.x));
                c3 = mix(c3a, c3b,smoothstep(0./2., 1./2., st.x));
                c4 = mix(c4a, c4b,smoothstep(0./2., 1./2., st.x));
            }
            else{
                c1 = mix(c1b, c1c,smoothstep(1./2., 2./2., st.x));
                c2 = mix(c2b, c2c,smoothstep(1./2., 2./2., st.x));
                c3 = mix(c3b, c3c,smoothstep(1./2., 2./2., st.x));
                c4 = mix(c4b, c4c,smoothstep(1./2., 2./2., st.x));
            }
        
            if(st.y < 1. / 3.)
                color = mix(c1, c2, smoothstep(0./3., 1./3., st.y));
            else if(st.y < 2. / 3.)
                color = mix(c2, c3,smoothstep(1./3., 2./3., st.y));
            else
                color = mix(c3, c4, smoothstep(2./3., 3./3., st.y));
            
            gl_FragColor = vec4(color,1.);
        }
        `)
    this.ctx = this.canvas.getContext('webgl')

    this.pixels = new Uint8Array(
      4 * this.ctx.drawingBufferWidth * this.ctx.drawingBufferHeight
    )
    this.ctx.readPixels(
      0,
      0,
      this.ctx.drawingBufferWidth,
      this.ctx.drawingBufferHeight,
      this.ctx.RGBA,
      this.ctx.UNSIGNED_BYTE,
      this.pixels
    )

    this.mouseDown = false
    this.$el.addEventListener('mousedown', (e) => {
      this.mouseDown = true
      this.updateColor(e)
    })
    this.$el.addEventListener('mouseup', () => {
      this.mouseDown = false
    })

    this.canvas.addEventListener('mousemove', (e) => {
      if (!this.mouseDown) return
      this.updateColor(e)
    })
  },
  methods: {
    onChange(value) {

      console.log('change', value)
      this.$emit(
        'updateInput',
        this.input.type,
        this.input.name,
        value
        // COLOR
      )
    },

    updateColor(e) {
      this.thumb.style.transform = `translate3d(${e.offsetX - 15}px, ${
        e.offsetY - 
      15}px, 0px)`
      let c = this.getColor(
        this.ctx,
        e.offsetX,
        this.canvas.offsetHeight - e.offsetY
      )
      this.thumb.style.background = `rgba(${c.r}, ${c.g}, ${c.b}, 1)`

      this.onChange(c)
    },

    getColor(context, x, y) {
      return {
        r: this.pixels[4 * (y * context.drawingBufferWidth + x)],
        g: this.pixels[4 * (y * context.drawingBufferWidth + x) + 1],
        b: this.pixels[4 * (y * context.drawingBufferWidth + x) + 2],
      }
    },
  },
}
</script>

<style>
#skinpicker-thumb {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: solid 3px blue;
  position: absolute;
}

.skinpicker-wrapper {
      width: fit-content;
    height: fit-content;
    position: relative;
}
.borderbox{
  width: 100%;
  height: 100%;
  position: absolute;
  box-shadow: inset 0px 11.5px 20px white, inset -5.82px -4.5px 6.5px 0px white;
  border-radius: 13px;
}

#skinCanvas {
  pointer-events: all;
  border-radius: 13px;
  
}

.skinform2 {
  box-shadow: none;
}
</style>
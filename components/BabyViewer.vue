<template>
  <div>
    <div
      class="baby-container absolute left-1/2 top-1/2 z-[2] pointer-events-auto"
      style="width: 100%; height: 100%; transform: translate3d(-50%, -50%, 0)"
    >
      <canvas
        id="_canvas1"
        ref="canvas1"
        class="absolute"
        style="width: 100vw; height: 100vh"
      ></canvas>
    </div>
    <div
      class="
        background-container
        absolute
        left-1/2
        top-1/2
        pointer-events-auto
        w-screen
        h-screen
      "
      style="transform: translate3d(-50%, -50%, 0)"
    >
      <canvas
        id="glslCanvas"
        ref="canvas2"
        class="glslCanvas absolute z-0"
        data-fragment="
          #ifdef GL_ES
          precision mediump float;
          #endif

          uniform vec2 u_resolution;
          uniform float u_time;

          vec3 mainColor = vec3(0.760,0.888,0.995);
          vec3 accentColor = vec3(0.909,0.011,0.955);

          float grain(vec2 uv){
              float mdf = 0.05;
              float noise = (fract(sin(dot(uv + u_time*0.001, vec2(12.9898,78.233)*2.0)) * 43758.5453));
              return noise * mdf;
          }

          void main() {
              vec2 st = gl_FragCoord.xy/u_resolution.xy;
              st.y /= u_resolution.x/u_resolution.y;
            
              vec3 color = mainColor;
              color -= grain(st);
            
              vec2 accentPos = vec2(sin(u_time*0.3), cos(u_time*0.3))*0.5;
              vec3 accent = max(0., 1.-distance(accentPos,st)) * accentColor;
              color += accent*0.2;
              
              float floor = smoothstep(0.8,0.9,1.-st.y) * 1.-distance(st.x,0.5);
              color += floor * 0.1;
              
              gl_FragColor = vec4(color,1.0);
          }
        "
        width="100vw"
        height="100vh"
      ></canvas>
      <div
        class="
          h-full
          w-full
          flex
          justify-center
          items-center
          flex-col
          absolute
          top-0
        "
        v-if="isLoading"
      >
        <div class="loader"></div>
      </div>
    </div>
  </div>
</template>

<script>
let glslCanvas = null
if (process.client) {
  glslCanvas = require('glslCanvas')
}

export default {
  data() {
    return {
      isLoading: false,
    }
  },
  mounted() {
    this.$scene.setCanvas(this.$refs.canvas1)

    this.$refs.canvas2.width = window.innerWidth
    this.$refs.canvas2.height = window.innerHeight
    window.addEventListener('resize', () => {
      this.$refs.canvas2.width = window.innerWidth
      this.$refs.canvas2.height = window.innerHeight
    })
    // if()

    // if (this.$backgroundScene.assets.needsLoad) {
    //   this.isLoading = true
    //   this.$backgroundScene.assets.on('ressourcesReady', () => {
    //     this.$backgroundScene.init({ canvas: this.$refs.canvas2 })
    //     this.isLoading = false
    //   })
    // } else {
    //   this.$backgroundScene.init({ canvas: this.$refs.canvas2 })
    // }
  },
}
</script>

<style>
.loader {
  border: 5px solid #f3f3f3;
  border-top: 5px solid #000000;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
<template>
  <div>
    <div
      class="baby-container absolute left-1/2 top-1/2 z-[1] pointer-events-none"
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
        class="absolute z-0"
        style="width: 100vw; height: 100vh"
        data-fullscreen="true"
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
    this.sandbox = new glslCanvas.default(this.$refs.canvas2)

    this.$refs.canvas2.setAttribute(
      'width',
      window.innerWidth * window.devicePixelRatio
    )
    this.$refs.canvas2.setAttribute(
      'height',
      window.innerHeight * window.devicePixelRatio
    )

    this.sandbox.load(`
    #ifdef GL_ES
    precision highp float;
    #endif
    #define PI 3.141592
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    uniform float u_time;
    uniform float u_darkness;

    vec3 mainC = vec3(180.,210.,229.)/255.;
    vec3 accentC = vec3(0.790,0.676,1.000);

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

    float grain(vec2 uv){
        float mdf = 0.05;
        float noise = (fract(sin(dot(uv + u_time*0.01, vec2(12.9898,78.233)*2.0)) * 43758.5453));
        return noise * mdf;
    }

    void main() {
        vec2 st = gl_FragCoord.xy/u_resolution.xy;
        // st.x *= u_resolution.x/u_resolution.y;

        vec3 color = vec3(0.);
        color = mix(mainC, accentC, max(0., smoothstep(0.3, 0.9,noise(vec3(st*2., u_time*0.1))) - 0.6));
        color *= 1. - u_darkness;
        float ground = (smoothstep(0.7,0.85,1.-st.y) * (sin(st.x*PI)/2.+0.6));
        
        color += ground * 0.2;
        
        color -= grain(st)*1.5;
        gl_FragColor = vec4(color,1.0);
    }
  `)
    this.sandbox.setUniform('u_darkness', 0.5)
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

<template>
  <canvas
    ref="backgroundCanvas"
    id="backgroundCanvas"
    class="z-[-10000] fixed h-screen w-full"
  ></canvas>
</template>

<script>
let glslCanvas = null
if (process.client) {
  glslCanvas = require('glslCanvas')
}

export default {
  props: ['dark'],
  data() {
    return {}
  },
  mounted() {
    this.canvas = this.$refs.backgroundCanvas
    this.setSize()
    window.addEventListener('resize', this.setSize)
    this.sandbox = new glslCanvas.default(this.canvas)

    this.sandbox.load(`
        #ifdef GL_ES
        precision highp float;
        #endif

        uniform vec2 u_resolution;
        uniform vec2 u_mouse;
        uniform float u_time;
        uniform float u_scroll;
        uniform float u_dark;

        uniform vec3 c0;
        uniform vec3 c1;
        uniform vec3 c2;
        uniform vec3 c3;

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
            st.x /= u_resolution.y / u_resolution.x;
            st.y -= u_scroll;
            st += u_mouse/u_resolution*0.1;
            float t = u_time * 0.1;
            vec3 color = c0;
            color = mix(color, c1, smoothstep(u_dark*0.8, 1., noise(vec3(st*2., t))));
            color = mix(color, c2, smoothstep(u_dark*0.8, 1., noise(vec3(st*2., t + 100.))));
            color = mix(color, c3, smoothstep(u_dark*0.8, 1., noise(vec3(st*2., t + 200.))));
            
            color = mix(c0, color, min(1., u_time));
            color -= grain(st)*3.*(0.3 + 2.*u_dark/3.);
            gl_FragColor = vec4(color,1.);
        }
        `)

    if (this.dark) {
      this.sandbox.setUniform('c0', 29 / 255, 29 / 255, 27 / 255)
      this.sandbox.setUniform('c1', 97 / 255, 228 / 255, 180 / 255)
      this.sandbox.setUniform('c2', 188 / 255, 72 / 255, 13 / 255)
      this.sandbox.setUniform('c3', 76 / 255, 74 / 255, 221 / 255)
      this.sandbox.setUniform('u_dark', 1)
    } else {
      this.sandbox.setUniform('c0', 1, 1, 1)
      this.sandbox.setUniform('c1', 244 / 255, 200 / 255, 223 / 255)
      this.sandbox.setUniform('c2', 251 / 255, 245 / 255, 228 / 255)
      this.sandbox.setUniform('c3', 190 / 255, 206 / 255, 225 / 255)
      this.sandbox.setUniform('u_dark', 0)
    }

    this.sandbox.setUniform('u_scroll', 0)
    this.$ScrollTrigger.create({
      onUpdate: (self) => {
        this.sandbox.setUniform('u_scroll', Number(self.progress.toFixed(4)))
      },
    })
  },
  methods: {
    setSize() {
      this.canvas.setAttribute('width', window.innerWidth)
      this.canvas.setAttribute('height', window.innerHeight)
    },
  },
}
</script>

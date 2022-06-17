<template>
  <canvas ref="backgroundCanvas" id="backgroundCanvas"></canvas>
</template>


<script>
let glslCanvas = null
if (process.client) {
  glslCanvas = require('glslCanvas')
}

export default {
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

        vec3 c1 = vec3(244., 200., 223.) / 255.;
        vec3 c2 = vec3(251., 245., 228.) / 255.;
        vec3 c3 = vec3(190., 206., 225.) / 255.;

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

        void main() {
            vec2 st = gl_FragCoord.xy/u_resolution.xy;
            st.y -= u_scroll;
            st += u_mouse/u_resolution*0.3;
            float t = u_time * 0.5;
            vec3 color = vec3(1.);
            color = mix(color, c1, noise(vec3(st*2., t)));
            color = mix(color, c2, noise(vec3(st*2., t + 100.)));
            color = mix(color, c3, noise(vec3(st*2., t + 200.)));
            
            color = mix(vec3(1.), color, min(1., u_time));
            gl_FragColor = vec4(color,1.);
        }
        `)

    this.canvas.addEventListener('mousemove', (e) => {
      if (!this.mouseDown) return
      this.updateColor(e)
    })

    this.sandbox.setUniform('u_scroll', 0)
    window.addEventListener('scroll', (e) => {
      var winScroll =
        document.body.scrollTop || document.documentElement.scrollTop
      var scrolled = winScroll / window.innerHeight

      this.sandbox.setUniform('u_scroll', scrolled)
    })
  },
  methods: {
    setSize() {
      this.canvas.setAttribute(
        'width',
        window.innerWidth * window.devicePixelRatio
      )
      this.canvas.setAttribute(
        'height',
        window.innerHeight * window.devicePixelRatio
      )
    },
  },
}
</script>

<style>
#backgroundCanvas {
  z-index: -10000;
  position: fixed;
}
</style>
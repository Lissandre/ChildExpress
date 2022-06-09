export default {
  target: 'static',
  generate: {
    fallback: true,
  },
  head: {
    title: 'ChildExpress',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: "https://use.typekit.net/tju5ktt.css" }

    ],
  },
  css: [],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~plugins/scene.js', mode: 'client' },
    { src: '~plugins/pinia.js', mode: 'all' },
    { src: '~plugins/helpers.js', mode: 'all' },
  ],
  components: true,
  buildModules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/composition-api/module',
    ['@pinia/nuxt', { disableVuex: false }],
    'nuxt-webpack-optimisations',
  ],
  modules: ['@nuxtjs/axios', '@nuxtjs/i18n'],
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: '/',
  },
  tailwindcss: {
    exposeConfig: false,
    viewer: false,
  },
  i18n: {
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en/index.js',
      },
      {
        code: 'fr',
        name: 'Français',
        file: 'fr/index.js',
      },
    ],
    detectBrowserLanguage: {
      useCookie: false,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root', // recommended
    },
    langDir: '~/locales/',
    strategy: 'prefix',
  },
  webpackOptimisations: {
    risky: true,
    debug: false,
    measure: false,
    measureMode: 'all',
    esbuildMinifyOptions: {
      client: {
        target: 'es2017',
      },
      server: {
        target: 'node14',
      },
      modern: {
        target: 'es2017',
      },
    },
    esbuildLoaderOptions: {
      client: {
        target: 'es2017',
      },
      server: {
        target: 'node14',
      },
      modern: {
        target: 'es2017',
      },
    },
    features: {
      postcssNoPolyfills: true,
      esbuildLoader: true,
      esbuildMinifier: true,
      imageFileLoader: true,
      webpackOptimisations: true,
      //cacheLoader: true,
      //hardSourcePlugin: true,
      //parallelPlugin: true,
    },
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      vue: {
        prettify: false,
      },
    },
    // transpile: ['three'],
    extend(config) {
      config.module.rules.push({
        test: /\.(glsl|vs|fs|frag|vert)$/,
        exclude: /node_modules/,
        use: ['raw-loader', 'glslify-loader'],
      }),
        config.module.rules.push({
          test: /\.(fbx|glb|obj|3ds|gltf|tif)$/,
          exclude: /node_modules/,
          use: ['file-loader'],
        })
    },
  },
}

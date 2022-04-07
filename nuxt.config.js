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
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  css: [],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '~plugins/scene.client.js', mode: 'client' }],
  components: true,
  buildModules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/composition-api/module',
    '@pinia/nuxt',
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
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root', // recommended
    },
    langDir: '~/locales/',
    strategy: 'prefix',
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
          test: /\.(fbx|glb|obj|3ds|gltf)$/,
          exclude: /node_modules/,
          use: ['file-loader'],
        })
    },
  },
}

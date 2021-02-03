import { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    bodyAttrs: {
      class: process.env.NODE_ENV === 'development' ? 'debug-screens' : ''
    },
    titleTemplate: '%s - Smile Assessment',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Server Middleware
   */
  serverMiddleware: {
    '/api': '~/api'
  } as any,

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~plugins/axios', '~plugins/vue-js-modal'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/svg',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts'
  ],

  googleFonts: {
    download: true,
    families: {
      Montserrat: {
        wght: [400, 600]
      },
      'Libre+Baskerville': {
        ital: [400]
      }
    }
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'nuxt-protected-mailto'

    // '@nuxtjs/recaptcha'
  ],

  axios: {
    baseURL:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://smile-assessment.herokuapp.com'
  },

  // recaptcha: {
  //   size: 'compact',
  //   key: ""
  // },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    postcss: {
      plugins: {
        'postcss-nested': {}
      }
    },
    html: {
      minify: {
        decodeEntities: false
      }
    }
  }
}

export default config

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  env: {
    EXPRESS_SERVER_URL: process.env.EXPRESS_SERVER_URL, 
    APP_NAME: process.env.APP_NAME,
    APP_SLOGAN: process.env.APP_SLOGAN,
    COPYRIGHT_YEAR: process.env.COPYRIGHT_YEAR,
    FACEBOOK_LINK: process.env.FACEBOOK_LINK,
    TWITTER_LINK: process.env.TWITTER_LINK,
    INSTAGRAM_LINK: process.env.INSTAGRAM_LINK,
    PINTEREST_LINK: process.env.PINTEREST_LINK,
    YOUTUBE_LINK: process.env.YOUTUBE_LINK,
    META_DESCRIPTION: process.env.META_DESCRIPTION,
    APP_KEYWORDS: process.env.APP_KEYWORDS,
    OG_TITLE: process.env.OG_TITLE,
    OG_IMAGE: process.env.OG_IMAGE,
    OG_DESCRIPTION: process.env.OG_DESCRIPTION,
    OG_URL: process.env.OG_URL,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: `%s - ${process.env.APP_SLOGAN}`,
    title: process.env.APP_NAME,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.META_DESCRIPTION },
      { name: 'keywords', content: process.env.APP_KEYWORDS },
      { name: 'title', property: 'og:title', content: process.env.OG_TITLE },
      { name: 'image', property: 'og:image', content: process.env.OG_IMAGE },
      { name: 'url', property: 'og:url', content: process.env.OG_URL },
      { 
        name: 'description', 
        property: 'og:description', 
        content: process.env.OG_DESCRIPTION 
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/app.sass'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/chat-scroll.js',
    '@/plugins/filter-pretty-bytes.js',
    '@/plugins/qrcode-component.js',
    '@/plugins/social-sharing.js',
    '@/plugins/peer-client.js',
    '@/plugins/socket-io-client.js',
    '@/plugins/file-preview.js',
    '@/plugins/send-file.js',
    '@/plugins/receive-file.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: [
      '~/components',
      '~/components/dialogs',
    ]
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://axios.nuxtjs.org/
    '@nuxtjs/axios'
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    meta: {
      mobileAppIOS: true,
      appleStatusBarStyle: {
        name: process.env.APP_NAME,
        description: process.env.APP_SLOGAN,
        theme_color: '#11998E',
        lang: 'en'
      }
    },
    manifest: {
      name: process.env.APP_NAME,
      short_name: process.env.APP_NAME,
      description: process.env.APP_SLOGAN,
      theme_color: '#11998E',
      lang: 'en'
    },
    workbox: {
      offline: false
    }
  },

  axios: {
    // Used as fallback if no runtime config is provided
    baseURL: process.env.EXPRESS_SERVER_URL, 
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.EXPRESS_SERVER_URL
    }
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.EXPRESS_SERVER_URL
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    optionsPath: "./plugins/vuetify-options.js",
    defaultAssets: {
      font: {
        family: 'Montserrat'
      },
      icons: false
    },
    treeShake: true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}

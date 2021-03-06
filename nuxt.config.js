export default {
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: '表單系統',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    { src: '~/plugins/persistedState.js'}
  ],

  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,

  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/tailwindcss',
    ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxt/http',
    '@nuxtjs/axios',
    [
      '@nuxtjs/firebase',{
        config: {
          apiKey: "AIzaSyBF-bUNVqCBw-KL6WAnIm1okZ9CV3-6OtQ",
          authDomain: "inquiry-app.firebaseapp.com",
          projectId: "inquiry-app",
          storageBucket: "inquiry-app.appspot.com",
          messagingSenderId: "760771771130",
          appId: "1:760771771130:web:cb19164ddcd2f86f0be743",
          measurementId: "G-JGL7N6TBB5"
        },
        services: {
          auth: {
            persistence: 'local'
          }
        }
      },
    ],
  ],
  // axios: {
  //   baseURL: "http://ec2-3-12-149-38.us-east-2.compute.amazonaws.com:3000/"
  // },
  /*
  ** Server Middleware
  */
  serverMiddleware: [
    { path: '/api', handler: '~/api/index.js'}
  ],
  /*
  ** For deployment you might want to edit host and port
  */
  // server: {
  //  port: 3000, // default: 3000
  //  host: '0.0.0.0' // default: localhost
  // },

  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    extend ( config, { isDev, isClient, isServer } ) {
      if ( isServer ) {
        config.externals = {
          '@firebase/app': '@nuxtjs/firebase',
        }
      }
    }
  },
  router: {
    middleware: 'router-auth'
  },
  css: [
    '@fortawesome/fontawesome-free/css/all.css'
  ],
}

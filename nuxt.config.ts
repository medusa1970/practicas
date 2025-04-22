// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', 'nuxt-quasar-ui'],
  pinia: {},
  quasar: {
    // Configurable Component Defaults
    components: {
      defaults: {
        QBtn: {
          dense: true,
          flat: true,
        },
        QInput: {
          dense: true,
        },
      },
    },
    plugins: ['Dialog', 'Notify', 'Loading'],
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'http://localhost:3000',
    },
  },
  devServer: {
    host: '0.0.0.0', // Escucha en todas las interfaces de red
    port: 3000, // Puerto predeterminado (puedes cambiarlo si lo deseas)
  },
  imports: {
    dirs: ['stores'],
  },
  build: {
    transpile: ['quasar'],
  },
  plugins: [{ src: '~/plugins/pinia-persistedstate', mode: 'client' }],
});

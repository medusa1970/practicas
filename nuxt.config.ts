// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['nuxt-quasar-ui'],
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
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3001',
    },
  },
  devServer: {
    host: '0.0.0.0', // Escucha en todas las interfaces de red
    port: 3000, // Puerto predeterminado (puedes cambiarlo si lo deseas)
  },
});

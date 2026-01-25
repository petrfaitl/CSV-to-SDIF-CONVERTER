// https://nuxt.com/docs/api/configuration/nuxt-config


// @ts-ignore
export default defineNuxtConfig({
  compatibilityDate: "2025-02-27",
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],
  imports: {
    dirs: ["components/"]
  },
  modules: [
    "@formkit/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/google-fonts",
    '@nuxtjs/tailwindcss'
  ],
  formkit: {
    // Experimental support for auto loading (see note):
    autoImport: true
  },
  tailwindcss: {
    cssPath: ['~/assets/css/tailwind.css', { injectPosition: "first" }],
    config: {configPath: "./tailwind.config.js"},
    viewer: true,
    exposeConfig: false,
  },
  googleFonts: {
    families: {
      Montserrat: [200, 300, 400, 500, 600, 700, 900],
      Roboto:[200, 400, 600, 900]
    },
    display: "swap"
  },
  routeRules: {
    "/**": { ssr: false }
  }
});

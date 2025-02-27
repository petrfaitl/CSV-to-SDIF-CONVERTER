// https://nuxt.com/docs/api/configuration/nuxt-config

// @ts-ignore
export default defineNuxtConfig({
  compatibilityDate: '2025-02-27',
  tailwindcss: {
    exposeConfig: true,
    viewer: false,
  },
  imports: {
    dirs: ["components/"],
  },
  modules: [
    "@formkit/nuxt",
    "@vueuse/nuxt",
    [
      "@nuxtjs/tailwindcss",
      {
        cssPath: "assets/css/tailwind.css",
        configPath: "tailwind.config.js",
        exposeConfig: true,
        config: {},
        injectPosition: 0,
        viewer: false,
      },
    ],
    "@nuxtjs/google-fonts",
  ],
  googleFonts: {
    families: {
      Montserrat: [200, 400, 600, 900],
    },
    display: "swap",
  },
  routeRules: {
    "/**": { ssr: false },
  },
});

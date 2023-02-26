// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
    css: [
        '~/assets/style.css'
      ],
      runtimeConfig: {
        API_BASE_URL: '',
      }
    
})

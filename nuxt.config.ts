export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  css: [
    'bootstrap/dist/css/bootstrap.min.css'
  ],

  app: {
    head: {
      title: 'Product Dashboard',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Hệ thống quản lý sản phẩm với Nuxt 3 và Bootstrap 5' }
      ],
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js',
          type: 'text/javascript'
        }
      ]
    }
  }
})

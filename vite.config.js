import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/noor/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: false // في التطوير: اطفاء كامل، تشوف تعديلك لحظياً
      },
      workbox: {
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [{
          urlPattern: /.*\.json$/,
          handler: 'CacheFirst',
          options: { cacheName: 'quran-json', expiration: { maxEntries: 300, maxAgeSeconds: 31536000 } }
        }]
      },
      manifest: {
        name: 'نور المسلم',
        short_name: 'نور',
        description: 'رفيقك اليومي للقرآن والأذكار',
        background_color: '#0a3d2e',
        theme_color: '#0a3d2e',
        display: 'standalone',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ]
})
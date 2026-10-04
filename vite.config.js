import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/noor/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['**/*'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,woff,woff2,ttf}'],
        runtimeCaching: [
          {
            urlPattern: /.*\.json$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'quran-json-cache',
              expiration: {
                maxEntries: 300,
                maxAgeSeconds: 60 * 60 * 24 * 365 // سنة كاملة
              }
            }
          }
        ]
      },
      manifest: {
        name: 'نور المسلم',
        short_name: 'نور',
        description: 'رفيقك اليومي للقرآن والأذكار',
        theme_color: '#0f5a43',
        background_color: '#062a22',
        display: 'standalone',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ]
})
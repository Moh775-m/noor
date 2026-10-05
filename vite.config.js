import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/noor/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['pwa-192x192.png','pwa-512x512.png','apple-touch-icon.png'],
      manifest: {
        name: 'نور المسلم',
        short_name: 'نور المسلم',
        description: 'رفيقك اليومي للقرآن والأذكار',
        theme_color: '#0f5a43',
        background_color: '#0f5a43',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/noor/',
        scope: '/noor/',
        icons: [
          { 
            src: 'pwa-192x192.png', 
            sizes: '192x192', 
            type: 'image/png', 
            purpose: 'any' 
          },
          { 
            src: 'pwa-512x512.png', 
            sizes: '512x512', 
            type: 'image/png', 
            purpose: 'any maskable' 
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            // هذا هو الحل لمشكلة الصوت بدون نت
            urlPattern: /^https:\/\/.*\.mp3quran\.net\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'noor-audio-v2',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 365 // سنة كاملة
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.(?:gstatic|googleapis)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
              expiration: { maxEntries: 20, maxAgeSeconds: 60*60*24*365 }
            }
          }
        ]
      }
    })
  ]
})
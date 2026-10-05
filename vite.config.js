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
        // لا تخلي الـ Workbox يكاش الصوت تلقائيا
        runtimeCaching: [
          {
            // أهم تعديل: شغل الصوت مباشر من النت، لا تنتظر الكاش
            urlPattern: /^https:\/\/.*\.mp3quran\.net\/.*/i,
            handler: 'NetworkOnly',
          },
          {
            urlPattern: /^https:\/\/fonts\.(?:gstatic|googleapis)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
              expiration: { maxEntries: 20, maxAgeSeconds: 60*60*24*365 }
            }
          },
          {
            urlPattern: /^https:\/\/.*\.(?:png|jpg|jpeg|svg|gif)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: { maxEntries: 100, maxAgeSeconds: 60*60*24*30 }
            }
          }
        ]
      }
    })
  ]
})
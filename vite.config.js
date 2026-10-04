import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['pwa-192x192.png','pwa-512x512.png'],
      manifest: {
        name: 'نور المسلم',
        short_name: 'نور المسلم',
        description: 'رفيقك اليومي للقرآن والأذكار',
        theme_color: '#0f5a43',
        background_color: '#0f5a43',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
        ]
      }
    })
  ]
})
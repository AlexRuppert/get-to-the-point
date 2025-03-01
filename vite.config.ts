import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import { SvelteKitPWA } from '@vite-pwa/sveltekit'
const BASE = '/get-to-the-point/'
export default defineConfig({
  plugins: [
    sveltekit(),
    SvelteKitPWA({
      registerType: 'autoUpdate',
      base: BASE,
      manifest: {
        name: 'Get to the Point',
        icons: [
          {
            src: BASE + 'favicon.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: BASE + 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ],
        theme_color: '#ffffff',
        "background_color": "#ffffff",
        display: 'standalone'
      },
      workbox: {
        sourcemap: false
      }
    })
  ]
})

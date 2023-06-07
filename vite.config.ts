import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa'
const BASE = '/get-to-the-point/'
export default defineConfig({
  plugins: [sveltekit(), VitePWA({
    base: BASE,
    registerType: 'autoUpdate',
    manifest: {
      name: 'Get to the Point',

      theme_color: '#fff',
      display: 'standalone',
    },
    workbox: {
      sourcemap: false,
    },
  })],

});

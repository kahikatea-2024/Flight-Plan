import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          $green: #52B788;
          $primary: $green;
          @import "bulma/bulma";
        `,
      },
    },
  },
})

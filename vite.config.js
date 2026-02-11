import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'ad_consult_speed_dials.js',
      name: 'ADSpeeddials',
      fileName: 'ad-speeddials',
      // CHANGE: Use 'iife' instead of 'es'
      formats: ['iife'] 
    },
    rollupOptions: {
      external: ['@wxcc-desktop/sdk'],
      output: {
        // This tells Vite: "When you see an import for the SDK, 
        // use the global 'window.Desktop' object instead."
        globals: {
          '@wxcc-desktop/sdk': 'Desktop'
        },
        // Ensure the file stays as a single self-executing script
        extend: true
      }
    }
  }
});

import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'ad_consult_speed_dials.js',
      name: 'ADSpeeddials',
      fileName: 'ad-speeddials',
      formats: ['es'] // Force ES Module format which is cleaner for Webex
    },
    rollupOptions: {
      // 1. IGNORE these packages during build
      external: [
        '@wxcc-desktop/sdk', 
        'lit', 
        'lit-element'
      ],
      output: {
        // 2. Map imports to global variables (if needed for fallback)
        globals: {
          '@wxcc-desktop/sdk': 'Desktop'
        }
      }
    }
  }
});

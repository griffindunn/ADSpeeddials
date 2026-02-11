import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'ad_consult_speed_dials.js',
      name: 'ADSpeeddials',
      fileName: 'ad-speeddials'
    },
    rollupOptions: {
      // 1. Tell Vite NOT to bundle this package
      external: ['@wxcc-desktop/sdk'],
      output: {
        // 2. Tell Vite that inside the browser, this import equals the global variable 'Desktop'
        globals: {
          '@wxcc-desktop/sdk': 'Desktop'
        }
      }
    }
  }
});

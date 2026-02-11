import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'ad_consult_speed_dials.js',
      name: 'ADSpeeddials',
      formats: ['iife'],
      // We remove fileName here to let rollup handle it via output
    },
    rollupOptions: {
      external: ['@wxcc-desktop/sdk'],
      output: {
        // This forces the output to be exactly 'ad-speeddials.js'
        entryFileNames: 'ad-speeddials.js',
        globals: {
          '@wxcc-desktop/sdk': 'Desktop'
        },
        extend: true
      }
    }
  }
});

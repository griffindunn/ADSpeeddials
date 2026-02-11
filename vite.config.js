import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      // The entry point is your file
      entry: 'ad_consult_speed_dials.js',
      // The global variable name (if loaded via script tag)
      name: 'ADSpeeddials',
      // The output filename in the dist folder
      fileName: 'ad-speeddials'
    },
    outDir: 'dist',
    rollupOptions: {
      // OPTIONAL: If the Webex environment provides the SDK globally 
      // at runtime, uncomment the 'external' section below to reduce file size.
      // If you aren't sure, leave it commented out to bundle the SDK into your file.
      
      // external: ['@wxcc-desktop/sdk'],
      // output: {
      //   globals: {
      //     '@wxcc-desktop/sdk': 'Desktop'
      //   }
      // }
    }
  }
});

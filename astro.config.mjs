import { defineConfig } from 'astro/config';
import swup from '@swup/astro';
import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  integrations: [
    preact(), 
    swup({
      globalInstance: true,
      animateHistoryBrowsing: true,
    }),
  ]
});
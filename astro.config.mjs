import { defineConfig } from 'astro/config';
// import swup from '@swup/astro';
import preact from "@astrojs/preact";
// import Swup from 'swup';

// https://astro.build/config
export default defineConfig({
  integrations: [
    preact(), 
    // swup({
    //   globalInstance: true,
    //   animateHistoryBrowsing: true,
    //   native: true,
    //   skipPopStateHandling: (event) => event.state?.source !== 'swup'
    // }),
  ]
});
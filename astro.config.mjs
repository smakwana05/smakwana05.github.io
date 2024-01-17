import { defineConfig } from 'astro/config';
// import swup from '@swup/astro';
import preact from "@astrojs/preact";
// import Swup from 'swup';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: 'https://smakwana05.github.io',
  // base: '/Astro',

  integrations: [
    // preact()
  // swup({
  //   globalInstance: true,
  //   animateHistoryBrowsing: true,
  //   native: true,
  //   skipPopStateHandling: (event) => event.state?.source !== 'swup'
  // }),
  // , react()
]
});
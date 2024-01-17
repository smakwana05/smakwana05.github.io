import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://smakwana05.github.io',
  base: '',

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
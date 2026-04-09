import { defineConfig } from 'astro/config';

// https://astro.build/config
// User site deployed at https://kugaku.github.io/
export default defineConfig({
  site: 'https://kugaku.github.io',
  base: '/',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
});

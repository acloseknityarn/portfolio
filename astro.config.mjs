import { defineConfig } from "astro/config";
import node from "@astrojs/node";

import vercelStatic from "@astrojs/vercel/static";

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  output: "static",
  adapter: vercelStatic({
    imageService: true,
    devImageService: 'sharp',
    imagesConfig: {
      domains: [],
      sizes: [360, 480, 768, 1080, 1920], 
      formats: ['image/avif', 'image/webp'],
      // TODO: set this later
      // minimumCacheTTL: 5 * 60
    }
  }),
});

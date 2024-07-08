import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import { transformerNotationHighlight } from '@shikijs/transformers'

import vercelStatic from "@astrojs/vercel/static";

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://shiki.style/themes
      theme: 'dracula',
      // Alternatively, provide multiple themes
      // See note below for using dual light/dark themes
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      // Add custom languages
      // Note: Shiki has countless langs built-in, including .astro!
      // https://shiki.style/languages
      langs: [],
      // Enable word wrap to prevent horizontal scrolling
      wrap: true,
      // Add custom transformers: https://shiki.style/guide/transformers
      // Find common transformers: https://shiki.style/packages/transformers
      transformers: [
        transformerNotationHighlight()
      ],
    }
  },
  devToolbar: {
    enabled: false,
  },
  output: "static",
  adapter: vercelStatic({
    imageService: true,
    devImageService: "sharp",
    imagesConfig: {
      domains: [],
      sizes: [360, 480, 768, 1080, 1920],
      formats: ["image/avif", "image/webp"],
      // TODO: set this later
      // minimumCacheTTL: 5 * 60
    },
  }),
});

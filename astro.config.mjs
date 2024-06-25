import { defineConfig } from "astro/config";
import node from "@astrojs/node";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  // NOTE: uncomment this to test build locally, and comment the vercel adapter
  // output: "server",
  // adapter: node({
  //   mode: "standalone",
  // }),

  // NOTE: to run the local server (pnpm dev) & local build (pnpm build) comment this
  output: "server",
  adapter: vercel(),
});

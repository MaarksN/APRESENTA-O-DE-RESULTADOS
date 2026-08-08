import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve("index.html"),
        atlasgr: resolve("AtlasGR.html"),
        totalTrac: resolve("Total Trac.html"),
      },
    },
  },
});

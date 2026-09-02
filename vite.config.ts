import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/summer-2026-game/",

  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, "index.html"),
        game: resolve(import.meta.dirname, "game/index.html"),
        docs: resolve(import.meta.dirname, "docs/index.html"),
      },
    },
  },
});

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
        docsEnvironment: resolve(
          import.meta.dirname,
          "docs/environment/index.html",
        ),
        docsProject: resolve(import.meta.dirname, "docs/project/index.html"),
        docsWeb: resolve(import.meta.dirname, "docs/web/index.html"),
        docsP5js: resolve(import.meta.dirname, "docs/p5js/index.html"),
        docsSampleGame: resolve(
          import.meta.dirname,
          "docs/sample-game/index.html",
        ),
        docsGit: resolve(import.meta.dirname, "docs/git/index.html"),
        docsDeploy: resolve(import.meta.dirname, "docs/deploy/index.html"),
        docsAdvanced: resolve(import.meta.dirname, "docs/advanced/index.html"),
      },
    },
  },
});

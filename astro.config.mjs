import { defineConfig } from "astro/config";
import { astroImageTools } from "astro-imagetools";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  base: '/',
  assetsInclude: ['**/*.mp4', '**/*.webm'],
  integrations: [astroImageTools, svelte(), mdx()]
});

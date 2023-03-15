import { defineConfig } from "astro/config";
import image from "@astrojs/image";
import { astroImageTools } from "astro-imagetools";

import svelte from "@astrojs/svelte";

// https://astro.build/config
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [image({
    serviceEntryPoint: '@astrojs/image/sharp',
  }), astroImageTools, svelte(), mdx()]
});

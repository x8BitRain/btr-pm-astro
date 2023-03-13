import { defineConfig } from "astro/config";

import image from "@astrojs/image";
import { astroImageTools } from "astro-imagetools";

// https://astro.build/config
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [image({
    serviceEntryPoint: '@astrojs/image/sharp'
  }), astroImageTools, svelte()]
});
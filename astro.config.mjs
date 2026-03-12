import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: "http://localhost:7080",
  integrations: [mdx()],
  output: "static"
});

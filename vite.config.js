import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  // Only reviewed assets are published; original source documents stay local.
  publicDir: "public/site",
  plugins: [react()],
});

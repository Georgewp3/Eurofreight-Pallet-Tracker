import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// IMPORTANT: set base to your repo name for GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: "/pallet-tracking/",
});

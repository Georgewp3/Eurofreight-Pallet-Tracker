import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// change base to your repo name (e.g., /pallet-tracking/)
export default defineConfig({
  plugins: [react()],
  base: "/pallet-tracking/",
});

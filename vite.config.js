import { defineConfig } from "vite";

// Detect repository name from environment override or default to root
const repo = process.env.GH_PAGES_BASE || "";

export default defineConfig({
  base: repo || "/",
  server: {
    host: true, // Listen on all addresses including LAN
    port: 5173,
    strictPort: false,
    allowedHosts: [".ngrok.io", ".ngrok-free.app", ".ngrok.app"],
  },
});

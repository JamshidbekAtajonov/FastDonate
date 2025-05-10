import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
// vite.config.js
export default {
  plugins: [react()],
  server: {
    proxy: {
      "/auth": {
        target: "https://api.fastdonate.su",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/auth/, "/auth"),
      },
    },
  },
};

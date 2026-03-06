import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const normalizeApiUrl = (url = "") =>
    url.replace("houseerent-lc52.onrender.com", "houserent-lc52.onrender.com");

  const proxyTarget = normalizeApiUrl(env.VITE_API_URL || "https://houserent-lc52.onrender.com");

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        "/api": {
          target: proxyTarget,
          changeOrigin: true,
          secure: true,
        },
        "/uploads": {
          target: proxyTarget,
          changeOrigin: true,
          secure: true,
        },
      },
    },
  };
})

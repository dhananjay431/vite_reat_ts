import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/nse": "http://localhost:3000/",
      "/com.eibus.web.soap.Gateway.wcp": {
        target: "https://adnatedev.ddns.net:8443/home/AdnateDev/",
        secure: false,

        changeOrigin: false,
      },
      "/com.eibus.sso.web.authentication.PreLoginInfo.wcp?": {
        target: "https://adnatedev.ddns.net:8443/home/AdnateDev/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/cordys/": {
        target: "https://adnatedev.ddns.net:8443",
        secure: false,

        changeOrigin: false,
      },
    },
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@store": path.resolve(__dirname, "./src/stores"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@modules": path.resolve(__dirname, "./src/modules"),
      "@constants": path.resolve(__dirname, "./src/constants"),
      "@routes": path.resolve(__dirname, "./src/routes"),
    },
  },
});

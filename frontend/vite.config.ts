/// <reference types="vitest">
import vue from "@vitejs/plugin-vue";
import fs from "fs";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  test: {
    globals: true,
  },
  plugins: [vue()],
  server: {
    https: {
      key: fs.readFileSync("./certificates/localhost.key"), // Chave privada
      cert: fs.readFileSync("./certificates/localhost.crt"), // Certificado público
    },
    host: "localhost",
    port: 5173, // Porta padrão ou escolha outra
  },
});

/// <reference types="vitest">
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  test: {
    globals: true
  },
  plugins: [vue()],
});

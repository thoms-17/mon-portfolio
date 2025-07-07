import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    plugins: [tailwindcss(), react()],
    base: command === "serve" ? "/" : "/mon-portfolio/",
  };
});

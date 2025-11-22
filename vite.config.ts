import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
    // Your site loads from root domain, so keep this:
    base: "/",

    server: {
      host: "::",
      port: 8080,
    },

    plugins: [
      react(),
    ],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    build: {
      outDir: "dist",
      sourcemap: isDev,
    },
  };
});

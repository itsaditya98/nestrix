import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
    server: {
      host: "::",       // Allow access from network (IPv6 + IPv4)
      port: 8080,       // Dev server port
    },
    plugins: [
      react(),          // React + SWC plugin for fast refresh
      isDev && componentTagger(), // Enable component tagging only in dev
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"), // Shortcut for imports
      },
    },
    build: {
      outDir: "dist",   // Default build output directory
      sourcemap: isDev, // Enable source maps in dev mode
    },
  };
});

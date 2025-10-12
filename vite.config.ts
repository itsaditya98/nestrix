import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
    base: "/", // ✅ Important for custom domain deployment (nestrix.synergize.co)
    server: {
      host: "::",       // Allow external access (IPv6 + IPv4)
      port: 8080,       // Local dev server port
    },
    plugins: [
      react(),          // React + SWC plugin
      isDev && componentTagger(), // Only active in dev
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      outDir: "dist",   // Output directory
      sourcemap: isDev, // Source maps only in dev
    },
  };
});

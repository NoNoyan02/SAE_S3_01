import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            assets: path.resolve(__dirname, "src/assets")
        },
    },
    server: {
        host: "0.0.0.0",
        port: 3000,
        open: true,

        // pour le back-end
        // proxy: {
        //     '/api': {
        //         target: 'http://localhost:8000', // L'adresse de ton backend
        //         changeOrigin: true,
        //         rewrite: (path) => path.replace(/^\/api/, ''),
        //     },
        // },
    },
    build: {
        outDir: 'dist',
        sourcemap: false,
    }
});
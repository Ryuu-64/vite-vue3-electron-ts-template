import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
    root: "./src/vue",
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    build: {
        rollupOptions: {
            input: './src/vue/index.html'
        },
        outDir: path.resolve(__dirname, 'dist')
    },
    server: {
        hmr: {
            overlay: false
        }
    },
    base: './'
});

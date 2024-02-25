import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import {VitePWA} from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), VitePWA({
        includeAssets: [
            'favicon.ico',
            'favicon.svg',
            "pwa-64x64.png",
            "pwa-192x192.png",
            "pwa-512x512.png",
            "apple-touch-icon-180x180.png",
            "maskable-icon-512x512.png",
        ],
        manifest: {
            name: 'Blame',
            short_name: 'Blame',
            description: 'A simple stopwatch app',
            theme_color: '#165F73',
            icons: [
                {
                    "src": "pwa-64x64.png",
                    "sizes": "64x64",
                    "type": "image/png"
                },
                {
                    "src": "pwa-192x192.png",
                    "sizes": "192x192",
                    "type": "image/png"
                },
                {
                    "src": "pwa-512x512.png",
                    "sizes": "512x512",
                    "type": "image/png"
                },
                {
                    "src": "maskable-icon-512x512.png",
                    "sizes": "512x512",
                    "type": "image/png",
                    "purpose": "maskable"
                }
            ]

        },
        registerType: 'autoUpdate'
    })],
})

import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "TDC Quran - Digital Quran Platform",
        short_name: "TDC Quran",
        description: "Read, learn, and connect with the Holy Quran on TDC's digital platform",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        orientation: "portrait-primary",
        categories: ["education", "books", "religious", "quran"],
        dir: "rtl",
        shortcuts: [
            {
                name: "Read Quran",
                url: "/surah/1",
                description: "Start reading the Holy Quran"
            },
            {
                name: "Take Quiz",
                url: "/quiz",
                description: "Test your Quranic knowledge"
            },
            {
                name: "View Profile",
                url: "/profile",
                description: "View your reading progress"
            }
        ],
        icons: [
            {
                src: "/logos/logo.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any"
            },
            {
                src: "/apple-icon.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "maskable"
            },
            {
                src: "/favicon.ico",
                sizes: "64x64",
                type: "image/x-icon"
            }
        ],
        screenshots: [
            {
                src: "/images/og-image.jpg",
                sizes: "1200x630",
                type: "image/jpeg"
            }
        ],
        id: "tdc-quran-app",
        scope: "/",
        lang: "en",
        prefer_related_applications: false,
        display_override: ["standalone"]
    }
}
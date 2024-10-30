import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL

    if (!baseUrl) {
        console.warn('NEXT_PUBLIC_APP_URL is not set')
    }

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/*',
                    '/private/*',
                    '/*?*', // Disallow URLs with query parameters
                ]
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
                disallow: ['/api/*', '/private/*'],
            }
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    }
}
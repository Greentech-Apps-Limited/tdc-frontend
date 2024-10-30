import { MetadataRoute } from 'next'
import { SURAH_EN } from '@/data/quran-meta/surahs/en'
import { JUZS } from '@/data/quran-meta/juzs'
import { PAGES } from '@/data/quran-meta/pages'
import { HIZBS } from '@/data/quran-meta/hizbs'
import { RUKUS } from '@/data/quran-meta/rukus'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL

    if (!baseUrl) {
        console.warn('NEXT_PUBLIC_APP_URL is not set')
        return []
    }

    const locales = ['en', 'ms', 'id']
    const urls: MetadataRoute.Sitemap = []

    const staticRoutes = [
        { path: '', priority: 1.0 },
        { path: 'quiz', priority: 0.8 },
        { path: 'profile', priority: 0.8 },
        { path: 'quiz/leaderboard', priority: 0.7 },
        { path: 'quiz/play-mode', priority: 0.6 },
    ]

    const quranSegments = [
        { data: SURAH_EN, type: 'surah', priority: 0.9 },
        { data: JUZS, type: 'juz', priority: 0.8 },
        { data: PAGES, type: 'page', priority: 0.7 },
        { data: HIZBS, type: 'hizb', priority: 0.7 },
        { data: RUKUS, type: 'ruku', priority: 0.7 },
    ]

    for (const locale of locales) {
        staticRoutes.forEach(({ path, priority }) => {
            urls.push({
                url: `${baseUrl}/${locale}${path ? `/${path}` : ''}`,
                lastModified: new Date(),
                changeFrequency: 'daily',
                priority,
            })
        })

        quranSegments.forEach(({ data, type, priority }) => {
            data.forEach((item) => {
                urls.push({
                    url: `${baseUrl}/${locale}/${type}/${item.id}`,
                    lastModified: new Date(),
                    changeFrequency: 'monthly',
                    priority,
                })
            })
        })
    }

    return urls
}
import { MetadataRoute } from 'next'
import { SURAH_EN } from '@/data/quran-meta/surahs/en'
import { JUZS } from '@/data/quran-meta/juzs'
import { PAGES } from '@/data/quran-meta/pages'
import { HIZBS } from '@/data/quran-meta/hizbs'
import { RUKUS } from '@/data/quran-meta/rukus'

type StaticRoute = {
    path: string
    priority: number
}

type QuranSegment = {
    data: Array<{ id: number | string }>
    type: 'surah' | 'juz' | 'page' | 'hizb' | 'ruku'
    priority: number
}

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL
    if (!baseUrl) {
        console.warn('NEXT_PUBLIC_APP_URL is not set')
        return []
    }

    const locales = ['en', 'ms', 'id']

    const staticRoutes: StaticRoute[] = [
        { path: '', priority: 1.0 },
        { path: 'quiz', priority: 0.8 },
        { path: 'profile', priority: 0.8 },
        { path: 'quiz/leaderboard', priority: 0.7 },
        { path: 'quiz/play-mode', priority: 0.6 },
    ]

    const quranSegments: QuranSegment[] = [
        { data: SURAH_EN, type: 'surah', priority: 0.9 },
        { data: JUZS, type: 'juz', priority: 0.8 },
        { data: PAGES, type: 'page', priority: 0.7 },
        { data: HIZBS, type: 'hizb', priority: 0.7 },
        { data: RUKUS, type: 'ruku', priority: 0.7 },
    ]

    const urls: MetadataRoute.Sitemap = []

    // Generate URLs for static routes in all locales
    urls.push(
        ...locales.flatMap(locale =>
            staticRoutes.map(({ path, priority }) => ({
                url: `${baseUrl}/${locale}${path ? `/${path}` : ''}`,
                lastModified: new Date().toISOString(),
                changeFrequency: 'daily' as const,
                priority,
            }))
        )
    )

    // Generate URLs for Quran segments in all locales
    urls.push(
        ...locales.flatMap(locale =>
            quranSegments.flatMap(({ data, type, priority }) =>
                data.map(item => ({
                    url: `${baseUrl}/${locale}/${type}/${item.id}`,
                    lastModified: new Date().toISOString(),
                    changeFrequency: 'monthly' as const,
                    priority,
                }))
            )
        )
    )

    return urls
}
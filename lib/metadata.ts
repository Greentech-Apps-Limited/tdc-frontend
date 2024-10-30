import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

const siteConfig = {
    siteName: 'TDC Quran',
    description: 'Digital Quran platform by TDC Holdings - Read, Learn, and Connect with the Holy Quran',
    url: process.env.NEXT_PUBLIC_APP_URL || '',
    logoPath: '/logos/logo.png',
    ogImagePath: '/images/og-image.jpg'
}


const constructMetadata = ({
    title,
    description,
    url,
    locale = 'en',
    ogImage,
}: {
    title?: string
    description?: string
    url?: string
    locale?: string
    ogImage?: string
}) => {
    const metadataTitle = title ? `${title} | ${siteConfig.siteName}` : siteConfig.siteName

    const ogImageUrl = ogImage
        ? `${siteConfig.url}${ogImage}`
        : `${siteConfig.url}${siteConfig.ogImagePath}`

    return {
        metadataBase: new URL(siteConfig.url),
        title: metadataTitle,
        description: description || siteConfig.description,
        icons: {
            icon: '/favicon.ico',
            apple: '/apple-icon.png'
        },
        manifest: `${siteConfig.url}/manifest.json`,
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        openGraph: {
            title: metadataTitle,
            description: description || siteConfig.description,
            url: url || siteConfig.url,
            siteName: siteConfig.siteName,
            locale: locale,
            type: 'website',
            images: [
                {
                    url: ogImageUrl,
                    width: 1200,
                    height: 630,
                    alt: `${siteConfig.siteName} - ${title || 'Digital Quran Platform'}`,
                    type: 'image/jpeg',
                },
                {
                    url: `${siteConfig.url}${siteConfig.logoPath}`,
                    width: 500,
                    height: 500,
                    alt: `${siteConfig.siteName} Logo`,
                    type: 'image/png',
                }
            ]
        },
        twitter: {
            card: 'summary_large_image',
            title: metadataTitle,
            description: description || siteConfig.description,
            images: [{
                url: ogImageUrl,
                width: 1200,
                height: 630,
                alt: `${siteConfig.siteName} - ${title || 'Digital Quran Platform'}`,
                type: 'image/jpeg',
            }],
        },
        alternates: {
            canonical: url || siteConfig.url,
            languages: {
                'en': `${siteConfig.url}/en`,
                'ms': `${siteConfig.url}/ms`,
                'id': `${siteConfig.url}/id`,
            }
        },
        verification: {
            google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
        },
    } as Metadata
}

// Generate dynamic metadata for surah/page/juz pages
export async function generateQuranSegmentMetadata({
    params,
    segment,
    segmentId,
}: {
    params: { locale: string }
    segment: string
    segmentId: string
}) {
    const t = await getTranslations({ locale: params.locale, namespace: 'QuranMeta' })

    let title = ''
    let description = ''

    switch (segment) {
        case 'surah':
            title = t('surahTitle', { surahId: segmentId })
            description = t('surahDescription', { surahId: segmentId })
            break
        case 'juz':
            title = t('juzTitle', { juzId: segmentId })
            description = t('juzDescription', { juzId: segmentId })
            break
        case 'page':
            title = t('pageTitle', { pageId: segmentId })
            description = t('pageDescription', { pageId: segmentId })
            break
        case 'hizb':
            title = t('hizbTitle', { hizbId: segmentId })
            description = t('hizbDescription', { hizbId: segmentId })
            break
        case 'ruku':
            title = t('rukuTitle', { rukuId: segmentId })
            description = t('rukuDescription', { rukuId: segmentId })
            break
    }

    return constructMetadata({
        title,
        description,
        url: `${siteConfig.url}/${params.locale}/${segment}/${segmentId}`,
        locale: params.locale
    })
}

export const getStaticMetadata = async (
    page: 'home' | 'profile' | 'quiz' | 'leaderboard',
    locale: string
) => {
    const t = await getTranslations({ locale, namespace: 'Metadata' })

    const metadata: Record<string, { title: string; description: string }> = {
        home: {
            title: t('homeTitle'),
            description: t('homeDescription')
        },
        profile: {
            title: t('profileTitle'),
            description: t('profileDescription')
        },
        quiz: {
            title: t('quizTitle'),
            description: t('quizDescription')
        },
        leaderboard: {
            title: t('leaderboardTitle'),
            description: t('leaderboardDescription')
        }
    }

    return constructMetadata({
        title: metadata[page]?.title,
        description: metadata[page]?.description,
        url: `${siteConfig.url}/${locale}/${page === 'home' ? '' : page}`,
        locale
    })
}

export default constructMetadata
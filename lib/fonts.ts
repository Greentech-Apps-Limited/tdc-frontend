import { Amiri, Lateef, Source_Sans_3 } from 'next/font/google';
import localFont from 'next/font/local'

export const source_sans_3 = Source_Sans_3({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-source_sans_3',
});

export const lateef = Lateef({
    subsets: ['arabic', 'latin'],
    display: 'swap',
    weight: ['200', '300', '400', '500', '600', '700', '800'],
    variable: '--font-lateef',
});

export const amiri = Amiri({
    subsets: ['arabic', 'latin'],
    display: 'swap',
    weight: ['400', '700'],
    variable: '--font-amiri',
});

export const hidayatullahFont = localFont({
    src: "../public/fonts/Hidayatullah/hidayatullah_DEMO.ttf",
    display: 'swap',
    variable: '--font-hidayatullah-demo',
})

export const qalam = localFont({
    src: '../public/fonts/Al-Qalam/qalam.ttf',
    display: 'swap',
    variable: '--font-qalam',
})

export const me_quran = localFont({
    src: '../public/fonts/me_quran/me_quran.ttf',
    display: 'swap',
    variable: '--font-meQuran',
})

export const kfgqpc_hafs = localFont({
    src: '../public/fonts/KFGQPC/KFGQPC_HAFS.otf',
    display: 'swap',
    variable: '--font-kfgqpc_hafs',
})

export const kitab = localFont({
    src: '../public/fonts/Kitab/Kitab-Regular.ttf',
    display: 'swap',
    variable: '--font-kitab',
})
import { Source_Sans_3 } from 'next/font/google';
import localFont from 'next/font/local'

export const source_sans_3 = Source_Sans_3({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-source_sans_3',
});

export const hidayatullahFont = localFont({
    src: "../public/fonts/Hidayatullah/hidayatullah_DEMO.ttf",
    display: 'swap',
    variable: '--font-hidayatullah-demo',
})
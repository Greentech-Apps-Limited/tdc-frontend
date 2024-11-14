import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from './lib/auth/auth';

const PROTECTED_ROUTES = [
    '/quiz/play-mode',
    '/quiz/results',
    '/quiz/settings',
];

function isProtectedRoute(pathname: string): boolean {
    // Remove language prefix if it exists (e.g., /en/, /bn/)
    const pathWithoutLang = pathname.replace(/^\/[a-z]{2}\//, '/');

    return PROTECTED_ROUTES.some(route => pathWithoutLang.startsWith(route));
}

export default async function middleware(req: NextRequest) {
    const intlMiddleware = createMiddleware(routing);

    if (isProtectedRoute(req.nextUrl.pathname)) {
        const session = await auth();
        const isAuthenticated = !!session?.user;

        if (!isAuthenticated) {
            const currentLang = req.nextUrl.pathname.match(/^\/([a-z]{2})\//)?.[1] || 'en';
            return NextResponse.redirect(new URL(`/${currentLang}/signin`, req.url));
        }
    }

    return intlMiddleware(req);
}


export const config = {
    matcher: '/((?!api|static|.*\\..*|_next).*)',
};
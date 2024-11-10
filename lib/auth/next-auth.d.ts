import type { DefaultUser } from 'next-auth'

declare module "next-auth" {
    interface Session {
        accessToken?: string;
        refreshToken?: string;
        error?: string;
        user?: {
            pk: number;
            email: string;
            first_name: string | null;
            last_name: string | null;
            accessToken?: string;
            refreshToken?: string;
        };
    }

    interface User extends DefaultUser {
        pk: number;
        email: string;
        first_name: string | null;
        last_name: string | null;
        accessToken?: string;
        refreshToken?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT extends Record<string, unknown> {
        accessToken?: string;
        refreshToken?: string;
        accessTokenExpires?: number;
        user?: {
            pk: number;
            email: string;
            first_name: string | null;
            last_name: string | null;
        };
        error?: string;
    }
}

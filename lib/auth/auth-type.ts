

export interface UserType {
    pk: number
    email: string
    first_name: string | null
    last_name: string | null
}

export interface AuthTokens {
    access: string
    refresh: string
}

export interface AuthResponse {
    access: string
    refresh: string
    user: UserType
}


export const protectedRoutes = [
    '/dashboard',
    '/profile',
    '/settings',
    // Add more protected routes here
] as const

export const authRoutes = [
    '/login',
    '/register',
    '/forgot-password',
] as const

export const publicRoutes = [
    '/',
    '/about',
    '/contact',
    // Add more public routes here
] as const

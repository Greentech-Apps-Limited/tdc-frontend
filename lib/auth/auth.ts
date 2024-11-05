import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { AuthResponse } from "./auth-type";
import { jwtDecode } from "jwt-decode";
import { type AdapterUser } from "next-auth/adapters"

type Token = {
    refreshToken?: string
}
type RefreshedToken = Token & {
    accessToken?: string;
    refreshToken?: string;
    error?: string;
};

type CustomUser = AdapterUser & {
    pk: number;
    email: string;
    first_name: string | null;
    last_name: string | null;
    accessToken?: string;
    refreshToken?: string;
};


async function refreshAccessToken(token: Token): Promise<RefreshedToken> {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/token/refresh/`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refresh: token.refreshToken }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw data;
        }

        return {
            ...token,
            accessToken: data.access,
            refreshToken: data.refresh ?? token.refreshToken,
            error: undefined,
        };
    } catch (error) {
        console.error("Error refreshing access token:", error);
        return { ...token, error: "RefreshAccessTokenError" };
    }
}


export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
                ssoUser: { type: "hidden" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;
                try {
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login/`,
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                email: credentials.email,
                                password: credentials.password,
                            }),
                        }
                    );

                    if (!response.ok) return null;

                    const data: AuthResponse = await response.json();
                    return {
                        ...data.user,
                        accessToken: data.access,
                        refreshToken: data.refresh,
                    };
                } catch (error) {
                    console.log(`Login error: ${error}`);
                    return null;
                }
            }
        }),
    ],
    callbacks: {
        jwt: async ({ token, account, user }) => {
            if (account && user) {
                const decodedToken = jwtDecode<{ exp: number }>(user.accessToken as string);
                return {
                    ...token,
                    accessToken: user.accessToken,
                    refreshToken: user.refreshToken,
                    user,
                    accessTokenExpires: decodedToken.exp * 1000, // Ensure exp is in milliseconds
                };
            }

            if (Date.now() < (token.accessTokenExpires as number ?? 0)) {
                return token;
            }
            const refreshedToken = await refreshAccessToken(token as Token);

            if (refreshedToken.error) {
                await signOut();
            }

            return refreshedToken;
        },
        // Define type for session callback
        session: async ({ session, token }) => {
            if (token) {
                session.accessToken = token.accessToken as string;
                session.user = token.user as CustomUser;
            }
            return session;
        },
    },

    events: {
        async signOut() {
            // Clear any stored tokens or session data
            console.log("User signed out");
        },
    },
    pages: {
        signIn: "/signin",
    },
});
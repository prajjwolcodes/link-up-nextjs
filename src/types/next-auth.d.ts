import { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface User {
        id?: string,
        username?: string,
        email?: string,
        displayName?: string,
        avatarUrl?: string,
        googleId?: string,

    }

    interface Session {
        user: {
            id?: string,
            username?: string,
            email?: string,
            displayName?: string,
            avatarUrl?: string,
            googleId?: string,
        } & DefaultSession['user']

    }
}
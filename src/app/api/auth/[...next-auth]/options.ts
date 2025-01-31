//For the implementation of other providers:
// Google:

// GoogleProvider({
//     clientId: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET
//   })

// get the clientId and client Secret from google cloud console.
// 1. Open the project
// 2. Go to api and services -- Oauth consent screen -- fill all the details -- save
// 3. Come back to credentials.
// 4. Create Oauth clientId -- leave all as it is and add Authorized redirect URIs as "http://localhost:3000/api/auth/callback/google"
// 5. Call the signIn("google") function in client side (no await needed).


import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "prajjwol@gmail.com" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials: Record<"email" | "password", string> | undefined): Promise<{ id: string; email: string; username: string; displayName: string; avatarUrl: string; googleId: string } | null> {
                if (!credentials) {
                    throw new Error("Credentials are missing");
                }
                try {
                    const user = await db.user.findUnique({ where: { email: credentials.email } })
                    if (!user)
                        throw new Error("User doesnot exist with this email")

                    const isPasswordCorrect = bcrypt.compareSync(credentials.password, user.password)
                    if (!isPasswordCorrect)
                        throw new Error("Incorrect Password")
                    else
                        return {
                            id: user.id,
                            email: user.email || '',
                            username: user.username,
                            displayName: user.displayName,
                            avatarUrl: user.avatarUrl || '',
                            googleId: user.googleId || ''
                        }

                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
                    console.log(errorMessage);
                    throw new Error(errorMessage)
                }


            }
        })

    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.username = user.username
                token.email = user.email
                token.displayName = user.displayName
                token.avatarUrl = user.avatarUrl
                token.googleId = user.googleId

            }

            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string
                session.user.username = token.username as string
                session.user.email = token.email as string
                session.user.displayName = token.displayName as string
                session.user.avatarUrl = token.avatarUrl as string
                session.user.googleId = token.googleId as string
            }

            return session
        },
    },
    pages: {
        signIn: "/signin",
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXT_AUTH_SECRET_KEY
}

export const validateRequest = async (): Promise<
    { user: unknown; session: unknown } | { user: null; session: null }
> => {
    // Use `getServerSession` to retrieve the session on the server side
    const session = await getServerSession(authOptions);

    if (!session) {
        return {
            user: null,
            session: null,
        };
    }

    return {
        user: session.user,
        session: session,
    };
};
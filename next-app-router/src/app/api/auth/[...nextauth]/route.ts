
import { login } from "@/app/lib/firebase/service";
import { compare } from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    secret: "123456",
    providers: [
        CredentialsProvider({
            type: "credentials",
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };
                const user: any = await login({ email });
                if (user) {
                    const isPasswordValid = await compare(password, user.password);
                    if (isPasswordValid) {
                        return user;
                    }
                    return null;
                }
                else {
                    return null;
                }

            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }: any) {
            if (account?.provider === "credentials" && user) {
                token.email = user.email;
                token.fullname = user.fullname; // ✅ sekarang ada
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }: any) {
            if ("email" in token) {
                session.user.email = token.email;
            }
            if ("role" in token) {
                session.user.role = token.role;
            }
            if ("fullname" in token) {
                session.user.fullname = token.fullname;
            }
            return session;
        },
    },
    pages: {
        signIn: '/login',
        signOut: '/login',
    },
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
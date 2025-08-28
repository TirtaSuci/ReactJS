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

                const user: any = {
                    id: "1",
                    name: "Admin",
                    email: "123@gmail.com",
                    role: "admin",
                    fullname: "Administrator" // ✅ tambahkan biar konsisten
                };

                if (email === "123@gmail.com" && password === "123456") {
                    return user;
                } else {
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
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
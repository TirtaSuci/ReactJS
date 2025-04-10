import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                username: { label: "username", type: "text" },
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { username, email, password } = credentials as {
                    username: string;
                    email: string;
                    password: string;
                };
                const user = {
                    id: "1",
                    name: username,
                    email: email,
                    password: password,
                };
                if (user) {
                    return user;
                } else {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        jwt({ token, user, account, profile }) {
            if (account?.provider == "credentials") {
                token.email = user.email;
            }
            return token;
        },

        async session({ session, token }) {
            session.user = token;
            return session;
        },
    },
};

export default NextAuth(authOptions);

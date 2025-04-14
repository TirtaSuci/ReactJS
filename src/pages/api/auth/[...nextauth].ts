import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { NextAuthOptions } from "next-auth";
import { signIn, signInWithGoogle } from "@/lib/firebase/service";
import { compare } from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";

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
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };
                const user: any = await signIn({ email });
                if (user) {
                    const passwordConfirmed = await compare(password, user.password);
                    if (passwordConfirmed) {
                        return user;
                    }
                    return null;
                } else {
                    return null;
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }: any) {
            if (account?.provider === "credentials") {
                token.email = user.email;
                token.username = user.username;
                token.role = user.role;
            }
            if (account?.provider === "google") {
                const data = {
                    email: user.email,
                    username: user.name,
                    image: user.image,
                    role: "member",
                    type: "google",
                };

                await signInWithGoogle(
                    data,
                    (result: { status: boolean; mesaage: string; data: any }) => {
                        if (result.status) {
                            token.email = result.data.email;
                            token.username = result.data.username;
                            token.image = result.data.image;
                            token.role = result.data.role;
                            token.type = result.data.type;
                        }
                    }
                );
            }
            return token;
        },

        async session({ session, token }: any) {
            if ("email" in token) session.user.email = token.email;
            if ("username" in token) session.user.username = token.username;
            if ("image" in token) session.user.image = token.image;
            if ("role" in token) session.user.role = token.role;
            return session;
        },
    },
    pages: {
        signIn: "/auth/login",
    },
};

export default NextAuth(authOptions);

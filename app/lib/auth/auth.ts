import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import {prismaDb} from "@/app/lib/prisma"

import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
    trustHost: true,
    adapter: PrismaAdapter(prismaDb),
    session: { strategy: "jwt" },
    pages: {
        signIn: "/login",
        signOut: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        Credentials({
            async authorize(credentials) {
                if (!credentials || !credentials.email || !credentials.password) {
                    return null;
                }

                const email = credentials.email as string;
                const user = await prismaDb.user.findUnique({
                    where: {
                        email,
                    },
                });

                if (!user || !user.hashedPassword) {
                    throw new Error("invalid user");
                }

                const isMatch = bcrypt.compareSync(
                    credentials.password as string,
                    user.hashedPassword
                );

                if (!isMatch) {
                    return new Error("incorrect password.");
                }

                return user
            }
        })
    ],
})
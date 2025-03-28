import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { DrizzleAdapter } from "@auth/drizzle-adapter"

import { eq } from "drizzle-orm"
import {accounts, sessions, users, verificationTokens} from "@/app/drizzle/schema"
import {db} from "@/app/drizzle/client"; // Assicurati di esportare la tabella users dal tuo schema

export const { handlers, signIn, signOut, auth } = NextAuth({
    trustHost: true,
    adapter: DrizzleAdapter(db, {
        usersTable: users,
        accountsTable: accounts,
        sessionsTable: sessions,
        verificationTokensTable: verificationTokens,
    }),
    session: { strategy: "jwt" },
    pages: {
        signIn: "/login",
        signOut: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        Credentials({
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    return null
                }

                const email = credentials.email as string

                // Query con Drizzle
                const userResult = await db
                    .select()
                    .from(users)
                    .where(eq(users.email, email))
                    .limit(1)

                const user = userResult[0];

                if (!user || !user.hashedPassword) {
                    throw new Error("Invalid credentials")
                }

                const isMatch = bcrypt.compareSync(
                    credentials.password as string,
                    user.hashedPassword
                )

                if (!isMatch) {
                    throw new Error("Incorrect password")
                }

                return user
            }
        })
    ],
})
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/database/schema"
import { eq } from "drizzle-orm"
import { users } from "@/database/schema" // Assicurati di esportare la tabella users dal tuo schema

export const { handlers, signIn, signOut, auth } = NextAuth({
    trustHost: true,
    adapter: DrizzleAdapter(db),
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

                const user = userResult[0]

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
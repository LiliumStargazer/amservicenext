'use server'
import { auth } from "@/app/lib/auth/auth"

export default async function getSession() {
    return await auth();

}
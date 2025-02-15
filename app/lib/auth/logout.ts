'use server'
import { signOut } from "@/app/lib/auth/auth"

export default async function getLogout() {
    return await signOut();
}
"use client"
import { signOut } from "next-auth/react"

export function LogOutButton() {
    return <button className="btn btn-info mt-8" onClick={() => signOut()}>Sign Out</button>
}
'use server'

import bcrypt from "bcryptjs"

import { eq } from "drizzle-orm"
import { users } from "@/app/drizzle/schema"
import { db } from "@/app/drizzle/client"

export async function registerUser(prevState: string | undefined, formData: FormData) {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const role = formData.get('role') as string

    if (!name || !email || !password || !role) {
        return 'All fields are required'
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        await db.insert(users).values({
            name,
            email,
            hashedPassword,
            role
        })

        return 'User registered successfully!'
    } catch (error) {
        console.error('Error registering user:', error)
        return 'User registration failed'
    }
}

export async function updateUser(prevState: string | undefined, formData: FormData) {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const role = formData.get('role') as string

    if (!email) {
        return 'Email is required'
    }

    const updateData: Record<string, string> = {}

    if (name) updateData.name = name
    if (password) updateData.hashedPassword = await bcrypt.hash(password, 10)
    if (role) updateData.role = role

    try {
        await db.update(users)
            .set(updateData)
            .where(eq(users.email, email))

        return 'User updated successfully!'
    } catch (error) {
        console.error('Error updating user:', error)
        return 'User update failed'
    }
}

export async function deleteUser(prevState: string | undefined, formData: FormData) {
    const email = formData.get('email') as string

    if (!email) {
        return 'Email is required'
    }

    try {
        await db.delete(users)
            .where(eq(users.email, email))

        return 'User deleted successfully!'
    } catch (error) {
        console.error('Error deleting user:', error)
        return 'User deletion failed'
    }
}
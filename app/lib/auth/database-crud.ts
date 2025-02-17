'use server';

import { prismaDb } from "@/prisma/prisma";
import bcrypt from "bcryptjs";

export async function registerUser(prevState: string | undefined, formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const role = formData.get('role') as string;

    if (!name || !email || !password || !role) {
        return 'All fields are required';
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await prismaDb.user.create({
            data: {
                name,
                email,
                hashedPassword,
                role
            },
        });

        return 'User registered successfully!';

    } catch (error) {
        console.error('Error registering user:', error);
        return 'User registration failed';
    }
}

export async function updateUser(prevState: string | undefined, formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const role = formData.get('role') as string;

    if (!email) {
        return 'Email is required';
    }

    const updateData: { [key: string]: string } = {};

    if (name) updateData.name = name;
    if (password) updateData.hashedPassword = await bcrypt.hash(password, 10);
    if (role) updateData.role = role;

    console.log('updateData:', updateData);

    try {
        await prismaDb.user.update({
            where: { email },
            data: updateData,
        });

        return 'User updated successfully!';
    } catch (error) {
        console.error('Error updating user:', error);
        return 'User update failed';
    }
}

export async function deleteUser(prevStae: string | undefined, formData: FormData) {
    const email = formData.get('email') as string;

    if (!email) {
        return 'Email is required';
    }

    try {
        await prismaDb.user.delete({
            where: { email },
        });

        return 'User deleted successfully!';
    } catch (error) {
        console.error('Error deleting user:', error);
        return 'User deletion failed';
    }
}
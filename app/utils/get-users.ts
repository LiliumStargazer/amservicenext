import { prismaDb } from "@/prisma/prisma";

export async function getUsers() {
    try {
        return await prismaDb.user.findMany();
    } catch (error) {
        console.log('Error while getting backup backup-list from api-route:', error);
        return [];
    }
}
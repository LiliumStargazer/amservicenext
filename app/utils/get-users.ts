import { prismaDb } from "@/app/lib/prisma";

export async function getUsers() {
    return prismaDb.user.findMany();
}
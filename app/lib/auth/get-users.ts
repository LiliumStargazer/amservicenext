import { db } from "@/drizzle/schema"
import { users } from "@/drizzle/schema"; // Importa la tabella users dallo schema

export async function getUsers() {
    try {
        return await db.select().from(users);
    } catch (error) {
        console.error("Errore nel fetch degli utenti:", error);
        return null;
    }
}
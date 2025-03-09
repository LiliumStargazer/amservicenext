import { db } from "@/database/schema"
import { users } from "@/database/schema"; // Importa la tabella users dallo schema

export async function getUsers() {
    return db.select().from(users);
}
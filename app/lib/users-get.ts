'use server';

import { users } from "@/app/drizzle/schema";
import {db} from "@/app/drizzle/client";// connessione al database
export async function usersGet() {
    try {
        return await db.select().from(users).execute();
    } catch (error) {
        console.error("Errore nel fetch degli utenti:", error);
        throw error;
    }
}
// src/scripts/seed-admin.ts
import { eq } from "drizzle-orm";
import * as bcrypt from "bcryptjs";
import {db, users} from "@/drizzle/schema"; // Opzionale: se devi hashare la password

async function seedAdmin() {
    const adminEmail = "admin@amservice.it";
    const plainPassword  = process.env.DB_ADMIN_PASSWORD as string; // Password in chiaro dall'env

    // Hash della password (se necessario)
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // Cerca se l'admin esiste già
    const existingAdmin = await db
        .select()
        .from(users)
        .where(eq(users.email, adminEmail))
        .execute()
        .then((res) => res[0]);

    if (!existingAdmin) {
        await db.insert(users).values({
            email: adminEmail,
            hashedPassword: hashedPassword, // O usa plainPassword se già hashata
            role: "admin",
            name: "admin",
        });
        console.log("Admin user created");
        process.exit(0);
    } else {
        console.log("Admin user already exists");
        process.exit(1);
    }
}

seedAdmin().catch(console.error);
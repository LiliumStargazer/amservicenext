// drizzle/client.ts
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const client = postgres(process.env.AUTH_DRIZZLE_URL!);
export const db = drizzle(client);
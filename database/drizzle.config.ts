import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "postgresql",
    schema: "./database/schema.ts",
    out: "./database/drizzle",
    dbCredentials: {
        url: process.env.AUTH_DRIZZLE_URL!,
    },
});

import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "postgresql",
    schema: "./schema.ts",
    out: "./",
    dbCredentials: {
        url: process.env.AUTH_DRIZZLE_URL!,
    },
});

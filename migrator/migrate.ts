import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

// Usa la connection string da .env
const connectionString = process.env.AUTH_DRIZZLE_URL!

const runMigration = async () => {
    const migrationClient = postgres(connectionString, { max: 1 })
    const db = drizzle(migrationClient)

    await migrate(db, {
        migrationsFolder: './drizzle/migrations'
    })

    await migrationClient.end()
}

runMigration()
    .then(() => {
        console.log('Migration completed')
        process.exit(0)
    })
    .catch((err) => {
        console.error('Migration failed:', err)
        process.exit(1)
    })
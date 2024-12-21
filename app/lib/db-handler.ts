import Database from "better-sqlite3";

interface IntegrityCheckResult {
    integrity_check: string;
}

export async function integrityCheck(dbPath: string): Promise<void> {
    const db = new Database(dbPath);
    const result = db.prepare('PRAGMA integrity_check').get() as IntegrityCheckResult;
    console.log(result.integrity_check);
    if (result.integrity_check !== 'ok') {
        throw new Error(`Integrity check failed for database: ${dbPath}`);
    }
    db.close();
}
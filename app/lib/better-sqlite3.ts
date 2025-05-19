import Database from "better-sqlite3";


export async function executeQueryOnDb<T>(sqliteDbPath: string, query: string): Promise<T[]> {
    try {
        const db = new Database(sqliteDbPath);
        const result = db.prepare(query).all() as T[];
        db.close();
        return result;
    } catch (error) {
        throw error;
    }
}

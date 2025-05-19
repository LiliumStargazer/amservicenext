'use server'
import { NextResponse } from "next/server";
import {DatabasePath} from "@/app/class/DatabasePath";
import {executeQueryOnDb} from "@/app/lib/better-sqlite3";

export async function GET(req: Request): Promise<NextResponse> {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const serial = searchParams.get('serial');
    const backup = searchParams.get('backup');

    if (!serial || !backup) {
        return NextResponse.json({ error: 'Missing serial or backup parameter' }, { status: 400 });
    }
    const databasePath = new DatabasePath(serial, backup);
    if (!databasePath.localUnzippedDb)
        return NextResponse.json({ error: 'Missing database path from finger transaction' });

    try {
        let query = `SELECT strftime('%Y-%m-%d %H:%M:%S', LogBorsellino.DataOra/10000000 - 62135596800, 'unixepoch') AS DataOraR, LogBorsellino.* FROM LogBorsellino ORDER BY LogBorsellino.DataOra`;
        if (databasePath.localUnzippedDb.includes("DbBackup")) {
            query = `SELECT  strftime('%Y-%m-%d %H:%M:%S', LogBorsellino.DataOra/10000000 - 62135596800, 'unixepoch') AS DataOraR,  LogBorsellino.* FROM LogBorsellino ORDER BY LogBorsellino.DataOra`;
        }
        const results = await executeQueryOnDb(databasePath.localUnzippedDb, query);
        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
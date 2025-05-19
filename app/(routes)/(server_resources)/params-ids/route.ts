'use server'

// import { createSystemPaths, executeQueryOnDb, setLocalBackupUnzippedFile } from "@/app/lib/backup-handler";
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
        return NextResponse.json({ error: 'Missing database path from params ids' }, { status: 400 });

    try {
        const query = "SELECT ID, DataOra FROM Param";
        const result = await executeQueryOnDb(databasePath.localUnzippedDb, query);

        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
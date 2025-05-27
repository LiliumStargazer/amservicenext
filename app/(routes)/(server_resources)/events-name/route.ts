// Desc: Route to get backup data
'use server'
import { NextResponse } from "next/server";
import {executeQueryOnDb} from "@/app/lib/better-sqlite3";
import { DatabasePath } from "@/app/class/DatabasePath";

export async function GET(req: Request): Promise<NextResponse> {

    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const serial = searchParams.get('serial');
    const backup = searchParams.get('backup');

    if (!serial || !backup) {
        return NextResponse.json({ error: 'Missing serial or backup or date parameter' }, { status: 400 });
    }
    try {
        const databasePath = new DatabasePath(serial, backup);
        let query = `SELECT DISTINCT EventString FROM EventiView ORDER BY EventString COLLATE NOCASE ASC`;
        if (databasePath.databaseUnzipped.includes("DbBackup")) {
            query = `SELECT DISTINCT EventString FROM EventiAll ORDER BY EventString COLLATE NOCASE ASC`;
        }
        const results = await executeQueryOnDb(databasePath.databaseUnzipped, query);
        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
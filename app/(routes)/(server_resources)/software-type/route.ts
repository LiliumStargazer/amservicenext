// Desc: Route to get software type
'use server'
// import {  createSystemPaths, setLocalBackupUnzippedFile} from "@/app/lib/backup-handler";
import { NextResponse } from "next/server";
import {DatabasePath} from "@/app/class/DatabasePath";

export async function GET(req: Request): Promise<NextResponse> {

    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const serial = searchParams.get('serial');
    const backup = searchParams.get('backup');

    if (!serial || !backup ) {
        return NextResponse.json({ error: 'Missing serial or backup parameter' }, { status: 400 });
    }

    const databasePath = new DatabasePath(serial, backup);
    if (!databasePath.localUnzippedDb)
        return NextResponse.json({ error: 'Missing database path from stoftware type' }, { status: 400 });

    try {

        let swType = "android";
        if (databasePath.localUnzippedDb.includes("DbBackup")) {
            swType = "windows";
        }

        return NextResponse.json(swType);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
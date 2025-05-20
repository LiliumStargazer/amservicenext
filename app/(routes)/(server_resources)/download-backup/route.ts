// Desc: Route to get backup data
'use server'
import SftpConnector from "@/app/class/SftpConnector";
import { NextResponse } from "next/server";

import { unzipFile } from "@/app/lib/zip-handler";
import { SftpPath } from "@/app/class/SftpPath";
import { DatabasePath } from "@/app/class/DatabasePath";

export async function GET(req: Request): Promise<NextResponse> {

    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const serial = searchParams.get('serial');
    const backup = searchParams.get('backup');

    if (!serial || !backup) {
        return NextResponse.json({ error: 'Missing serial or backup parameter' }, { status: 400 });
    }
    try {
        const sftpPath = new SftpPath(serial, backup);
        const databasePath = new DatabasePath(serial, backup);
        const sftpConnector = new SftpConnector();
        await sftpConnector.downloadBackup(databasePath, sftpPath);
        await unzipFile(databasePath.backupFileZip, databasePath.backupDir);
        return NextResponse.json(true);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
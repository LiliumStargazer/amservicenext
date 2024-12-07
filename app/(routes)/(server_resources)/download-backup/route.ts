// Desc: Route to get backup data
'use server'
import { createDirectory, createSystemPaths, unzipFile } from "@/app/lib/backup-handler";
import SftpConnector from "@/app/lib/ftp-handler";
import { NextResponse } from "next/server";
import {logErrorAndRespond} from "@/app/lib/error-handler";


export async function GET(req: Request): Promise<NextResponse> {

    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const serial = searchParams.get('serial');
    const backup = searchParams.get('backup');

    if (!serial || !backup) {
        return NextResponse.json({ error: 'Missing serial or backup parameter' });
    }

    try {
        const systemPaths = createSystemPaths(serial, backup);
        await createDirectory(systemPaths.localBackupDirectory);
        const sftpConnector = new SftpConnector();
        await sftpConnector.downloadBackup(systemPaths);
        await unzipFile(systemPaths);
        return NextResponse.json(true);
    } catch (error) {
        return logErrorAndRespond(error);
    }
}
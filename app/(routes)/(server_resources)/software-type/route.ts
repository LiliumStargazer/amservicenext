// Desc: Route to get software type
'use server'
import {  createSystemPaths, setLocalBackupUnzippedFile} from "@/app/lib/backup-handler";
import { NextResponse } from "next/server";
import {logErrorAndRespond} from "@/app/lib/error-handler";

export async function GET(req: Request): Promise<NextResponse> {

    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const serial = searchParams.get('serial');
    const backup = searchParams.get('backup');

    if (!serial || !backup ) {
        return NextResponse.json({ error: 'Missing serial or backup parameter' });
    }

    try {
        const systemPaths = createSystemPaths(serial, backup);
        systemPaths.localBackupUnzippedFile = setLocalBackupUnzippedFile(systemPaths.localBackupDirectory, systemPaths.localBackupUnzippedFile);

        let swType = "android";
        if (systemPaths.localBackupUnzippedFile.includes("DbBackup")) {
            swType = "windows";
        }

        return NextResponse.json(swType);
    } catch (error) {
        return logErrorAndRespond(error);
    }
}
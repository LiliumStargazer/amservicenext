'use server'

import { createSystemPaths, executeQueryDbAll, setLocalBackupUnzippedFile } from "@/app/lib/backup-handler";
import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { logErrorAndRespond } from "@/app/lib/error-handler";


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
        systemPaths.localBackupUnzippedFile = setLocalBackupUnzippedFile(systemPaths.localBackupDirectory, systemPaths.localBackupUnzippedFile);
        const query = "SELECT ID, DataOra FROM Param";
        const backupName = systemPaths.localBackupUnzippedFile;
        const result = await executeQueryDbAll(backupName, query);

        return NextResponse.json(result);
    } catch (error) {
        Sentry.captureException(error);
        return logErrorAndRespond(error);
    }
}
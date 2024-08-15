'use server'

import { createSystemPaths, executeQueryDbAll, setLocalBackupUnzippedFile } from "@/lib/serverBackupHandler";
import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { handleError } from "@/lib/errorHandler";
import {getParams} from "@/lib/param-parsing";

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

        let query = 'SELECT Data FROM Param WHERE ID=(SELECT MAX(ID) FROM Param)';
        let backupName = systemPaths.localBackupUnzippedFile;
        let softwareType: 'android' | 'windows' = 'android';

        if (backupName.includes("DbBackup")) {
            softwareType = 'windows';
        }

        const results = await executeQueryDbAll(systemPaths.localBackupUnzippedFile, query);
        const param = await getParams(results, softwareType);

        return NextResponse.json(param);
    } catch (error) {
        Sentry.captureException(error);
        return handleError(error);
    }
}
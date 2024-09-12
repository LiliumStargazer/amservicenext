'use server'

import { createSystemPaths, executeQueryDbAll, setLocalBackupUnzippedFile } from "@/features/log/server/backup-handler";
import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { handleError } from "@/features/shared/client/utils/error-handler";
import {getParams} from "@/features/log/client/utils/param-parsing";


export async function GET(req: Request): Promise<NextResponse> {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const serial = searchParams.get('serial');
    const backup = searchParams.get('backup');
    let id = searchParams.get('id');

    if ( !id )
        id = "MAX(ID)";

    if (!serial || !backup) {
        return NextResponse.json({ error: 'Missing serial or backup parameter' });
    }

    try {
        const systemPaths = createSystemPaths(serial, backup);
        systemPaths.localBackupUnzippedFile = setLocalBackupUnzippedFile(systemPaths.localBackupDirectory, systemPaths.localBackupUnzippedFile);
        let query = `SELECT Data FROM Param WHERE ID=(SELECT ${id} FROM Param)`;
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
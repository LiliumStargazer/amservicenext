'use server'

import { createSystemPaths, executeQueryDbAll, setLocalBackupUnzippedFile } from "@/src/server/backup-handler";
import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { logErrorAndRespond } from "@/src/server/error-handler";
import {getParams} from "@/src/server/param-proto-loader";


export async function GET(req: Request): Promise<NextResponse> {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const serial = searchParams.get('serial');
    const backup = searchParams.get('backup');
    let id = searchParams.get('id');

    if ( !id || id.length === 0)
        id = "MAX(ID)";

    if (!serial || !backup)
        return NextResponse.json({ error: 'Missing serial or backup parameter' });

    console.log('GET /api/params-data', serial, backup, id);
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
        console.log('Error in GET /api/params-data', error);
        Sentry.captureException(error);
        return logErrorAndRespond(error);
    }
}
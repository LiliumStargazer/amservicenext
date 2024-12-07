'use server'

import { createSystemPaths, executeQueryDbAll, setLocalBackupUnzippedFile } from "@/app/lib/backup-handler";
import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { logErrorAndRespond } from "@/app/lib/error-handler";
import {getParams} from "@/app/lib/param-proto-loader";
import {RawParams} from "@/app/types/types";

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

    console.log('GET /params-data', serial, backup, id);

    try {
        const systemPaths = createSystemPaths(serial, backup);
        systemPaths.localBackupUnzippedFile = setLocalBackupUnzippedFile(systemPaths.localBackupDirectory, systemPaths.localBackupUnzippedFile);
        const query = `SELECT Data FROM Param WHERE ID=(SELECT ${id} FROM Param)`;
        const backupName = systemPaths.localBackupUnzippedFile;
        let softwareType: 'android' | 'windows' = 'android';

        if (backupName.includes("DbBackup")) {
            softwareType = 'windows';
        }

        const results = await executeQueryDbAll(systemPaths.localBackupUnzippedFile, query) as RawParams[];
        const param = await getParams(results, softwareType);

        return NextResponse.json(param);
    } catch (error) {
        console.log('Error in GET /params-data', error);
        Sentry.captureException(error);
        return logErrorAndRespond(error);
    }
}
'use server'

import {createSystemPaths, executeQueryDbAll, setLocalBackupUnzippedFile} from "@/lib/serverBackupHandler";
import {NextResponse} from "next/server";
import {getParams} from "@/lib/param-parsing";
import * as Sentry from "@sentry/nextjs";

export async function GET(req) {

    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const serial = searchParams.get('serial');
    const backup = searchParams.get('backup');

    try {
        const systemPaths = createSystemPaths(serial, backup);
        systemPaths.localBackupUnzippedFile = setLocalBackupUnzippedFile(systemPaths.localBackupDirectory,
            systemPaths.localBackupUnzippedFile);
        let query = 'SELECT Data FROM Param WHERE ID=(SELECT MAX(ID) FROM Param)';
        let backupName = systemPaths.localBackupUnzippedFile;
        let softwareType = "android";
        if ( backupName.includes("DbBackup"))
            softwareType = "windows";
        const results = await executeQueryDbAll(systemPaths.localBackupUnzippedFile, query);
        const param = await getParams(results, softwareType);
        return NextResponse.json(param);
    } catch (error) {
        Sentry.captureException(error);
        return NextResponse.json({ error: error.message })
    }
}
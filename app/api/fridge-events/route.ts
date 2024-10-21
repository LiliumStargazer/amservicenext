// pages/api/route.ts
import { createSystemPaths, executeQueryDbAll, setLocalBackupUnzippedFile } from "@/src/server/backup-handler";
import { NextResponse } from "next/server";
import * as Sentry from '@sentry/nextjs';
import {logErrorAndRespond} from "@/src/server/error-handler";

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
        const query = 'SELECT * FROM FrigoView';
        let results = await executeQueryDbAll(systemPaths.localBackupUnzippedFile, query);

        if (systemPaths.localBackupUnzippedFile.includes("DbBackup")) {
            results= results.map((element: any) => {
                const { DataOraR, ID, IDFrigo, Temperature, Temp2, Temp3, Temp4, FrigoState, WarnBits } = element;
                return {
                    DataOraR,
                    Id: ID,
                    IDFrigo,
                    Temperature1: Temperature,
                    Temperature2: Temp2,
                    Temperature3: Temp3,
                    Temperature4: Temp4,
                    FrigoState,
                    WarnAlarm: WarnBits
                };
            });
        }

        return NextResponse.json(results);
    } catch (error) {
        Sentry.captureException(error);
        return logErrorAndRespond(error);
    }
}
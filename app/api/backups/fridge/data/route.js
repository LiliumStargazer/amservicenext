// pages/api/route.js
import {createSystemPaths, executeQueryDbAll, setLocalBackupUnzippedFile} from "@/lib/serverBackupHandler";
import {NextResponse} from "next/server";
import * as Sentry from '@sentry/nextjs';

export async function GET(req) {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const serial = searchParams.get('serial');
    const backup = searchParams.get('backup');

    try {
        const systemPaths = createSystemPaths(serial, backup);
        systemPaths.localBackupUnzippedFile = setLocalBackupUnzippedFile(systemPaths.localBackupDirectory,
            systemPaths.localBackupUnzippedFile);
        const query = 'SELECT * FROM FrigoView';
        let results = await executeQueryDbAll(systemPaths.localBackupUnzippedFile, query);
        if ( systemPaths.localBackupUnzippedFile.includes("DbBackup") ){
            const resultsOverwrite = [];

            results.forEach((element) => {
                const { DataOraR, ID, IDFrigo, Temperature, Temp2, Temp3, Temp4, FrigoState, WarnBits } = element;
                const newElement = {
                    DataOraR: DataOraR,
                    Id: ID,
                    IDFrigo: IDFrigo,
                    Temperature1: Temperature,
                    Temperature2: Temp2,
                    Temperature3: Temp3,
                    Temperature4: Temp4,
                    FrigoState: FrigoState,
                    WarnAlarm: WarnBits
                };
                resultsOverwrite.push(newElement);
            });
            results = resultsOverwrite;
        }

        return NextResponse.json(results);
    } catch (error) {
        Sentry.captureException(error);
        return NextResponse.json({ error: error.message }, )
    }
}

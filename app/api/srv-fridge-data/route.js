// pages/api/route.js
import {createSystemPaths, executeQueryDbAll, setLocalBackupUnzippedFile} from "@/lib/functionsServer";
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
                const newElement = {};
                newElement.DataOraR = element.DataOraR;
                newElement.Id = element.ID;
                newElement.IDFrigo = element.IDFrigo;
                newElement.Temperature1 = element.Temperature;
                newElement.Temperature2 = element.Temp2;
                newElement.Temperature3 = element.Temp3;
                newElement.Temperature4 = element.Temp4;
                newElement.FrigoState = element.FrigoState;
                newElement.WarnAlarm = element.WarnBits;
                resultsOverwrite.push(newElement);
            });
            results = resultsOverwrite;
        }

        return NextResponse.json(results);
    } catch (error) {
        Sentry.captureException(err);
        return NextResponse.json({ error: error.toString() }, { status: 500 })
    }
}

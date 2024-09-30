// Desc: Route to get backup data
import {  createSystemPaths, executeQueryDbAll, setLocalBackupUnzippedFile} from "@/features/log/server/backup-handler";

import { NextResponse } from "next/server";
import {logErrorAndRespond} from "@/features/shared/client/utils/error-handler";


export async function GET(req: Request): Promise<NextResponse> {

    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const serial = searchParams.get('serial');
    const backup = searchParams.get('backup');
    const date = searchParams.get('date');

    console.log('date', date);
    console.log('serial', serial);
    console.log('backup', backup);

    if (!serial || !backup || !date) {
        return NextResponse.json({ error: 'Missing serial or backup parameter' });
    }


    const startOfDayDate = new Date(date);
    const endOfDay = new Date(date);
    startOfDayDate.setHours(0, 0, 0, 0);
    endOfDay.setHours(23, 59, 59, 999);

    try {
        const systemPaths = createSystemPaths(serial, backup);
        systemPaths.localBackupUnzippedFile = setLocalBackupUnzippedFile(systemPaths.localBackupDirectory, systemPaths.localBackupUnzippedFile);

        let query = `EventiView WHERE DataOraR BETWEEN '${startOfDayDate.toISOString()}' AND '${endOfDay.toISOString()}'`;
        if (systemPaths.localBackupUnzippedFile.includes("DbBackup")) {
            query = `SELECT * FROM EventiAll WHERE DataOraR BETWEEN '${startOfDayDate.toISOString()}' AND '${endOfDay.toISOString()}'`;
        }

        const results = await executeQueryDbAll(systemPaths.localBackupUnzippedFile, query);


        return NextResponse.json(results);
    } catch (error) {
        return logErrorAndRespond(error);
    }
}
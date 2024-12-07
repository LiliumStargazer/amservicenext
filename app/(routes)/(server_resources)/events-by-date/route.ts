// Desc: Route to get backup data
'use server'
import {  createSystemPaths, executeQueryDbAll, setLocalBackupUnzippedFile} from "@/app/lib/backup-handler";
import { NextResponse } from "next/server";
import {logErrorAndRespond} from "@/app/lib/error-handler";

export async function GET(req: Request): Promise<NextResponse> {

    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const serial = searchParams.get('serial');
    const backup = searchParams.get('backup');
    const date = searchParams.get('date');

    if (!serial || !backup || !date) {
        return NextResponse.json({ error: 'Missing serial or backup parameter' });
    }
    try {

        const systemPaths = createSystemPaths(serial, backup);
        systemPaths.localBackupUnzippedFile = setLocalBackupUnzippedFile(systemPaths.localBackupDirectory, systemPaths.localBackupUnzippedFile);

        if (date === 'null') {
            let maxDateQuery = `SELECT * FROM EventiView WHERE DATE(DataOraR) = ( SELECT DATE(MAX(DataOraR)) FROM EventiView )`;
            if (systemPaths.localBackupUnzippedFile.includes("DbBackup")) {
                maxDateQuery = `SELECT * FROM EventiView WHERE DATE(DataOraR) = ( SELECT DATE(MAX(DataOraR)) FROM EventiAll )`;
            }
            const maxDate = await executeQueryDbAll(systemPaths.localBackupUnzippedFile, maxDateQuery);
            return NextResponse.json(maxDate);
        }

        const datePart = date.split('T')[0];
        const [year, month, day] = datePart.split('-');
        const startOfDayString = `${year}-${month}-${day} 00:00:00`;
        const endOfDayString = `${year}-${month}-${day} 23:59:59`;

        let query = `SELECT * FROM EventiView WHERE DataOraR BETWEEN '${startOfDayString}' AND '${endOfDayString}'`;
        if (systemPaths.localBackupUnzippedFile.includes("DbBackup")) {
            query = `SELECT * FROM EventiAll WHERE DataOraR BETWEEN '${startOfDayString}' AND '${endOfDayString}'`;
        }

        const results = await executeQueryDbAll(systemPaths.localBackupUnzippedFile, query);
        return NextResponse.json(results);

    } catch (error) {
        return logErrorAndRespond(error);
    }
}
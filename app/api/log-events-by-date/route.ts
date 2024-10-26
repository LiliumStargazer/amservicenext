// Desc: Route to get backup data
import {  createSystemPaths, executeQueryDbAll, setLocalBackupUnzippedFile} from "@/src/server/backup-handler";
import { NextResponse } from "next/server";
import {logErrorAndRespond} from "@/src/server/error-handler";

export async function GET(req: Request): Promise<NextResponse> {

    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const serial = searchParams.get('serial');
    const backup = searchParams.get('backup');
    const date = searchParams.get('date');

    if (!serial || !backup || !date) {
        return NextResponse.json({ error: 'Missing serial or backup parameter' });
    }

    const startOfDayDate = new Date(date);
    const endOfDay = new Date(date);
    startOfDayDate.setHours(0, 0, 0, 0);
    endOfDay.setHours(23, 59, 59, 999);

    function formatDateToLocalString(date: any) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Mesi da 0 a 11
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    const startOfDayString = formatDateToLocalString(startOfDayDate);
    const endOfDayString = formatDateToLocalString(endOfDay);

    try {
        const systemPaths = createSystemPaths(serial, backup);
        systemPaths.localBackupUnzippedFile = setLocalBackupUnzippedFile(systemPaths.localBackupDirectory, systemPaths.localBackupUnzippedFile);

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
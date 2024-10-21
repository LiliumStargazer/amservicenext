// Desc: Route to get backup data
import {  createSystemPaths, executeQueryDbAll, setLocalBackupUnzippedFile} from "@/src/server/backup-handler";
import { NextResponse } from "next/server";
import {logErrorAndRespond} from "@/src/server/error-handler";

export async function GET(req: Request): Promise<NextResponse> {

    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const serial = searchParams.get('serial');
    const backup = searchParams.get('backup');
    const event = searchParams.get('event');

    if (!serial || !backup || !event) {
        return NextResponse.json({ error: 'Missing serial or backup parameter' });
    }



    try {
        const systemPaths = createSystemPaths(serial, backup);
        systemPaths.localBackupUnzippedFile = setLocalBackupUnzippedFile(systemPaths.localBackupDirectory, systemPaths.localBackupUnzippedFile);

        let tableName = "EventiView";
        const columns = [
            "DataOraR", "EventString", "ID", "Code", "State",
            "DevProducer", "DevIndex", "SubIndex", "DevClass",
            "Tag1", "Tag2", "Tag3", "Tag4", "Fase", "TagData"
        ];

        if (systemPaths.localBackupUnzippedFile.includes("DbBackup"))
            tableName = "EventiAll";

        let query = `SELECT * FROM ${tableName}`;

        if (event) {
            const conditions = columns.map(col => `${col} LIKE '%${event}%'`).join(' OR ');
            query += ` WHERE ${conditions}`;
        }

        const results = await executeQueryDbAll(systemPaths.localBackupUnzippedFile, query);
        return NextResponse.json(results);

    } catch (error) {
        return logErrorAndRespond(error);
    }
}
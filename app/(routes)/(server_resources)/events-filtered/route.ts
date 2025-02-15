// Desc: Route to get backup data
'use server'
import {  createSystemPaths, executeQueryDbAll, setLocalBackupUnzippedFile} from "@/app/lib/backup-handler";
import { NextResponse } from "next/server";

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
        let columns = [
            "DataOraR", "EventString", "ID", "Code", "State",
            "DevProducer", "DevIndex", "SubIndex", "DevClass",
            "Tag1", "Tag2", "Tag3", "Tag4", "Fase", "TagData"
        ];

        if (systemPaths.localBackupUnzippedFile.includes("DbBackup")) {
            tableName = "EventiAll";
            columns = [
                "DataOraR", "EventString", "ID", "Code", "State",
                "DevId", "RelIndex", "SubIndex", "DevClass",
                "Tag1", "Tag2", "Tag3", "Tag4", "Fase", "TagData"
            ];
        }

        let query = `SELECT * FROM ${tableName}`;

        if (event) {
            const conditions = columns.map(col => `${col} LIKE '%${event}%'`).join(' OR ');
            query += ` WHERE ${conditions}`;
        }

        const results = await executeQueryDbAll(systemPaths.localBackupUnzippedFile, query);
        return NextResponse.json(results);

    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
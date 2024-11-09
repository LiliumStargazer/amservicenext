// Desc: Route to get backup data
import { createDirectory, createSystemPaths, executeQueryDbAll, setLocalBackupUnzippedFile, unzipFile } from "@/src/server/backup-handler";
import SftpConnector from "@/src/server/ftp-handler";
import { NextResponse } from "next/server";
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
        await createDirectory(systemPaths.localBackupDirectory);
        const sftpConnector = new SftpConnector();
        await sftpConnector.downloadBackup(systemPaths);
        await unzipFile(systemPaths);
        systemPaths.localBackupUnzippedFile = setLocalBackupUnzippedFile(systemPaths.localBackupDirectory, systemPaths.localBackupUnzippedFile);

        let query = ' SELECT * FROM EventiView WHERE DATE(DataOraR) = ( SELECT DATE(MAX(DataOraR)) FROM EventiView)';
        if (systemPaths.localBackupUnzippedFile.includes("DbBackup")) {
            query = ' SELECT * FROM EventiAll WHERE DATE(DataOraR) = ( SELECT DATE(MAX(DataOraR)) FROM EventiAll)';
        }
        const results = await executeQueryDbAll(systemPaths.localBackupUnzippedFile, query);
        return NextResponse.json(results);
    } catch (error) {
        return logErrorAndRespond(error);
    }
}
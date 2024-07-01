// app/api/route.js
import {createDirectory, createSystemPaths, executeQueryDbAll, setLocalBackupUnzippedFile, unzipFile} from "@/lib/functionsServer";
import SftpConnector from "@/lib/ftp-handler";
import {NextResponse} from "next/server";
import * as Sentry from '@sentry/nextjs';

export async function GET(req) {

    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const serial = searchParams.get('serial');
    const backup = searchParams.get('backup');

    try {
        const systemPaths = createSystemPaths(serial, backup);
        await createDirectory(systemPaths.localBackupDirectory);
        const sftpConnector = new SftpConnector();
        await sftpConnector.downloadBackup(systemPaths);
        await unzipFile(systemPaths);

        systemPaths.localBackupUnzippedFile = setLocalBackupUnzippedFile(systemPaths.localBackupDirectory,
            systemPaths.localBackupUnzippedFile);
        let query = 'SELECT * FROM EventiView';
        if ( systemPaths.localBackupUnzippedFile.includes("DbBackup") ){
            query = 'SELECT * FROM EventiAll';
        }
        const results = await executeQueryDbAll(systemPaths.localBackupUnzippedFile, query);
        return NextResponse.json(results);
    } catch (error) {
        Sentry.captureException(error);
        return NextResponse.json({ error: error.message })
    }
}

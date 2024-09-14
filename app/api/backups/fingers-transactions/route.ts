// Desc: Route to get backup data
import { createSystemPaths, executeQueryDbAll, setLocalBackupUnzippedFile } from "@/features/log/server/backup-handler";
import { NextResponse } from "next/server";
import {handleError} from "@/features/shared/client/utils/error-handler";

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
        let query = 'SELECT  strftime(\'%Y-%m-%d %H:%M:%S\', LisTransaction.DataOra/10000000 - 62135596800, \'unixepoch\') AS DataOraR,  LisTransaction.* FROM LisTransaction ORDER BY LisTransaction.Id';
        const results = await executeQueryDbAll(systemPaths.localBackupUnzippedFile, query);
        console.log('results', results);
        return NextResponse.json(results);
    } catch (error) {
        return handleError(error);
    }
}
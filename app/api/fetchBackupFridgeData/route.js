// pages/api/route.js
import {createSystemPaths, executeQueryDbAll, setLocalBackupUnzippedFile} from "@/lib/functionsServer";
import {NextResponse} from "next/server";

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
        const results = await executeQueryDbAll(systemPaths.localBackupUnzippedFile, query);
        return NextResponse.json(results);
    } catch (error) {

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

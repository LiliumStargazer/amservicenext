import {createSystemPaths, executeQueryDbAll, setLocalBackupUnzippedFile} from "@/lib/functionsServer";
import {NextResponse} from "next/server";
import {getParams} from "@/lib/params/param";

export async function GET(req) {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const serial = searchParams.get('serial');
    const backup = searchParams.get('backup');

    try {
        const systemPaths = createSystemPaths(serial, backup);
        systemPaths.localBackupUnzippedFile = setLocalBackupUnzippedFile(systemPaths.localBackupDirectory,
            systemPaths.localBackupUnzippedFile);
        let query = 'SELECT Data FROM Param WHERE ID=(SELECT MAX(ID) FROM Param)';
        if ( systemPaths.localBackupUnzippedFile.includes("DbBackup") ){
            query = 'SELECT Data FROM Param WHERE ID=(SELECT MAX(ID) FROM ParamView)';
        }
        const results = await executeQueryDbAll(systemPaths.localBackupUnzippedFile, query);
        const param = await getParams(results);
        return NextResponse.json(param);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

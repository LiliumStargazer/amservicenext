import {NextResponse} from "next/server";

import {createZipFile} from "@/app/lib/zip-handler";
import SftpConnector from "@/app/class/SftpConnector";
import { DatabasePath } from "@/app/class/DatabasePath";
import { SftpPath } from "@/app/class/SftpPath";

export async function GET(req: Request): Promise<NextResponse> {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const serial = searchParams.get('sourceSerial');
    const backup = searchParams.get('backup');
    const targetSerial = searchParams.get('targetSerial');
    console.log('GET /recover-db/route.ts: serial:', serial, 'backup:', backup, 'targetSerial:', targetSerial);

    if (!serial || !backup || !targetSerial) {
        return NextResponse.json({ error: 'Missing serial, backup or targetSerial parameter' }, { status: 400 });
    }

    const databasePath = new DatabasePath(serial, backup);
    const sftpPath = new SftpPath(targetSerial, backup);
    try {
        //copia il db, il db finger e il db prodotti nel nuovo File DbAndFinger.zip nell'sftp alla cartella nrseriale/config/Out
        
        if (databasePath.databaseFingerUnzipped.includes('AndBk')) {
            const fs = await import('fs/promises');
            await fs.rename(databasePath.databaseFingerUnzipped, databasePath.defaultFingerDbPath);
            databasePath.setDefaultFingerDbPath(databasePath.defaultDbPath);
            await fs.rename(databasePath.databaseUnzipped, databasePath.defaultDbPath);
            databasePath.setDefaultDbPath(databasePath.defaultDbPath);
        }

        const fileToZip = [databasePath.databaseUnzipped, databasePath.databaseFingerUnzipped, databasePath.databaseProductUnzipped];
        await createZipFile(fileToZip, databasePath.databaseWithFingerZipped);
        const sftpConnector = new SftpConnector();
        await sftpConnector.createPath(sftpPath.outDir);
        await sftpConnector.uploadBackup(databasePath.databaseWithFingerZipped, sftpPath.backupWithFingerZip);
        return NextResponse.json('OK', { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

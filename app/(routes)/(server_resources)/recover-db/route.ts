import {NextResponse} from "next/server";
import {createZipFile} from "@/app/lib/zip-handler";
import SftpConnector from "@/app/class/SftpConnector";
import { DatabasePath } from "@/app/class/DatabasePath";
import { SftpPath } from "@/app/class/SftpPath";
import { postData } from "@/app/lib/axiosClient";



export async function GET(req: Request): Promise<NextResponse> {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const serial = searchParams.get('serial');
    const backup = searchParams.get('backup');

    if (!serial || !backup) {
        return NextResponse.json({ error: 'Missing serial or backup parameter' }, { status: 400 });
    }
    const databasePath = new DatabasePath(serial, backup);
    const sftpPath = new SftpPath(serial, backup);

    try {
        await postData(`http://db-recovery:5000/recover`, { serial, backup }, { timeout: 300000 });
        const fileToZip= [databasePath.databaseRecovered, databasePath.databaseProductRecovered];
        await createZipFile(fileToZip, databasePath.databaseRecoveredZipped);
        const sftpConnector = new SftpConnector();
        await sftpConnector.uploadBackup(databasePath.databaseRecoveredZipped, sftpPath.backupFixedZip);
        return NextResponse.json('OK', { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }

}
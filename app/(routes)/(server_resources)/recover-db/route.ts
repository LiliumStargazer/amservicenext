import {NextResponse} from "next/server";
import {DatabasePath} from "@/app/class/DatabasePath";
import {createZipFile} from "@/app/lib/zip-handler";
import SftpConnector from "@/app/class/SftpConnector";

export async function GET(req: Request): Promise<NextResponse> {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const serial = searchParams.get('serial');
    const backup = searchParams.get('backup');


    if (!serial || !backup) {
        return NextResponse.json({ error: 'Missing serial or backup parameter' }, { status: 400 });
    }

    try {
        const databasePath = new DatabasePath(serial, backup);

        const response = await fetch('http://db-recovery:5000/recover', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({serial: serial, backup: backup}),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json({ error: errorData.error || 'Errore sconosciuto' }, { status: response.status });
        }

        await createZipFile(databasePath);
        const sftpConnector = new SftpConnector();
        await sftpConnector.uploadBackup(databasePath);

        return NextResponse.json('OK', { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
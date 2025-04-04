'use server'
import { createSystemPaths } from "@/app/lib/backup-handler";
import SftpConnector from "@/app/lib/ftp-handler";
import { NextResponse } from "next/server";


export async function GET(req: Request): Promise<NextResponse> {
    console.log('api/backup-list/route.ts: GET: req:', req);

    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const serial = searchParams.get('serial');

    if (!serial) {
        return NextResponse.json({ error: 'Missing serial parameter' });
    }
    console.log('api/backup-list/route.ts: GET: serial:', serial);
    try {
        const systemPaths = createSystemPaths(serial.toString());
        const sftpConnector = new SftpConnector();
        const backupLists = await sftpConnector.getListOfSftpBackups(systemPaths);

        return NextResponse.json(backupLists);
    } catch (error) {
        console.log('Error while getting backup backup-list from api-route:', error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
'use server'
import SftpConnector from "@/app/class/SftpConnector";
import { NextResponse } from "next/server";
import { SftpPath } from "@/app/class/SftpPath";


export async function GET(req: Request): Promise<NextResponse> {
    console.log('api/backup-list/route.ts: GET: req:');
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const serial = searchParams.get('serial');

    if (!serial) {
        return NextResponse.json({ error: 'Missing serial parameter' }, { status: 400 });
    }
    try {
        const sftpPath = new SftpPath(serial);
        const sftpConnector = new SftpConnector();
        const backupLists = await sftpConnector.getSftpBackupList(sftpPath);
        return NextResponse.json(backupLists);
    } catch (error) {
        console.log('Error while getting backup backup-list from api-route:', error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
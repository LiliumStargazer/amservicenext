import {createSystemPaths} from "@/lib/serverBackupHandler";
import SftpConnector from "@/lib/ftp-handler";
import {NextResponse} from "next/server";
import * as Sentry from '@sentry/nextjs';

export async function GET(req) {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const serial = searchParams.get('serial');

    try {
        const systemPaths = createSystemPaths(serial.toString());
        const sftpConnector = new SftpConnector();
        const backupLists = await sftpConnector.getListOfSftpBackups(systemPaths);
        return NextResponse.json(backupLists);
    } catch (error) {
        console.log('Error while getting backup lists from api-route:', error.message)
        Sentry.captureException(error);
        return NextResponse.json({ error: error.message });
    }

}

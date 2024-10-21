import { createSystemPaths } from "@/src/server/backup-handler";
import SftpConnector from "@/src/server/ftp-handler";
import { NextResponse } from "next/server";
import {logErrorAndRespond} from "@/src/server/error-handler";


export async function GET(req: Request): Promise<NextResponse> {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const serial = searchParams.get('serial');
    if (!serial) {
        return NextResponse.json({ error: 'Missing serial parameter' });
    }
    try {
        const systemPaths = createSystemPaths(serial);
        console.log('systemPaths', systemPaths.toString());
        const sftpConnector = new SftpConnector();
        const result = await sftpConnector.isSerialNumberOnSftp(systemPaths);
        return NextResponse.json(result);
    } catch (error) {
        return logErrorAndRespond(error);
    }
}
import { createSystemPaths } from "@/lib/serverBackupHandler";
import SftpConnector from "@/lib/ftp-handler";
import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

export async function GET(req: Request): Promise<NextResponse> {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const serial = searchParams.get('serial');

    if (!serial) {
        return NextResponse.json({ error: 'Missing serial parameter' });
    }

    try {
        const systemPaths = createSystemPaths(serial);
        const sftpConnector = new SftpConnector();
        const result = await sftpConnector.isSerialNumberOnSftp(systemPaths);
        return NextResponse.json(result);
    } catch (error) {
        Sentry.captureException(error);
        return NextResponse.json({ error: error.message });
    }
}
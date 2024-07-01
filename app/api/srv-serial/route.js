import {createSystemPaths} from "@/lib/functionsServer";
import SftpConnector from "@/lib/ftp-handler";
import {NextResponse} from "next/server"
import * as Sentry from "@sentry/nextjs";

export async function GET(req, res) {

    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const serial = searchParams.get('serial');

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

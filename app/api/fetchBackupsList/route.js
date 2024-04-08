import {createSystemPaths} from "@/lib/functionsServer";
import SftpConnector from "@/lib/ftpService";
import {NextResponse} from "next/server"

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
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

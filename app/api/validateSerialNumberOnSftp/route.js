import {createSystemPaths} from "@/lib/functionsServer";
import SftpConnector from "@/lib/ftpService";
import {NextResponse} from "next/server"

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
        console.log("sono error message")
        console.log(error.message);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

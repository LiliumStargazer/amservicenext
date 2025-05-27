// Desc: Route to get software type
'use server'
import { DatabasePath } from "@/app/class/DatabasePath";
import { NextResponse } from "next/server";


export async function GET(req: Request): Promise<NextResponse> {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const serial = searchParams.get('serial');
    const backup = searchParams.get('backup');
    if (!serial || !backup ) {
        return NextResponse.json({ error: 'Missing serial or backup parameter' }, { status: 400 });
    }
    const databasePath = new DatabasePath(serial, backup);
    try {
        let swType = "android";
        if (databasePath.databaseUnzipped.includes("DbBackup")) {
            swType = "windows";
        }
        return NextResponse.json(swType);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
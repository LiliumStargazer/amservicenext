'use server'

import { NextResponse } from "next/server";
import {getParams} from "@/app/lib/param-proto-loader";
import {RawParams} from "@/app/types/types";
import {executeQueryOnDb} from "@/app/lib/better-sqlite3";
import { DatabasePath } from "@/app/class/DatabasePath";

export async function GET(req: Request): Promise<NextResponse> {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const serial = searchParams.get('serial');
    const backup = searchParams.get('backup');
    let id = searchParams.get('id');

    if ( !id || id.length === 0)
        id = "MAX(ID)";

    if (!serial || !backup)
        return NextResponse.json({ error: 'Missing serial or backup parameter' }, { status: 400 });

    const databasePath = new DatabasePath(serial, backup);
    
    if (!databasePath.databaseUnzipped)
        return NextResponse.json({ error: 'Missing database path from param data' }, { status: 400 });

    try {
        const query = `SELECT Data FROM Param WHERE ID=(SELECT ${id} FROM Param)`;
        let softwareType: 'android' | 'windows' = 'android';

        if (databasePath.databaseUnzipped.includes("DbBackup")) {
            softwareType = 'windows';
        }

        const results = await executeQueryOnDb(databasePath.databaseUnzipped, query) as RawParams[];
        const param = await getParams(results, softwareType);

        return NextResponse.json(param);
    } catch (error) {
        console.log('Error in GET /params-data', error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
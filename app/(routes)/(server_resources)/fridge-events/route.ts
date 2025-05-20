// pages/api/route.ts
'use server'

import { NextResponse } from "next/server";
import {executeQueryOnDb} from "@/app/lib/better-sqlite3";
import { DatabasePath } from "@/app/class/DatabasePath";

export async function GET(req: Request): Promise<NextResponse> {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const serial = searchParams.get('serial');
    const backup = searchParams.get('backup');

    if (!serial || !backup) {
        return NextResponse.json({ error: 'Missing serial or backup parameter' }, { status: 400 });
    }

    const databasePath = new DatabasePath(serial, backup);

    try {
        const query = 'SELECT *  FROM FrigoView';
        const  results = await executeQueryOnDb(databasePath.databaseUnzipped, query);
        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
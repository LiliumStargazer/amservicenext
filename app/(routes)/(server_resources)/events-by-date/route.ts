// Desc: Route to get backup data
'use server'
import { NextResponse } from "next/server";
import {executeQueryOnDb} from "@/app/lib/better-sqlite3";
import {DatabasePath} from "@/app/class/DatabasePath";


export async function GET(req: Request): Promise<NextResponse> {

    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const serial = searchParams.get('serial');
    const backup = searchParams.get('backup');
    const date = searchParams.get('date');

    if (!serial || !backup || !date) {
        return NextResponse.json({ error: 'Missing serial or backup parameter' }, { status: 400 });
    }
    try {
        const databasePath = new DatabasePath(serial, backup);
        console.log("databasePath", databasePath);
        if (!databasePath.localUnzippedDb)
            return NextResponse.json({ error: 'Missing database path from events by date' });

        if (date === 'null') {
            let maxDateQuery = `SELECT * FROM EventiView WHERE DATE(DataOraR) = ( SELECT DATE(MAX(DataOraR)) FROM EventiView )`;
            if (databasePath.localUnzippedDb.includes("DbBackup")) {
                maxDateQuery = `SELECT * FROM EventiALl WHERE DATE(DataOraR) = ( SELECT DATE(MAX(DataOraR)) FROM EventiAll )`;
            }
            const queryWithMaxDate = await executeQueryOnDb(databasePath.localUnzippedDb, maxDateQuery);
            return NextResponse.json(queryWithMaxDate);
        }

        const datePart = date.split('T')[0];
        const [year, month, day] = datePart.split('-');
        const startOfDayString = `${year}-${month}-${day} 00:00:00`;
        const endOfDayString = `${year}-${month}-${day} 23:59:59`;

        let query = `SELECT * FROM EventiView WHERE DataOraR BETWEEN '${startOfDayString}' AND '${endOfDayString}'`;
        if (databasePath.localUnzippedDb.includes("DbBackup")) {
            query = `SELECT * FROM EventiAll WHERE DataOraR BETWEEN '${startOfDayString}' AND '${endOfDayString}'`;
        }

        const results = await executeQueryOnDb(databasePath.localUnzippedDb, query);
        return NextResponse.json(results);

    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
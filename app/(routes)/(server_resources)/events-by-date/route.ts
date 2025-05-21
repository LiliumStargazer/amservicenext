// Desc: Route to get backup data
'use server'
import { NextResponse } from "next/server";
import {executeQueryOnDb} from "@/app/lib/better-sqlite3";
import { DatabasePath } from "@/app/class/DatabasePath";



export async function GET(req: Request): Promise<NextResponse> {

    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const serial = searchParams.get('serial');
    const backup = searchParams.get('backup');
    const date = searchParams.get('date');

    console.log("date", date);

    if (!serial || !backup) {
        return NextResponse.json({ error: 'Missing serial or backup or date parameter' }, { status: 400 });
    }
    try {
        const databasePath = new DatabasePath(serial, backup);

        if (!date) {
            let maxDateQuery = `SELECT * FROM EventiView WHERE DATE(DataOraR) = ( SELECT DATE(MAX(DataOraR)) FROM EventiView )`;
            if (databasePath.backupFileZip.includes("DbBackup")) {
                maxDateQuery = `SELECT * FROM EventiALl WHERE DATE(DataOraR) = ( SELECT DATE(MAX(DataOraR)) FROM EventiAll )`;
            }
            const queryWithMaxDate = await executeQueryOnDb(databasePath.databaseUnzipped, maxDateQuery);
            return NextResponse.json(queryWithMaxDate);
        }

        const datePart = date.split('T')[0];
        const [year, month, day] = datePart.split('-');
        const startOfDayString = `${year}-${month}-${day} 00:00:00`;
        const endOfDayString = `${year}-${month}-${day} 23:59:59`;

        let query = `SELECT * FROM EventiView WHERE DataOraR BETWEEN '${startOfDayString}' AND '${endOfDayString}'`;
        if (databasePath.databaseUnzipped.includes("DbBackup")) {
            query = `SELECT * FROM EventiAll WHERE DataOraR BETWEEN '${startOfDayString}' AND '${endOfDayString}'`;
        }

        const results = await executeQueryOnDb(databasePath.databaseUnzipped, query);
        return NextResponse.json(results);

    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
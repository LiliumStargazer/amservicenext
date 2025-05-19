import {NextResponse} from "next/server";
import {postData} from "@/app/lib/axiosClient";
import type { ApiError } from "@/app/lib/axiosClient";

export async function GET(req: Request): Promise<NextResponse> {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const serial = searchParams.get('serial');
    const backup = searchParams.get('backup');

    console.log('/integrity-check/route.ts: GET: req:');

    if (!serial || !backup)
        return NextResponse.json({ error: 'Missing serial or backup parameter' }, { status: 400 });

    try {
        await postData(`http://db-recovery:5000/integrity_check`, { serial, backup }
        );
        return NextResponse.json('OK', { status: 200 });
    } catch (error) {
    /*     console.log('integrity check error: ',error); */
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Errore sconosciuto' },
            { status: (error as ApiError).status || 500 }
        );
    }
}
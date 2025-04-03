// Desc: Route to get software type
'use server'
import { NextResponse } from "next/server";
import {Vtiger} from "@/app/lib/vtger";

export async function GET(req: Request): Promise<NextResponse> {

    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const serial = searchParams.get('serial');

    if (!serial  ) {
        return NextResponse.json({ error: 'Missing serial or backup parameter' });
    }

    try {
        const vt = new Vtiger();
        const result = await vt.getVteInfo(serial);
        if (result !== 0) {
            return NextResponse.json({ error: 'Error retrieving VTE data' });
        }
        return NextResponse.json(vt.vteUtility);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
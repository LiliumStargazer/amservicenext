'use server'

import { NextResponse } from 'next/server';
import {apiRequest} from "@/app/lib/api/api-handle-cors";

const getTicketLatest = (): Promise<string> => apiRequest('http://staging.gruppo-am.com/analisi_interventi.csv', { responseType: 'text' });

export async function GET(): Promise<NextResponse> {
    try {
        const result = await getTicketLatest();
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
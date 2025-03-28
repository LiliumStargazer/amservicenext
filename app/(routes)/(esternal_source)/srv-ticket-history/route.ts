'use server'
import { NextResponse } from 'next/server';

import {apiRequest} from "@/app/lib/api-cors";

const getTicketsHistory = (): Promise<string> => apiRequest('http://staging.gruppo-am.com/analisi_interventi_storico.csv', { responseType: 'text' });

export async function GET(): Promise<NextResponse> {
    try {
        const result = await getTicketsHistory();
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
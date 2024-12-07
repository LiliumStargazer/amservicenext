'use server'
import { NextResponse } from 'next/server';
import {logErrorAndRespond} from "@/app/lib/error-handler";
import {apiRequest} from "@/app/lib/api-handle-cors";

const getTicketsHistory = (): Promise<string> => apiRequest('http://staging.gruppo-am.com/analisi_interventi_storico.csv', { responseType: 'text' });

export async function GET(): Promise<NextResponse> {
    try {
        const result = await getTicketsHistory();
        return NextResponse.json(result);
    } catch (error) {
        return logErrorAndRespond(error);
    }
}
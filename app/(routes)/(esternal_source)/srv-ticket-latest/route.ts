'use server'

import { NextResponse } from 'next/server';
import * as Sentry from "@sentry/nextjs";
import {apiRequest} from "@/app/lib/api-handle-cors";
import {logErrorAndRespond} from "@/app/lib/error-handler";

const getTicketLatest = (): Promise<string> => apiRequest('http://staging.gruppo-am.com/analisi_interventi.csv', { responseType: 'text' });

export async function GET(): Promise<NextResponse> {
    try {
        const result = await getTicketLatest();
        return NextResponse.json(result);
    } catch (error) {
        Sentry.captureException(error);
        return logErrorAndRespond(error);
    }
}
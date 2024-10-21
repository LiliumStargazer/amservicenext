'use server'

import { NextResponse } from 'next/server';
import * as Sentry from "@sentry/nextjs";
import {apiRequest} from "@/src/server/api-handle-cors";
import {logErrorAndRespond} from "@/src/server/error-handler";

const getTicketLatest = (): Promise<string> => apiRequest('http://staging.gruppo-am.com/analisi_interventi.csv', { responseType: 'text' });

export async function GET(req: Request): Promise<NextResponse> {
    try {
        const result = await getTicketLatest();
        return NextResponse.json(result);
    } catch (error) {
        Sentry.captureException(error);
        return logErrorAndRespond(error);
    }
}
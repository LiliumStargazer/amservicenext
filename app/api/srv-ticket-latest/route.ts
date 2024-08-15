import { NextResponse } from 'next/server';
import * as Sentry from "@sentry/nextjs";
import { getTicketLatest } from "@/lib/api-srv";
import {handleError} from "@/lib/errorHandler";

export async function GET(req: Request): Promise<NextResponse> {
    try {
        const result = await getTicketLatest();
        return NextResponse.json(result);
    } catch (error) {
        Sentry.captureException(error);
        return handleError(error);
    }
}
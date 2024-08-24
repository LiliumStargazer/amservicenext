import { NextResponse } from 'next/server';
import * as Sentry from "@sentry/nextjs";
import { getTicketLatest } from "@/features/shared/server/api";
import {handleError} from "@/features/shared/client/utils/error-handler";

export async function GET(req: Request): Promise<NextResponse> {
    try {
        const result = await getTicketLatest();
        return NextResponse.json(result);
    } catch (error) {
        Sentry.captureException(error);
        return handleError(error);
    }
}
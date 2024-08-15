'use server'

import { NextResponse } from "next/server";
import Sentry from "@sentry/nextjs";
import { getEventsAlive } from "@/lib/api-srv";
import {handleError} from "@/lib/errorHandler";

export async function GET(req: Request): Promise<NextResponse> {
    try {
        const result = await getEventsAlive();
        return NextResponse.json(result);
    } catch (error) {
        Sentry.captureException(error);
        return handleError(error);
    }
}

// Path: app/api/srv-alive-events/route.ts
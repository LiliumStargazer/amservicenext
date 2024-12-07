// utils/error-handler.ts
import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

export function logErrorAndRespond(error: unknown): NextResponse {
    Sentry.captureException(error);

    if (error instanceof Error) {
        console.log('error', error.message);
        return NextResponse.json({ error: error.message });
    } else {
        console.log('error', 'An unknown error occurred');
        return NextResponse.json({ error: 'An unknown error occurred' });
    }
}

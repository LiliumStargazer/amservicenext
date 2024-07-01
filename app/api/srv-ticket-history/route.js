import { NextResponse } from 'next/server';
import * as Sentry from "@sentry/nextjs";
import { getTicketsHistory } from "@/lib/api-srv";

export async function GET() {
    try {
        const result = await getTicketsHistory();
        return new NextResponse(result);
    } catch (error) {
        Sentry.captureException(error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
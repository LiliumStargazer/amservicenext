'use server'

import {NextResponse} from "next/server";
import Sentry from "@sentry/nextjs";

import {getEventsAlive} from "@/lib/api-srv";

export async function GET() {

    try {
        const result = await getEventsAlive();
        return NextResponse.json(result);
    } catch (error) {
        Sentry.captureException(error);
        return NextResponse.json({ error: error.message })
    }
}

// Path: app/api/srv-alive-events/route.js
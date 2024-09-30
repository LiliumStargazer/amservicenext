'use server'

import { NextResponse } from "next/server";
import { getEventsAlive } from "@/features/shared/server/api";
import { logErrorAndRespond } from "@/features/shared/client/utils/error-handler";

export async function GET(): Promise<NextResponse> {
    try {
        const result = await getEventsAlive();
        return NextResponse.json(result);
    } catch (error) {
        return logErrorAndRespond(error);
    }
}

// Path: app/api/srv-alive-events/route.ts
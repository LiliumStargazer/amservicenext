'use server'

import { NextResponse } from "next/server";
import {apiRequest} from "@/app/lib/api-handle-cors";
import { logErrorAndRespond } from "@/app/lib/error-handler";
import {AliveEvent} from "@/app/types/types";

const getEventsAlive = (): Promise<AliveEvent> => apiRequest('https://alive2.amdistributori.it:8443/aliveApi.php');

export async function GET(): Promise<NextResponse> {
    try {
        const result = await getEventsAlive();
        return NextResponse.json(result);
    } catch (error) {
        return logErrorAndRespond(error);
    }
}

// Path: app/api/srv-alive-alive-events/route.ts
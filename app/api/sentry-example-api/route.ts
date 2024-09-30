import {logErrorAndRespond} from "@/features/shared/client/utils/error-handler";

export const dynamic = "force-dynamic";

// A faulty API route to test Sentry's error monitoring
import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

export function GET(req: Request): NextResponse {
    try {
        throw new Error("Sentry Example API Route Error");
    } catch (error) {
        Sentry.captureException(error);
        return logErrorAndRespond(error);
    }
}
import { NextResponse } from 'next/server';;
import { getTicketsHistory } from "@/features/shared/server/api";
import {handleError} from "@/features/shared/client/utils/error-handler";

export async function GET(req: Request): Promise<NextResponse> {
    try {
        const result = await getTicketsHistory();
        return NextResponse.json(result);
    } catch (error) {
        return handleError(error);
    }
}
'use server'

import {NextResponse} from "next/server";
import axios from "axios";
import Sentry from "@sentry/nextjs";

export async function GET() {

    try {
        const result = await fetchAliveApiTranslation();
        return NextResponse.json(result);
    } catch (error) {
        Sentry.captureException(error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

async function fetchAliveApiTranslation() {

    try {
        const response = await axios.get('https://alive2.amdistributori.it:8443/aliveApi.php');
        return response.data;
    } catch (error) {
        Sentry.captureException(error);
        return { error: error.message };
    }

}
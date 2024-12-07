'use server';

import axios from "axios";
import * as Sentry from '@sentry/nextjs';

export async function apiRequest<T>(url: string, params?: Record<string, T>): Promise<T> {
    try {
        const response  = await axios.get(url, { params });
        return response.data;
    } catch (error) {
        Sentry.captureException(error);
        if (axios.isAxiosError(error) && error.response) {
            console.error(error.response.data.error);
            throw error.response.data.error;
        } else {
            throw (error as Error).message;
        }
    }
}

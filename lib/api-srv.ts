'use server';

import axios, { AxiosError, AxiosResponse } from "axios";
import * as Sentry from '@sentry/nextjs';

interface ApiResponse<T> {
    data: T;
}

async function apiRequest<T>(url: string, params?: Record<string, any>): Promise<T> {
    try {
        const response: AxiosResponse<ApiResponse<T>> = await axios.get(url, { params });
        return response.data.data;
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

export const getEventsAlive = (): Promise<any> => apiRequest('https://alive2.amdistributori.it:8443/aliveApi.php');
export const getTicketsHistory = (): Promise<string> => apiRequest('http://staging.gruppo-am.com/analisi_interventi_storico.csv', { responseType: 'text' });
export const getTicketLatest = (): Promise<string> => apiRequest('http://staging.gruppo-am.com/analisi_interventi.csv', { responseType: 'text' });
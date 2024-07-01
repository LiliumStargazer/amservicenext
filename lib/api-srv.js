'use server';

import axios from "axios";
import * as Sentry from '@sentry/nextjs';

async function apiRequest(url, params) {
    try {
        const response = await axios.get(url, params );
        return response.data;
    } catch (error) {
        Sentry.captureException(error);
        if (error.response) {
            console.error(error.response.data.error);
            throw error.response.data.error;
        } else {
            throw error.message;
        }
    }
}

export const getEventsAlive = () => apiRequest('https://alive2.amdistributori.it:8443/aliveApi.php');
export const getTicketsHistory = () => apiRequest('http://staging.gruppo-am.com/analisi_interventi_storico.csv', { responseType: 'text' });
export const getTicketLatest = () => apiRequest('http://staging.gruppo-am.com/analisi_interventi.csv', { responseType: 'text' });

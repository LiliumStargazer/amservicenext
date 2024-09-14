import axios, { AxiosError } from "axios";
import * as Sentry from '@sentry/nextjs';

async function apiRequest<T>(url: string, params: Record<string, any>): Promise<T> {
    try {
        const response = await axios.get<T>(url, { params });
        return response.data;
    } catch (error) {
        Sentry.captureException(error);
        // Check if error is an AxiosError
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;

            if (axiosError.response) {
                // Handle specific HTTP status codes
                switch (axiosError.response.status) {
                    case 400:
                        console.error('Bad Request (400): The request was invalid.');
                        break;
                    case 401:
                        console.error('Unauthorized (401): Authentication is required.');
                        break;
                    case 403:
                        console.error('Forbidden (403): You do not have permission.');
                        break;
                    case 404:
                        console.error('Not Found (404): The requested resource was not found.');
                        break;
                    case 500:
                        console.error('Internal Server Error (500): The server encountered an error.');
                        break;
                    case 504:
                        console.error('Gateway Timeout (504): The server did not receive a timely response.');
                        break;
                    default:
                        console.error(`Unexpected HTTP error: ${axiosError.response.status}`);
                        break;
                }
            } else if (axiosError.request) {
                // No response was received
                console.error('No response received from the server.');
            } else {
                // Other errors
                console.error('Error setting up the request:', axiosError.message);
            }
        } else {
            // Non-Axios errors
            console.error('Unexpected error:', (error as Error).message);
        }

        throw new Error('An error occurred while making the API request.'); // Or rethrow with specific message
    }
}

interface SerialValidationResult {
    error?: string;
    isValid: boolean;
}

interface BackupListResponse {
    error?: string; // Optional error property
    data?: any[]; // Data property for successful response
}

export const getSerialValidationServer = (serial: string): Promise<SerialValidationResult> =>
    apiRequest<SerialValidationResult>(`/api/backups/serial-numbers/exists`, { serial });
export const getBackupList = (serial: string): Promise<BackupListResponse> =>
    apiRequest<BackupListResponse>(`/api/backups/lists`, { serial });
export const getBackupDataFromServer = (serial: string, backupSelected: string) => apiRequest<any>(`/api/backups/data`, { serial, backup: backupSelected });
export const readFrigoTable = (serial: string, backupSelected: string) => apiRequest<any>(`/api/backups/fridge/data`, { serial, backup: backupSelected });
export const getParam = (serial: string, backupSelected: string, id: string) => apiRequest<any>(`/api/backups/params/data`, { serial, backup: backupSelected, id });
export const getParamIds = (serial: string, backupSelected: string) => apiRequest<any>(`/api/backups/params/ids`, {serial, backup: backupSelected});
export const getLisTransaction = (serial: string, backupSelected: string) => apiRequest<any>(`/api/backups/fingers-transactions`, { serial, backup: backupSelected });

export const getEventsAliveViaSrv = () => apiRequest<any[]>(`/api/events/alive`, {});
export const getTicketHistoryViaSrv = () => apiRequest<any[]>(`/api/srv-ticket-history`, {});
export const getTicketLatestViaSrv = () => apiRequest<any[]>(`/api/srv-ticket-latest`, {});

// import axios, { AxiosError } from "axios";
// import * as Sentry from '@sentry/nextjs';
//
// async function apiRequest<T>(url: string, params: Record<string, any>): Promise<T> {
//     try {
//
//         const response = await axios.get<T>(url, { params });
//         return response.data;
//     } catch (error) {
//         Sentry.captureException(error);
//         // Check if error is an AxiosError
//         if (axios.isAxiosError(error)) {
//             const axiosError = error as AxiosError;
//
//             if (axiosError.response) {
//                 // Handle specific HTTP status codes
//                 switch (axiosError.response.status) {
//                     case 400:
//                         console.error('Bad Request (400): The request was invalid.');
//                         break;
//                     case 401:
//                         console.error('Unauthorized (401): Authentication is required.');
//                         break;
//                     case 403:
//                         console.error('Forbidden (403): You do not have permission.');
//                         break;
//                     case 404:
//                         console.error('Not Found (404): The requested resource was not found.');
//                         break;
//                     case 500:
//                         console.error('Internal Server Error (500): The server encountered an error.');
//                         break;
//                     case 504:
//                         console.error('Gateway Timeout (504): The server did not receive a timely response.');
//                         break;
//                     default:
//                         console.error(`Unexpected HTTP error: ${axiosError.response.status}`);
//                         break;
//                 }
//             } else if (axiosError.request) {
//                 // No response was received
//                 console.error('No response received from the server.');
//             } else {
//                 // Other errors
//                 console.error('Error setting up the request:', axiosError.message);
//             }
//         } else {
//             // Non-Axios errors
//             console.error('Unexpected error:', (error as Error).message);
//         }
//
//         throw new Error('An error occurred while making the API request.'); // Or rethrow with specific message
//     }
// }
//
// // interface SerialValidationResult {
// //     error?: string;
// //     isValid: boolean;
// // }
// //
// // interface BackupListResponse {
// //     error?: string; // Optional error property
// //     data?: any[]; // Data property for successful response
// // }
//
// export const apiValidateSerialOFromServer = (serial: string) =>
//     apiRequest<any>(`/api/serial-validator`, { serial });
// export const apiGetLogEventsFromServer = (serial: string, backupSelected: string) =>
//     apiRequest<any>(`/api/log-events`, { serial, backup: backupSelected });
// export const getBackupList = (serial: string) =>
//     apiRequest<any>(`/api/backups-list`, { serial });
// export const apiFridgeEvents = (serial: string, backupSelected: string) =>
//     apiRequest<any>(`/api/fridge-events`, { serial, backup: backupSelected });
// export const apiGetParams = (serial: string, backupSelected: string, id: string) =>
//     apiRequest<any>(`/api/params-data`, { serial, backup: backupSelected, id });
// export const apiGetParamsIds = (serial: string, backupSelected: string) =>
//     apiRequest<any>(`/api/params-ids`, {serial, backup: backupSelected});
// export const apiGetLisTransaction = (serial: string, backupSelected: string) =>
//     apiRequest<any>(`/api/lis-transactions`, { serial, backup: backupSelected });
// export const apiGetFingersTransactions = (serial: string, backupSelected: string) =>
//     apiRequest<any>(`/api/fingers-transactions`, { serial, backup: backupSelected });
// export const apiGetEventsFromLatestBackup = (serial: string, backupSelected: string) =>
//     apiRequest<any>(`/api/log-latest-backup-events`, { serial, backup: backupSelected });
// export const apiGetEventsByDate = (serial: string, backupSelected: string, currentDate: string) =>
//     apiRequest<any>(`/api/log-events-by-date`, { serial, backup: backupSelected, date: currentDate });
// export const apiGetSelectedEvents = (serial: string, backupSelected: string, event: string) =>
//     apiRequest<any>(`/api/log-events-selector`, { serial, backup: backupSelected, event });
// export const apiGetSoftwareType = (serial: string, backupSelected: string) =>
//     apiRequest<any>(`/api/software-type`, { serial, backup: backupSelected });
// export const apiGetAliveEventsCorsHandling = () =>
//     apiRequest<any[]>(`/api/alive-events-cors`, {});
// export const apiGetTicketHistoryCorsHandling = () =>
//     apiRequest<any[]>(`/api/srv-ticket-history`, {});
// export const apiGetTicketLatestCorsHandling = () =>
//     apiRequest<any[]>(`/api/srv-ticket-latest-cors`, {});
//
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import * as Sentry from '@sentry/nextjs';
//
// async function apiRequest<T>(url: string, params: Record<string, any>): Promise<T> {
//     try {
//         const queryString = new URLSearchParams(params).toString();
//         const response = await fetch(`${url}?${queryString}`);
//
//         if (!response.ok) {
//             switch (response.status) {
//                 case 400:
//                     console.error('Bad Request (400): The request was invalid.');
//                     break;
//                 case 401:
//                     console.error('Unauthorized (401): Authentication is required.');
//                     break;
//                 case 403:
//                     console.error('Forbidden (403): You do not have permission.');
//                     break;
//                 case 404:
//                     console.error('Not Found (404): The requested resource was not found.');
//                     break;
//                 case 500:
//                     console.error('Internal Server Error (500): The server encountered an error.');
//                     break;
//                 case 504:
//                     console.error('Gateway Timeout (504): The server did not receive a timely response.');
//                     break;
//                 default:
//                     console.error(`Unexpected HTTP error: ${response.status}`);
//                     break;
//             }
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//
//         return await response.json();
//     } catch (error) {
//         Sentry.captureException(error);
//         console.error('Unexpected error:', (error as Error).message);
//         throw new Error('An error occurred while making the API request.');
//     }
// }
//
// // Custom hooks using React Query
// export const useValidateSerial = (serial: string) => {
//     return useQuery({
//         queryKey: ['validateSerial', serial],
//         queryFn: () => apiRequest<any>('/api/serial-validator', { serial })
//     });
// };
//
// export const useLogEvents = (serial: string, backupSelected: string) => {
//     return useQuery({
//         queryKey: ['logEvents', serial, backupSelected],
//         queryFn: () => apiRequest<any>('/api/log-events', { serial, backup: backupSelected })
//     });
// };
//
// export const useBackupList = (serial: string) => {
//     return useQuery({
//         queryKey: ['backupList', serial],
//         queryFn: () => apiRequest<any>('/api/backups-list', { serial })
//     });
// };
//
// export const useFridgeEvents = (serial: string, backupSelected: string) => {
//     return useQuery({
//         queryKey: ['fridgeEvents', serial, backupSelected],
//         queryFn: () => apiRequest<any>('/api/fridge-events', { serial, backup: backupSelected })
//     });
// };
//
// export const useParams = (serial: string, backupSelected: string, id: string) => {
//     return useQuery({
//         queryKey: ['params', serial, backupSelected, id],
//         queryFn: () => apiRequest<any>('/api/params-data', { serial, backup: backupSelected, id })
//     });
// };
//
// export const useParamsIds = (serial: string, backupSelected: string) => {
//     return useQuery({
//         queryKey: ['paramsIds', serial, backupSelected],
//         queryFn: () => apiRequest<any>('/api/params-ids', { serial, backup: backupSelected })
//     });
// };
//
// export const useLisTransaction = (serial: string, backupSelected: string) => {
//     return useQuery({
//         queryKey: ['lisTransaction', serial, backupSelected],
//         queryFn: () => apiRequest<any>('/api/lis-transactions', { serial, backup: backupSelected })
//     });
// };
//
// export const useFingersTransactions = (serial: string, backupSelected: string) => {
//     return useQuery({
//         queryKey: ['fingersTransactions', serial, backupSelected],
//         queryFn: () => apiRequest<any>('/api/fingers-transactions', { serial, backup: backupSelected })
//     });
// };
//
// export const useEventsFromLatestBackup = (serial: string, backupSelected: string) => {
//     return useQuery({
//         queryKey: ['eventsFromLatestBackup', serial, backupSelected],
//         queryFn: () => apiRequest<any>('/api/log-latest-backup-events', { serial, backup: backupSelected })
//     });
// };
//
// export const useEventsByDate = (serial: string, backupSelected: string, currentDate: string) => {
//     return useQuery({
//         queryKey: ['eventsByDate', serial, backupSelected, currentDate],
//         queryFn: () => apiRequest<any>('/api/log-events-by-date', { serial, backup: backupSelected, date: currentDate })
//     });
// };
//
// export const useSelectedEvents = (serial: string, backupSelected: string, event: string) => {
//     return useQuery({
//         queryKey: ['selectedEvents', serial, backupSelected, event],
//         queryFn: () => apiRequest<any>('/api/log-events-selector', { serial, backup: backupSelected, event })
//     });
// };
//
// export const useSoftwareType = (serial: string, backupSelected: string) => {
//     return useQuery({
//         queryKey: ['softwareType', serial, backupSelected],
//         queryFn: () => apiRequest<any>('/api/software-type', { serial, backup: backupSelected })
//     });
// };
//
// export const useAliveEventsCorsHandling = () => {
//     return useQuery({
//         queryKey: ['aliveEventsCorsHandling'],
//         queryFn: () => apiRequest<any[]>('/api/alive-events-cors', {})
//     });
// };
//
// export const useTicketHistoryCorsHandling = () => {
//     return useQuery({
//         queryKey: ['ticketHistoryCorsHandling'],
//         queryFn: () => apiRequest<any[]>('/api/srv-ticket-history', {})
//     });
// };
//
// export const useTicketLatestCorsHandling = () => {
//     return useQuery({
//         queryKey: ['ticketLatestCorsHandling'],
//         queryFn: () => apiRequest<any[]>('/api/srv-ticket-latest-cors', {})
//     });
// };


import * as Sentry from '@sentry/nextjs';

async function apiRequest<T>(url: string, params: Record<string, any>): Promise<T> {
    try {
        const queryString = new URLSearchParams(params).toString();
        const response = await fetch(`${url}?${queryString}`);

        if (!response.ok) {
            switch (response.status) {
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
                    console.error(`Unexpected HTTP error: ${response.status}`);
                    break;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        Sentry.captureException(error);
        console.error('Unexpected error:', (error as Error).message);
        throw new Error('An error occurred while making the API request.');
    }
}

export const apiValidateSerialOFromServer = (serial: string) =>
    apiRequest<any>(`/api/serial-validator`, { serial });
export const apiGetLogEventsFromServer = (serial: string, backupSelected: string) =>
    apiRequest<any>(`/api/log-events`, { serial, backup: backupSelected });
export const getBackupList = (serial: string) =>
    apiRequest<any>(`/api/backups-list`, { serial });
export const apiFridgeEvents = (serial: string, backupSelected: string) =>
    apiRequest<any>(`/api/fridge-events`, { serial, backup: backupSelected });
export const apiGetParams = (serial: string, backupSelected: string, id: string) =>
    apiRequest<any>(`/api/params-data`, { serial, backup: backupSelected, id });
export const apiGetParamsIds = (serial: string, backupSelected: string) =>
    apiRequest<any>(`/api/params-ids`, { serial, backup: backupSelected });
export const apiGetLisTransaction = (serial: string, backupSelected: string) =>
    apiRequest<any>(`/api/lis-transactions`, { serial, backup: backupSelected });
export const apiGetFingersTransactions = (serial: string, backupSelected: string) =>
    apiRequest<any>(`/api/fingers-transactions`, { serial, backup: backupSelected });
export const apiGetEventsFromLatestBackup = (serial: string, backupSelected: string) =>
    apiRequest<any>(`/api/log-latest-backup-events`, { serial, backup: backupSelected });
export const apiGetEventsByDate = (serial: string, backupSelected: string, currentDate: string) =>
    apiRequest<any>(`/api/log-events-by-date`, { serial, backup: backupSelected, date: currentDate });
export const apiGetSelectedEvents = (serial: string, backupSelected: string, event: string) =>
    apiRequest<any>(`/api/log-events-selector`, { serial, backup: backupSelected, event });
export const apiGetSoftwareType = (serial: string, backupSelected: string) =>
    apiRequest<any>(`/api/software-type`, { serial, backup: backupSelected });
export const apiGetAliveEventsCorsHandling = () =>
    apiRequest<any[]>(`/api/alive-events-cors`, {});
export const apiGetTicketHistoryCorsHandling = () =>
    apiRequest<any[]>(`/api/srv-ticket-history`, {});
export const apiGetTicketLatestCorsHandling = () =>
    apiRequest<any[]>(`/api/srv-ticket-latest-cors`, {});

'use client'

const apiRequest = async <GenericResponseType>(endpoint: string, payload: Record<string, string | number | boolean | null>): Promise<GenericResponseType> => {

    const queryParams = new URLSearchParams(payload as Record<string, string>).toString();
    const url = endpoint + `?${queryParams}`
    console.log('apiRequest', url, payload);
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API request error:', error);
        throw error;
    }
};

export const apiGetListinoFull = (serial: string): Promise<unknown> =>
    apiRequest(`/get-listino-full`, { serial });

export const apiGetBackupList = (serial: string): Promise<unknown> =>
    apiRequest(`/backups-list`, { serial });

export const apiDownloadBackup = (serial: string, backupSelected: string): Promise<unknown> =>
    apiRequest(`/download-backup`, { serial, backup: backupSelected });

export const apiFridgeEvents = (serial: string, backupSelected: string): Promise<unknown> =>
    apiRequest(`/fridge-events`, { serial, backup: backupSelected });

export const apiGetParams = (serial: string, backupSelected: string, id: string): Promise<unknown> =>
    apiRequest(`/params-data`, { serial, backup: backupSelected, id });

export const apiGetParamsIds = (serial: string, backupSelected: string): Promise<unknown> =>
    apiRequest(`/params-ids`, { serial, backup: backupSelected });

export const apiGetLisTransaction = (serial: string, backupSelected: string): Promise<unknown> =>
    apiRequest(`/lis-transactions`, { serial, backup: backupSelected });

export const apiGetFingersTransactions = (serial: string, backupSelected: string): Promise<unknown> =>
    apiRequest(`/fingers-transactions`, { serial, backup: backupSelected });

export const apiGetEventsByDate = (serial: string, backupSelected: string, currentDate: string | null): Promise<unknown> =>
    apiRequest(`/events-by-date`, { serial, backup: backupSelected, date: currentDate });

export const apiGetSelectedEvents = (serial: string, backupSelected: string, event: string ): Promise<unknown> =>
    apiRequest(`/events-filtered`, { serial, backup: backupSelected, event });

export const apiGetSoftwareType = (serial: string, backupSelected: string): Promise<unknown> =>
    apiRequest(`/software-type`, { serial, backup: backupSelected });

export const apiGetAliveEventsCorsHandling = (): Promise<unknown> =>
    apiRequest(`/alive-events`, {});

export const apiGetTicketHistoryCorsHandling = (): Promise<unknown> =>
    apiRequest(`/srv-ticket-history`, {});

export const apiGetTicketLatestCorsHandling = (): Promise<unknown> =>
    apiRequest(`/srv-ticket-latest`, {});
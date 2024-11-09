const apiRequest = async (endpoint: string, payload: any): Promise<any> => {

    const queryParams = new URLSearchParams(payload).toString();
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

export const apiValidateSerialOFromServer = (serial: string): Promise<any> =>
    apiRequest(`/api/serial-validator`, { serial });

export const apiGetLogEventsFromServer = (serial: string, backupSelected: string): Promise<any> =>
    apiRequest(`/api/log-events`, { serial, backup: backupSelected });

export const apiGetBackupList = (serial: string): Promise<any> =>
    apiRequest(`/api/backups-list`, { serial });

export const apiFridgeEvents = (serial: string, backupSelected: string): Promise<any> =>
    apiRequest(`/api/fridge-events`, { serial, backup: backupSelected });

export const apiGetParams = (serial: string, backupSelected: string, id: string): Promise<any> =>
    apiRequest(`/api/params-data`, { serial, backup: backupSelected, id });

export const apiGetParamsIds = (serial: string, backupSelected: string): Promise<any> =>
    apiRequest(`/api/params-ids`, { serial, backup: backupSelected });

export const apiGetLisTransaction = (serial: string, backupSelected: string): Promise<any> =>
    apiRequest(`/api/lis-transactions`, { serial, backup: backupSelected });

export const apiGetFingersTransactions = (serial: string, backupSelected: string): Promise<any> =>
    apiRequest(`/api/fingers-transactions`, { serial, backup: backupSelected });

export const apiGetEventsFromLatestBackup = (serial: string, backupSelected: string): Promise<any> =>
    apiRequest(`/api/log-latest-backup-events`, { serial, backup: backupSelected });

export const apiGetEventsByDate = (serial: string, backupSelected: string, currentDate: string): Promise<any> =>
    apiRequest(`/api/log-events-by-date`, { serial, backup: backupSelected, date: currentDate });

export const apiGetSelectedEvents = (serial: string, backupSelected: string, event: string, softwareType: string): Promise<any> =>
    apiRequest(`/api/log-events-selector`, { serial, backup: backupSelected, event , softwareType});

export const apiGetSoftwareType = (serial: string, backupSelected: string): Promise<any> =>
    apiRequest(`/api/software-type`, { serial, backup: backupSelected });

export const apiGetAliveEventsCorsHandling = (): Promise<any> =>
    apiRequest(`/api/alive-events-cors`, {});

export const apiGetTicketHistoryCorsHandling = (): Promise<any> =>
    apiRequest(`/api/srv-ticket-history`, {});

export const apiGetTicketLatestCorsHandling = (): Promise<any> =>
    apiRequest(`/api/srv-ticket-latest-cors`, {});
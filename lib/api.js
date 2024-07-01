'use client';

import axios from "axios";
import * as Sentry from '@sentry/nextjs';
//const API_BASE_URL = "http://amservice.ampiovani.locale/backend";
//const API_BASE_URL = "http://192.168.0.29:/backend";
//const API_BASE_URL = "http://localhost:3000";

async function apiRequest(url, params) {
    try {
        const response = await axios.get(url, { params });
        return response.data;
    } catch (error) {
        Sentry.captureException(error);
        console.log('Error while getting data from api resources:', error.message);
        throw error.message;
    }
}

export const getSerialValidationServer = (serial) => apiRequest(`/api/srv-serial`, { serial });
export const getBackupList = (serial) => apiRequest(`/api/srv-backups-lists`, { serial });
export const downloadExtractAndReadBackup = (serial, backupSelected) => apiRequest(`/api/srv-backup-data`, { serial, backup: backupSelected });
export const readFrigoTable = (serial, backupSelected) => apiRequest(`/api/srv-fridge-data`, { serial, backup: backupSelected });
export const getParam = (serial, backupSelected) => apiRequest(`/api/srv-param`, { serial, backup: backupSelected });

//la chiamata verso alive viene fatta dal server per evitare errori cors
export const getEventsAliveViaSrv = () => apiRequest('/api/srv-alive-events');
export const getTicketHistoryViaSrv = () => apiRequest('/api/srv-ticket-history');
export const getTicketLatestViaSrv = () => apiRequest('/api/srv-ticket-latest');
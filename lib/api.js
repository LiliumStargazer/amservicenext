'use client';

import axios from "axios";
const Sentry = require('@sentry/nextjs');
//const API_BASE_URL = "http://amservice.ampiovani.locale/backend";
//const API_BASE_URL = "http://192.168.0.29:/backend";
//const API_BASE_URL = "http://localhost:3000";

async function apiRequest(url, params) {
    try {
        const response = await axios.get(url, { params });
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

export const getSerialNumberOnSftp = (serial) => apiRequest(`/api/srv-serial`, { serial });
export const getBackupList = (serial) => apiRequest(`/api/srv-backups-lists`, { serial });
export const getBackupReadOnServer = (serial, backupSelected) => apiRequest(`/api/srv-backup-data`, { serial, backup: backupSelected });
export const getFrigoBackup = (serial, backupSelected) => apiRequest(`/api/srv-fridge-data`, { serial, backup: backupSelected });
export const getParam = (serial, backupSelected) => apiRequest(`/api/srv-param`, { serial, backup: backupSelected });
//la chiamata verso alive viene fatta dal server per evitare errori cors
export const getEventTranslationOnAlive = () => apiRequest('/api/srv-alive-events');
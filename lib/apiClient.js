'use client';
import axios from "axios";

//const API_BASE_URL = "http://amservice.ampiovani.locale/backend";
//const API_BASE_URL = "http://192.168.0.29:/backend";
const API_BASE_URL = "http://localhost:3000";
function handleError(error) {
    if (error.response) {
        console.log(error.response.data.error);
        return error.response.data.error;
    } else {
        return error.message;
    }
}

async function isSerialNumberOnSftp(serialTyped) {
    try {
        const response = await axios.get(`/api/validateSerialNumberOnSftp`, {
            params: {serial: serialTyped},
        });
        return response.data;
    } catch (error) {
        throw handleError(error);
    }
}

async function getBackupList(serialTyped) {
    try {
        const response = await axios.get(`/api/fetchBackupsList`, {
            params: {serial: serialTyped}
        });
        return response.data;
    } catch (error) {
        throw handleError(error);
    }
}

async function getBackupReadedOnServer(serialTyped, backupSelected) {
    try {
        const response = await axios.get(`/api/fetchBackupData`, {
            params: {serial: serialTyped, backup: backupSelected,},
        });
        return response.data;
    } catch (error) {
        console.log(error.response.data);
        throw handleError(error);
    }
}

async function getFrigoBackup(serialTyped, backupSelected) {
    try {
        const response = await axios.get(`/api/fetchBackupFridgeData`, {
            params: {serial: serialTyped, backup: backupSelected,}
        });
        return response.data;
    } catch (error) {
        throw handleError(error);
    }
}

async function getParamApi(serialTyped, backupSelected) {
    try {
        const response = await axios.get(`/api/fetchParam`, {
            params: {serial: serialTyped, backup: backupSelected,}
        });
        return response.data;
    } catch (error) {
        throw handleError(error);
    }
}

export { isSerialNumberOnSftp, getBackupList, getFrigoBackup, getParamApi, getBackupReadedOnServer};

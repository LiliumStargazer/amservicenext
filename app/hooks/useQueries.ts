import useSWR from "swr";
import { fetcher } from "../lib/axiosClient";


export function useBackupList(serial: string) {
    const { data, error, isLoading } = useSWR(
        serial.length === 5 ? ['/backups-list', { serial }] : null,
        fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false }
    );
    return { data, error, isLoading };
}

export function useSourceBackupList(sourceSerial: string) {
    const { data, error, isLoading } = useSWR(
        sourceSerial.length === 5 ? ['/backups-list', { serial: sourceSerial }] : null,
        fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false }
    );
    return { data, error, isLoading };
}

export function useGetListinoFull(serial: string) {
    const { data, error, isLoading } = useSWR(
        serial.length === 5 ? ['/get-listino-full', { serial }] : null,
        fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false }
    );
    return { data, error, isLoading };
}

export function useGetBackupList(serial: string) {
    const { data, error, isLoading } = useSWR(
        serial.length === 5 ? ['/backups-list', { serial }] : null,
        fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false }
    );
    return { data, error, isLoading };
}

export function useDownloadBackup(serial: string, backupSelected: string) {
    const { data, error, isLoading } = useSWR(
        serial.length === 5 && backupSelected ? ['/download-backup', { serial, backup: backupSelected }] : null,
        fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false }
    );
    return { data, error, isLoading };
}

export function useFridgeEvents(serial: string, backupSelected: string) {
    const { data, error, isLoading } = useSWR(
        serial.length === 5 && backupSelected ? ['/fridge-events', { serial, backup: backupSelected }] : null,
        fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false }
    );
    return { data, error, isLoading };
}

export function useGetParams(serial: string, backupSelected: string, id: string) {
    const { data, error, isLoading } = useSWR(
        serial.length === 5 && backupSelected && id ? ['/params-data', { serial, backup: backupSelected, id }] : null,
        fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false }
    );
    return { data, error, isLoading };
}

export function useGetParamsIds(serial: string, backupSelected: string) {
    const { data, error, isLoading } = useSWR(
        serial.length === 5 && backupSelected ? ['/params-ids', { serial, backup: backupSelected }] : null,
        fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false }
    );
    return { data, error, isLoading };
}

export function useGetLisTransaction(serial: string, backupSelected: string) {
    const { data, error, isLoading } = useSWR(
        serial.length === 5 && backupSelected ? ['/lis-transactions', { serial, backup: backupSelected }] : null,
        fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false }
    );
    return { data, error, isLoading };
}

export function useGetFingersTransactions(serial: string, backupSelected: string) {
    const { data, error, isLoading } = useSWR(
        serial.length === 5 && backupSelected ? ['/fingers-transactions', { serial, backup: backupSelected }] : null,
        fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false }
    );
    return { data, error, isLoading };
}

export function useGetEventsByDate(serial: string, backupSelected: string, currentDate: string | null) {
    const { data, error, isLoading } = useSWR(
        serial.length === 5 && backupSelected && currentDate ? ['/events-by-date', { serial, backup: backupSelected, date: currentDate }] : null,
        fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false }
    );
    return { data, error, isLoading };
}

export function useGetSelectedEvents(serial: string, backupSelected: string, event: string) {
    const { data, error, isLoading } = useSWR(
        serial.length === 5 && backupSelected && event ? ['/events-filtered', { serial, backup: backupSelected, event }] : null,
        fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false }
    );
    return { data, error, isLoading };
}

export function useGetSoftwareType(serial: string, backupSelected: string) {
    const { data, error, isLoading } = useSWR(
        serial.length === 5 && backupSelected ? ['/software-type', { serial, backup: backupSelected }] : null,
        fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false }
    );
    return { data, error, isLoading };
}

export function useGetAliveEventsCorsHandling() {
    const { data, error, isLoading } = useSWR(
        ['/alive-events', {}],
        fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false }
    );
    return { data, error, isLoading };
}

export function useGetTicketHistoryCorsHandling() {
    const { data, error, isLoading } = useSWR(
        ['/srv-ticket-history', {}],
        fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false }
    );
    return { data, error, isLoading };
}

export function useGetTicketLatestCorsHandling() {
    const { data, error, isLoading } = useSWR(
        ['/srv-ticket-latest', {}],
        fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false }
    );
    return { data, error, isLoading };
}

export function useGetJsonParam(serial: string) {
    const { data, error, isLoading } = useSWR(
        serial.length === 5 ? ['/json-config', { serial }] : null,
        fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false }
    );
    return { data, error, isLoading };
}

export function useGetVteData(serial: string) {
    const { data, error, isLoading } = useSWR(
        serial.length === 5 ? ['/vte-data', { serial }] : null,
        fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false }
    );
    return { data, error, isLoading };
}

export function useRecoverDB(serial: string, backupSelected: string) {
    const { data, error, isLoading } = useSWR(
        serial.length === 5 && backupSelected ? ['/recover-db', { serial, backup: backupSelected }] : null,
        fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false }
    );
    return { data, error, isLoading };
}
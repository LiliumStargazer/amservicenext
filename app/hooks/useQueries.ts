import useSWR from "swr";
import { fetcher } from "@/app/lib/axiosClient";

export function useBackupListQuery(serial: string) {
    const { data, error, isLoading } = useSWR(
        serial.length === 5 ? ['/backups-list', { serial }] : null,
        fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false }
    );
    return { data, error, isLoading };
}

export function useSourceBackupListQuery(sourceSerial: string) {
    const { data, error, isLoading } = useSWR(
        sourceSerial.length === 5 ? ['/backups-list', { serial: sourceSerial }] : null,
        fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false }
    );
    return { data, error, isLoading };
}

export function useGetListinoFullQuery(serial: string) {
    const { data, error, isLoading } = useSWR(
        serial.length === 5 ? ['/get-listino-full', { serial }] : null,
        fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false }
    );
    return { data, error, isLoading };
}

export function useGetBackupListQuery(serial: string) {
    const { data, error, isLoading } = useSWR(
        serial.length === 5 ? ['/backups-list', { serial }] : null,
        fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false }
    );
    return { data, error, isLoading };
}

export function useDownloadBackupQuery(serial: string, backupSelected: string) {
    const { data, error, isLoading } = useSWR(
        serial.length === 5 && backupSelected ? ['/download-backup', { serial, backup: backupSelected }] : null,
        fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false }
    );
    return { data, error, isLoading };
}

export function useFridgeEventsQuery(serial: string, backup: string) {
    const { data, error, isLoading } = useSWR(
        serial.length === 5 && backup ? ['/fridge-events', { serial, backup }] : null,
        fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false }
    );
    return { data, error, isLoading };
}

export function useGetParamsQuery(serial: string, backupSelected: string, id: string) {
    const { data, error, isLoading } = useSWR(
        serial.length === 5 && backupSelected && id ? ['/params-data', { serial, backup: backupSelected, id }] : null,
        fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false }
    );
    return { data, error, isLoading };
}

export function useGetParamsIdsQuery(serial: string, backupSelected: string) {
    const { data, error, isLoading } = useSWR(
        serial.length === 5 && backupSelected ? ['/params-ids', { serial, backup: backupSelected }] : null,
        fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false }
    );
    return { data, error, isLoading };
}

export function useGetLisTransactionQuery(serial: string, backupSelected: string) {
    const { data, error, isLoading } = useSWR(
        serial.length === 5 && backupSelected ? ['/lis-transactions', { serial, backup: backupSelected }] : null,
        fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false }
    );
    return { data, error, isLoading };
}

export function useGetFingersTransactionsQuery(serial: string, backupSelected: string) {
    const { data, error, isLoading } = useSWR(
        serial.length === 5 && backupSelected ? ['/fingers-transactions', { serial, backup: backupSelected }] : null,
        fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false }
    );
    return { data, error, isLoading };
}

export function useGetEventsByDateQuery(serial: string, backupSelected: string, currentDate: string | null) {
    const { data, error, isLoading } = useSWR(
        serial.length === 5 && backupSelected && currentDate ? ['/events-by-date', { serial, backup: backupSelected, date: currentDate }] : null,
        fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false }
    );
    return { data, error, isLoading };
}

export function useGetFilteredEventsQuery(serial: string, backup: string, isBackupReady: boolean, event: string) {
    const { data, error, isLoading } = useSWR(
        isBackupReady && event.length > 0 ? ['/events-filtered', { serial, backup, event }] : null,
        fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false }
    );
    return { data, error, isLoading };
}

export function useGetSoftwareTypeQuery(serial: string, backupSelected: string) {
    const { data, error, isLoading } = useSWR(
        serial.length === 5 && backupSelected ? ['/software-type', { serial, backup: backupSelected }] : null,
        fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false }
    );
    return { data, error, isLoading };
}

export function useGetAliveEventsCorsHandlingQuery() {
    const { data, error, isLoading } = useSWR(
        ['/alive-events', {}],
        fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false }
    );
    return { data, error, isLoading };
}

export function useGetTicketHistoryCorsHandlingQuery() {
    const { data, error, isLoading } = useSWR(
        ['/srv-ticket-history', {}],
        fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false }
    );
    return { data, error, isLoading };
}

export function useGetTicketLatestCorsHandlingQuery() {
    const { data, error, isLoading } = useSWR(
        ['/srv-ticket-latest', {}],
        fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false }
    );
    return { data, error, isLoading };
}

export function useGetJsonParamQuery(serial: string) {
    const { data, error, isLoading } = useSWR(
        serial.length === 5 ? ['/json-config', { serial }] : null,
        fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false }
    );
    return { data, error, isLoading };
}

export function useGetVteDataQuery(serial: string) {
    const { data, error, isLoading } = useSWR(
        serial.length === 5 ? ['/vte-data', { serial }] : null,
        fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false }
    );
    return { data, error, isLoading };
}

export function useRecoverDBQuery(serial: string, backupSelected: string) {
    const { data, error, isLoading } = useSWR(
        serial.length === 5 && backupSelected ? ['/recover-db', { serial, backup: backupSelected }] : null,
        fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false }
    );
    return { data, error, isLoading };
}

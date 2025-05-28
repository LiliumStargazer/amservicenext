import useSWRMutation from 'swr/mutation';
import { fetcher } from "@/app/lib/axiosClient";

export function useCheckIntegrityMutation() {
    const { trigger, error, data, isMutating } = useSWRMutation(
        ['/integrity-check'],
        (key, { arg }: { arg: { serial: string; backup: string } }) => fetcher([key[0], arg])
    );
    return { trigger, error, isMutating, data };
}

export function useDownloadBackupMutation() {
    const { trigger, error, data, isMutating } = useSWRMutation(
        ['/download-backup'],
        (key, { arg }: { arg: { serial: string; backup: string } }) => fetcher([key[0], arg])
    );
    return { trigger, error, data, isMutating };
}

export function useRecoverDbMutation() {
    const { trigger, error, data, isMutating } = useSWRMutation(
        ['/recover-db'],
        (key, { arg }: { arg: { serial: string; backup: string } }) => fetcher([key[0], arg])
    );
    return { trigger, error, isMutating, data};
}

export function useTransferFingerDbMutation() {
    const { trigger, error, data, isMutating } = useSWRMutation(
        ['/transfer-finger-db'],
        (key, { arg }: { arg: { sourceSerial: string; backup: string; targetSerial: string } }) => fetcher([key[0], arg])
    );
    return { trigger, error, isMutating, data };
}

// useBackupList
export function useBackupListMutation() {
    const { trigger, error, data, isMutating } = useSWRMutation(
        ['/backups-list'],
        (key, { arg }: { arg: { serial: string } }) => fetcher([key[0], arg])
    );
    return { trigger, error, isMutating, data };
}

// useSourceBackupList
export function useSourceBackupListMutation() {
    const { trigger, error, data, isMutating } = useSWRMutation(
        ['/backups-list'],
        (key, { arg }: { arg: { serial: string } }) => fetcher([key[0], arg])
    );
    return { trigger, error, isMutating, data };
}

// useGetListinoFull
export function useGetListinoFullMutation() {
    const { trigger, error, data, isMutating } = useSWRMutation(
        ['/get-listino-full'],
        (key, { arg }: { arg: { serial: string } }) => fetcher([key[0], arg])
    );
    return { trigger, error, isMutating, data };
}

// useGetBackupList
export function useGetBackupListMutation() {
    const { trigger, error, data, isMutating } = useSWRMutation(
        ['/backups-list'],
        (key, { arg }: { arg: { serial: string } }) => fetcher([key[0], arg])
    );
    return { trigger, error, isMutating, data };
}

// useDownloadBackup
export function useDownloadBackupMutationV2() {
    const { trigger, error, data, isMutating } = useSWRMutation(
        ['/download-backup'],
        (key, { arg }: { arg: { serial: string; backup: string } }) => fetcher([key[0], arg])
    );
    return { trigger, error, isMutating, data };
}

// useFridgeEvents
export function useFridgeEventsMutation() {
    const { trigger, error, data, isMutating } = useSWRMutation(
        ['/fridge-events'],
        (key, { arg }: { arg: { serial: string; backup: string } }) => fetcher([key[0], arg])
    );
    return { trigger, error, isMutating, data };
}

// useGetParams
export function useGetParamsMutation() {
    const { trigger, error, data, isMutating } = useSWRMutation(
        ['/params-data'],
        (key, { arg }: { arg: { serial: string; backup: string; id: string } }) => fetcher([key[0], arg])
    );
    return { trigger, error, isMutating, data };
}

// useGetParamsIds
export function useGetParamsIdsMutation() {
    const { trigger, error, data, isMutating } = useSWRMutation(
        ['/params-ids'],
        (key, { arg }: { arg: { serial: string; backup: string } }) => fetcher([key[0], arg])
    );
    return { trigger, error, isMutating, data };
}

// useGetLisTransaction
export function useGetLisTransactionMutation() {
    const { trigger, error, data, isMutating } = useSWRMutation(
        ['/lis-transactions'],
        (key, { arg }: { arg: { serial: string; backup: string } }) => fetcher([key[0], arg])
    );
    return { trigger, error, isMutating, data };
}

// useGetFingersTransactions
export function useGetFingersTransactionsMutation() {
    const { trigger, error, data, isMutating } = useSWRMutation(
        ['/fingers-transactions'],
        (key, { arg }: { arg: { serial: string; backup: string } }) => fetcher([key[0], arg])
    );
    return { trigger, error, isMutating, data };
}

// useGetEventsByDate
export function useGetEventsByDateMutation() {
    const { trigger, error, data, isMutating } = useSWRMutation(
        ['/events-by-date'],
        (key, { arg }: { arg: { serial: string; backup: string; date: string | null } }) => fetcher([key[0], arg])
    );
    return { trigger, error, isMutating, data };
}

// useGetSelectedEvents
export function useGetEventsFilteredMutation() {
    const { trigger, error, data, isMutating } = useSWRMutation(
        ['/events-filtered'],
        (key, { arg }: { arg: { serial: string; backup: string; event: string } }) => fetcher([key[0], arg])
    );
    return { trigger, error, isMutating, data };
}

// useGetSoftwareType
export function useGetSoftwareTypeMutation() {
    const { trigger, error, data, isMutating } = useSWRMutation(
        ['/software-type'],
        (key, { arg }: { arg: { serial: string; backup: string } }) => fetcher([key[0], arg])
    );
    return { trigger, error, isMutating, data };
}

// useGetAliveEventsCorsHandling
export function useGetAliveEventsCorsHandlingMutation() {
    const { trigger, error, data, isMutating } = useSWRMutation(
        ['/alive-events'], fetcher
    );
    return { trigger, error, isMutating, data };
}

// useGetTicketHistoryCorsHandling
export function useGetTicketHistoryCorsHandlingMutation() {
    const { trigger, error, data, isMutating } = useSWRMutation(
        ['/srv-ticket-history'], fetcher
    );
    return { trigger, error, isMutating, data };
}

// useGetTicketLatestCorsHandling
export function useGetTicketLatestCorsHandlingMutation() {
    const { trigger, error, data, isMutating } = useSWRMutation(
        ['/srv-ticket-latest'], fetcher
    );
    return { trigger, error, isMutating, data };
}

// useGetJsonParam
export function useGetJsonParamMutation() {
    const { trigger, error, data, isMutating } = useSWRMutation(
        ['/json-config'],
        (key, { arg }: { arg: { serial: string } }) => fetcher([key[0], arg])
    );
    return { trigger, error, isMutating, data };
}

// useGetVteData
export function useGetVteDataMutation() {
    const { trigger, error, data, isMutating } = useSWRMutation(
        ['/vte-data'],
        (key, { arg }: { arg: { serial: string } }) => fetcher([key[0], arg])
    );
    return { trigger, error, isMutating, data };
}

// useRecoverDB
export function useRecoverDBMutationV2() {
    const { trigger, error, data, isMutating } = useSWRMutation(
        ['/recover-db'],
        (key, { arg }: { arg: { serial: string; backup: string } }) => fetcher([key[0], arg])
    );
    return { trigger, error, isMutating, data };
}

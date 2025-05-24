import { useQuery } from '@tanstack/react-query';

import {apiDownloadBackup} from "@/app/lib/apiGET";

export const useQueryDownloadBackupTrigger = ( serial: string, backup: string) => {

    const query = useQuery({
        queryKey: ['downloadBackupTrigger', backup],
        queryFn: () => apiDownloadBackup(serial, backup),
        enabled: false,
        refetchOnWindowFocus: false,
        staleTime: 0,
    });

    return {
        ...query,
        triggerBackupDownload: () => query.refetch(), // Wrapper esplicito
    };
};

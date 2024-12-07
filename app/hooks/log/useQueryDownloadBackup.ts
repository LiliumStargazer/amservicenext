import { useQuery } from '@tanstack/react-query';

import {apiDownloadBackup} from "@/app/lib/api";

export const useQueryDownloadBackup = ( serial: string, backup: string) => {

    const { isLoading, isError, data, error , isSuccess} = useQuery({
        queryKey: ['downloadBackup', backup],
        queryFn: () => apiDownloadBackup(serial, backup),
        enabled: !!serial && !!backup,
    });

    return { isLoading, isError, data, error, isSuccess};
};

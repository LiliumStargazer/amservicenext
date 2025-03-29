import { useQuery } from '@tanstack/react-query';

import {apiDownloadBackup} from "@/app/lib/apiGET";

export const useQueryDownloadBackup = ( serial: string, backup: string, enableDownloadBackup:boolean) => {

    const { isLoading, isError, data, error , isSuccess, isFetched} = useQuery({
        queryKey: ['downloadBackup', backup],
        queryFn: () => apiDownloadBackup(serial, backup),
        enabled: enableDownloadBackup,
        refetchOnWindowFocus: false,
    });

    return { isLoading, isError, data, error, isSuccess, isFetched};
};

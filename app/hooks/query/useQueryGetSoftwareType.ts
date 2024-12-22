import { useQuery } from '@tanstack/react-query';
import {apiGetSoftwareType} from "@/app/lib/api";

export const useQueryGetSoftwareType = (serial: string, backup: string , isBackupReady: boolean) => {

    const { isLoading, isError, data, error, isSuccess} = useQuery({
        queryKey: ['softwareType'],
        queryFn: () => apiGetSoftwareType(serial, backup),
        enabled: !!serial && !!backup && isBackupReady,
        refetchOnWindowFocus: false
    });

    return { isLoading, isError, data, error, isSuccess};
};

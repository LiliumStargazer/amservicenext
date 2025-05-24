import { useQuery } from '@tanstack/react-query';
import {apiGetSoftwareType} from "@/app/lib/apiGET";

export const useQueryGetSoftwareType = (serial: string, backup: string , isGetSoftwareEnabled: boolean) => {

    const { isLoading, isError, data, error, isSuccess, isFetched} = useQuery({
        queryKey: ['softwareType'],
        queryFn: () => apiGetSoftwareType(serial, backup),
        enabled: isGetSoftwareEnabled,
        refetchOnWindowFocus: false,
    });

    return { isLoading, isError, data, error, isSuccess,isFetched};
};

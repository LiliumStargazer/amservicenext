import { useQuery } from '@tanstack/react-query';

import {apiGetJsonParam} from "@/app/lib/apiGET";

export const useQueryGetJsonParam = ( serial: string, isBackupReady: boolean) => {

    const { isLoading, isError, data, error , isSuccess} = useQuery({
        queryKey: ['getJsonParam'],
        queryFn: () => apiGetJsonParam(serial),
        enabled: !!serial && isBackupReady,
        refetchOnWindowFocus: false,
    });

    return { isLoading, isError, data, error, isSuccess};
};

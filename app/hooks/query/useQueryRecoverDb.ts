import { useQuery } from '@tanstack/react-query';

import { apiRecoverDb} from "@/app/lib/api";

export const useQueryRecoverDb = (
    serial: string,
    backup: string,
    port:string,
    request:boolean
) => {
    const { isLoading, isError, data, error , isSuccess} = useQuery({
        queryKey: ['recoverDb', serial, backup, port, request],
        queryFn: () => apiRecoverDb(serial, backup, port),
        //enabled: !!serial && !!backup && !!port && request,
        enabled: request,
        refetchOnWindowFocus: false
    });

    return { isLoading, isError, data, error, isSuccess};
};

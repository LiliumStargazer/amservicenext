import { useQuery } from '@tanstack/react-query';
import {apiGetLisTransaction} from "@/app/lib/apiGET";

export const useQueryLisTransactions = (serial:string, backup:string, section:string, isBackupReady: boolean) => {

    const { isLoading, isError, data, error, isSuccess} = useQuery({
        queryKey: ['lisTransaction'],
        queryFn: () => apiGetLisTransaction(serial, backup),
        enabled: !!serial && !!backup && section === "lisTransaction" && isBackupReady,
        refetchOnWindowFocus: false,
    });

    return { isLoading, isError, data, error, isSuccess};
};

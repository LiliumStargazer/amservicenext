import { useQuery } from '@tanstack/react-query';
import {apiGetFingersTransactions} from '@/app/lib/api';

export const useQueryFingerTransactions = (serial: string, backup:string, isBackupReady: boolean) => {

    const { isLoading, isError, data, error, isSuccess } = useQuery({
        queryKey: ['fingersTransaction'],
        queryFn: () => apiGetFingersTransactions(serial, backup),
        enabled: !!serial && !!backup && isBackupReady,
        refetchOnWindowFocus: false
    });

    return { isLoading, isError, isSuccess, data, error };
};


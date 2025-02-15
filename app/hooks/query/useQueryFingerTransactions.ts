import { useQuery } from '@tanstack/react-query';
import {apiGetFingersTransactions} from '@/app/lib/api/apiGET';

export const useQueryFingerTransactions = (
    serial: string,
    backup:string,
    isBackupReady: boolean,
    isGetFingerTransactionEnabled: boolean,
) => {

    const { isLoading, isError, data, error, isSuccess, isFetched } = useQuery({
        queryKey: ['fingersTransaction'],
        queryFn: () => apiGetFingersTransactions(serial, backup),
        enabled: isBackupReady && isGetFingerTransactionEnabled,
        refetchOnWindowFocus: false,
    });

    return { isLoading, isError, isSuccess, data, error ,isFetched};
};


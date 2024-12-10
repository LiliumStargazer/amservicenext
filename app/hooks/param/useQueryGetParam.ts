import { useQuery } from '@tanstack/react-query';
import { apiGetParams } from '@/app/lib/api';

const useQueryGetParam = (serial: string, backup: string, isBackupReady: boolean, IDParam: string) => {

    const { isLoading, isError, isSuccess, data, error } = useQuery({
        queryKey: ['getParamsBackups'],
        queryFn: () => apiGetParams(serial, backup, IDParam),
        enabled: !!serial && !!backup && IDParam.length > 0 && isBackupReady ,
    });

    return { isLoading, isError, isSuccess, data, error };
};

export default useQueryGetParam;
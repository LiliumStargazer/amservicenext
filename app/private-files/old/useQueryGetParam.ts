import { useQuery } from '@tanstack/react-query';
import { apiGetParams } from '@/app/lib/apiGET';

const useQueryGetParam = (serial: string, backup: string, isBackupReady: boolean, IDParam: string) => {

    const { isLoading, isError, isSuccess, data, error } = useQuery({
        queryKey: ['getParamsBackups'],
        queryFn: () => apiGetParams(serial, backup, IDParam),
        enabled: !!serial && !!backup && IDParam.length > 0 && isBackupReady ,
        refetchOnWindowFocus: false
    });

    return { isLoading, isError, isSuccess, data, error };
};

export default useQueryGetParam;
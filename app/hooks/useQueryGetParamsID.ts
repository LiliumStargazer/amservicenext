import { useQuery } from '@tanstack/react-query';
import {apiGetParamsIds} from '@/app/lib/apiGET';

const useQueryGetParamsID = (serial: string, backup:string, isBackupReady: boolean) => {

    const { isLoading, isError, isSuccess, data, error } = useQuery({
        queryKey: ['getParamsIDS', serial, backup],
        queryFn: () => apiGetParamsIds(serial, backup),
        enabled: !!serial && !!backup && isBackupReady ,
        refetchOnWindowFocus: false
    });

    return { isLoading, isError, isSuccess, data, error };
};

export default useQueryGetParamsID;
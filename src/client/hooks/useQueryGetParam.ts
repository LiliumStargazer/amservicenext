import { useQuery } from '@tanstack/react-query';
import useStore from '@/app/store';
import { apiGetParams } from '@/src/client/api/api';

const useQueryGetParam = () => {
    const serial = useStore(state => state.serial);
    const backupSelected = useStore(state => state.backupSelected);
    const IDParam = useStore(state => state.IDParam);
    const table = useStore(state => state.table);

    const { isLoading, isError, isSuccess, data, error } = useQuery({
        queryKey: ['getParamsBackups'],
        queryFn: () => apiGetParams(serial, backupSelected, IDParam),
        enabled: !!backupSelected && !!serial && table === "param" && IDParam.length !== 0,
    });
    console.log('getParamsBackups', serial, backupSelected, IDParam);
    console.log('useQueryGetParam', { isLoading, isError, isSuccess, data, error });

    return { isLoading, isError, isSuccess, data, error };
};

export default useQueryGetParam;
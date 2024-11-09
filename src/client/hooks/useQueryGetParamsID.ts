import { useQuery } from '@tanstack/react-query';
import useStore from '@/app/store';
import {apiGetParamsIds} from '@/src/client/api/api';

const useQueryGetParamsID = () => {
    const serial = useStore(state => state.serial);
    const backupSelected = useStore(state => state.backupSelected);
    const table = useStore(state => state.table);

    const { isLoading, isError, isSuccess, data, error } = useQuery({
        queryKey: ['getParamsIDS', serial, backupSelected],
        queryFn: () => apiGetParamsIds(serial, backupSelected),
        enabled: !!backupSelected && !!serial && table === "param",
    });

    return { isLoading, isError, isSuccess, data, error };
};

export default useQueryGetParamsID;
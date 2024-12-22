import { useQuery } from '@tanstack/react-query';
import { apiGetBackupList} from "@/app/lib/api";

export const useQueryGetBackupList = (serial: string) => {
    console.log('useQueryGetBackupList', serial);

    const { isLoading, isError, data, error, isSuccess, isFetched} = useQuery({
        queryKey: ['getBackuplist', serial],
        queryFn: () => apiGetBackupList(serial),
        enabled: !!serial,
        refetchOnWindowFocus: false
    });

    return { isLoading, isError, data, error, isSuccess, isFetched};
};

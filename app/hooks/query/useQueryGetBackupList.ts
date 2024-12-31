import { useQuery } from '@tanstack/react-query';
import { apiGetBackupList} from "@/app/lib/api";

export const useQueryGetBackupList = (serial: string, enableGetBackupList: boolean) => {
    const { isLoading, isError, data, error, isSuccess, isFetched} = useQuery({
        queryKey: ['getBackuplist', serial],
        queryFn: () => apiGetBackupList(serial),
        enabled: enableGetBackupList,
        refetchOnWindowFocus: false,
    });

    return { isLoading, isError, data, error, isSuccess, isFetched};
};

import { useQuery } from '@tanstack/react-query';
import { apiGetBackupList} from "@/app/lib/api";

export const useQueryGetBackupList = (serial: string) => {
    const { isLoading, isError, data, error, isSuccess} = useQuery({
        queryKey: ['getBackuplist', serial],
        queryFn: () => apiGetBackupList(serial),
        enabled: !!serial,
    });

    return { isLoading, isError, data, error, isSuccess};
};

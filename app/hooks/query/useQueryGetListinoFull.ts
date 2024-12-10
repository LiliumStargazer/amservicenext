import { useQuery } from '@tanstack/react-query';

import { apiGetListinoFull} from "@/app/lib/api";

export const useQueryGetListinoFull = ( serial: string, isGetListino: boolean) => {

    const { isLoading, isError, data, error , isSuccess} = useQuery({
        queryKey: ['getListinoFull'],
        queryFn: () => apiGetListinoFull(serial),
        enabled: !!serial && isGetListino,
    });

    return { isLoading, isError, data, error, isSuccess};
};

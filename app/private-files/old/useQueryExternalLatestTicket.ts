import { useQuery } from '@tanstack/react-query';
import {apiGetTicketLatestCorsHandling} from "@/app/lib/apiGET"; // Ensure the import path is correct

export const useQueryExternalLatestTicket = () => {

    const { isLoading, isError, data, error , isSuccess} = useQuery({
        queryKey: ['getExternalLatestTicket'],
        queryFn: () => apiGetTicketLatestCorsHandling(),
    });

    return { isLoading, isError, data, error, isSuccess };
};

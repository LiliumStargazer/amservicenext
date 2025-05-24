import { useQuery } from '@tanstack/react-query';
import { apiGetTicketHistoryCorsHandling} from "@/app/lib/apiGET"; // Ensure the import path is correct

export const useQueryExternalTicketHistory = () => {

    const { isLoading, isError, data, error , isSuccess} = useQuery({
        queryKey: ['getTicketHistory'],
        queryFn: () => apiGetTicketHistoryCorsHandling(),
    });

    return { isLoading, isError, data, error, isSuccess };
};

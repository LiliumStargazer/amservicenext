import { useQuery } from '@tanstack/react-query';
import { apiGetAliveEventsCorsHandling } from "@/app/lib/apiGET";


const useQueryEventsFromAlive = (isAliveEvent: boolean) => {
    const { isLoading, isError,  data, error, isSuccess } = useQuery({
        queryKey: ['eventFromAlive'],
        queryFn: () => apiGetAliveEventsCorsHandling(),
        enabled: isAliveEvent,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });
    return { isLoading, isError, data, error, isSuccess };
};

export default useQueryEventsFromAlive;
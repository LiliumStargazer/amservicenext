import { useQuery } from '@tanstack/react-query';
import { apiGetAliveEventsCorsHandling } from "@/app/lib/api";


const useQueryEventsFromAlive = (serial: string | null, backup: string | null, isAliveEvent: boolean) => {
    const { isLoading, isError,  data, error, isSuccess } = useQuery({
        queryKey: ['eventFromAlive'],
        queryFn: () => apiGetAliveEventsCorsHandling(),
        enabled: !!serial && !!backup && !serial.includes('No such file') && isAliveEvent,
        refetchOnWindowFocus: false
    });

    return { isLoading, isError, data, error, isSuccess };
};

export default useQueryEventsFromAlive;
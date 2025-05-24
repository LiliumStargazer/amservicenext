import { useQuery } from '@tanstack/react-query';

import { apiGetSelectedEvents } from "@/app/lib/apiGET"; // Ensure the import path is correct


const useQuerySelectedEvents = (
    serial: string,
    backup: string,
    searchValue: string,
    enableGetSelectedEvents: boolean,
) => {

    const { isLoading, isError, isPending, data, error, isSuccess , isFetched} = useQuery({
        queryKey: ['eventsFromSelectedEvents', searchValue],
        queryFn: () => apiGetSelectedEvents(serial, backup, searchValue),
        enabled: enableGetSelectedEvents,
        refetchOnWindowFocus: false,
    });

    return { isLoading, isError, isPending, data, error, isSuccess , isFetched};
};

export default useQuerySelectedEvents;
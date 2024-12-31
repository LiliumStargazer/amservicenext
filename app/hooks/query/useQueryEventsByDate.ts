import { useQuery } from '@tanstack/react-query';
import { apiGetEventsByDate } from "@/app/lib/api";

const useQueryEventsByDate = (serial: string, backup: string, date: string | null, enableGetEventsByDate: boolean) => {

    const { isLoading, isError, isPending, data, error, isSuccess ,isFetched} = useQuery({
        queryKey: ['eventsFromDataByDate',date, backup ],
        queryFn: () => { return apiGetEventsByDate(serial, backup, date) } ,
        enabled: enableGetEventsByDate,
        refetchOnWindowFocus: false,
    });

    return { isLoading, isError, isPending, data, error, isSuccess,isFetched };
};

export default useQueryEventsByDate;
import { useQuery } from '@tanstack/react-query';
import { apiGetEventsByDate } from "@/app/lib/api";

const useQueryEventsByDate = (serial: string, backup: string, isBackupReady: boolean, date: string | null) => {

    const { isLoading, isError, isPending, data, error, isSuccess } = useQuery({
        queryKey: ['eventsFromDataByDate',date, backup ],
        queryFn: () => { return apiGetEventsByDate(serial, backup, date) } ,
        enabled: !!serial && !!backup && !backup.includes('No such file') && isBackupReady,
    });

    return { isLoading, isError, isPending, data, error, isSuccess };
};

export default useQueryEventsByDate;
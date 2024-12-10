import { useQuery } from '@tanstack/react-query';

import { apiGetSelectedEvents } from "@/app/lib/api"; // Ensure the import path is correct


const useQuerySelectedEvents = (serial: string, backup: string, searchValue: string, isBackupReady: boolean) => {

    const { isLoading, isError, isPending, data, error, isSuccess } = useQuery({
        queryKey: ['eventsFromSelectedEvents', searchValue],
        queryFn: () => apiGetSelectedEvents(serial, backup, searchValue),
        enabled: !!serial && !!backup && !backup.includes('No such file') && searchValue.length > 0 && isBackupReady,
    });
    return { isLoading, isError, isPending, data, error, isSuccess };
};

export default useQuerySelectedEvents;
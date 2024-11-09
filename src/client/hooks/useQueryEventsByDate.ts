import { useQuery } from '@tanstack/react-query';
import useStore from '@/app/store';
import { apiGetEventsByDate } from "@/src/client/api/api"; // Ensure the import path is correct

type LatestDataBackup = any; // Replace with the correct type for your data

const useQueryEventsByDate = (date: string, isDateChanged: boolean) => {
    const serial = useStore(state => state.serial);
    const backupSelected = useStore(state => state.backupSelected);
    const table = useStore(state => state.table);
    
    const { isLoading, isError, data, error, isSuccess } = useQuery<LatestDataBackup, Error>({
        queryKey: ['eventsFromDataByDate'],
        queryFn: () => apiGetEventsByDate(serial, backupSelected, date),
        enabled: !!serial && !!backupSelected && !backupSelected.includes('No such file') && table === 'master' && isDateChanged,
    });

    return { isLoading, isError, data, error, isSuccess };
};

export default useQueryEventsByDate;
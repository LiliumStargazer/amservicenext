import { useQuery } from '@tanstack/react-query';
import useStore from '@/app/store';
import { apiGetSelectedEvents } from "@/src/client/api/api"; // Ensure the import path is correct

type SelectedEvent = any; // Replace with the correct type for your data

const useSelectedEvents = () => {
    const serial = useStore(state => state.serial);
    const backupSelected = useStore(state => state.backupSelected);
    const searchValueDebounced = useStore(state => state.searchValueDebounced);
    const isSearchingLogEvent = useStore(state => state.isSearchingLogEvent);
    const table = useStore(state => state.table);

    const { isLoading, isError, data, error } = useQuery<SelectedEvent, Error>({
        queryKey: ['eventsFromSelectedEvents'],
        queryFn: () => apiGetSelectedEvents(serial, backupSelected, searchValueDebounced),
        enabled: !!serial && !!backupSelected && !backupSelected.includes('No such file') && isSearchingLogEvent && table === 'master' && searchValueDebounced.length !== 0,
    });

    return { isLoading, isError, data, error };
};

export default useSelectedEvents;
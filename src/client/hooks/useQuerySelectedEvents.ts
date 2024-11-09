import { useQuery } from '@tanstack/react-query';
import useStore from '@/app/store';
import { apiGetSelectedEvents } from "@/src/client/api/api"; // Ensure the import path is correct

type SelectedEvent = any; // Replace with the correct type for your data

const useQuerySelectedEvents = () => {
    const serial = useStore(state => state.serial);
    const backupSelected = useStore(state => state.backupSelected);
    const searchValueDebounced = useStore(state => state.searchValueDebounced);
    const isSearchingLogEvent = useStore(state => state.isSearchingLogEvent);
    const table = useStore(state => state.table);
    const softwareType = useStore(state => state.softwareType);

    const { isLoading, isError, data, error } = useQuery<SelectedEvent, Error>({
        queryKey: ['eventsFromSelectedEvents'],
        queryFn: () => apiGetSelectedEvents(serial, backupSelected, searchValueDebounced, softwareType),
        enabled: !!serial && !!backupSelected && !backupSelected.includes('No such file') && isSearchingLogEvent && table === 'master' && searchValueDebounced.length !== 0 && softwareType !== 'unknown',
    });

    return { isLoading, isError, data, error };
};

export default useQuerySelectedEvents;
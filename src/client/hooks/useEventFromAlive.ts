import { useQuery } from '@tanstack/react-query';
import useStore from '@/app/store';
import { apiGetAliveEventsCorsHandling } from "@/src/client/api/api"; // Ensure the import path is correct

type AliveEvent = any; // Replace with the correct type for your data

const useEventFromAlive = (isAliveEvent: boolean) => {
    const serial = useStore(state => state.serial);
    const backupSelected = useStore(state => state.backupSelected);
    const table = useStore(state => state.table);

    const { isLoading, isError, data, error } = useQuery<AliveEvent, Error>({
        queryKey: ['eventFromAlive'],
        queryFn: () => apiGetAliveEventsCorsHandling(),
        enabled: !!serial && !!backupSelected && !backupSelected.includes('No such file') && isAliveEvent && table === 'master',
    });

    return { isLoading, isError, data, error };
};

export default useEventFromAlive;
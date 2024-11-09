import { useQuery } from '@tanstack/react-query';
import useStore from '@/app/store';
import {apiGetEventsFromLatestBackup} from "@/src/client/api/api"; // Assicurati di avere il percorso corretto per l'importazione


type LatestDataBackup = any; // Sostituisci con il tipo corretto per i dati

const useQueryLatestEvents = () => {
    const serial = useStore(state => state.serial);
    const backupSelected = useStore(state => state.backupSelected);
    const isLatestBackupQueryActive = useStore(state => state.isLatestBackupQueryActive);
    const table = useStore(state => state.table);

    const {isLoading, isPending, isError, data, error, isSuccess} = useQuery<LatestDataBackup, Error>({
        queryKey: ['eventsFromLatestBackup'],
        queryFn: () => apiGetEventsFromLatestBackup(serial, backupSelected),
        enabled: !!serial && !!backupSelected && !backupSelected.includes('No such file') && isLatestBackupQueryActive && table === 'master',
    });

    return { isLoading, isPending, isError, data, error, isSuccess};
};

export default useQueryLatestEvents;
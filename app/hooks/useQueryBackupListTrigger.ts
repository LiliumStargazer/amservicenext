import { useQuery } from '@tanstack/react-query';
import { apiGetBackupList} from "@/app/lib/apiGET";

export const useQueryBackupListTrigger = (serial: string) => {

    const query = useQuery({
        queryKey: ['getBackuplistTrigger', serial],
        queryFn: () => apiGetBackupList(serial),
        enabled: serial.length === 5 , // Blocca esecuzioni automatiche
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        staleTime:0, // Considera sempre i dati obsoleti
    });

    return {
        ...query,
        // triggerBackupList: () => query.refetch(), // Wrapper esplicito
    };
};

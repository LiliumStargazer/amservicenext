import { useQuery } from '@tanstack/react-query';
import {apiRecoverDB} from "@/app/lib/apiGET";

export const useQueryRecoverDb = (serial: string, backup: string, isDownloadSuccess: boolean) => {
    const query = useQuery({
        queryKey: ['recoverDb', serial, backup],
        queryFn: () => apiRecoverDB(serial, backup),
        enabled: serial.length === 5 && backup.length > 0 && isDownloadSuccess, // Blocca esecuzioni
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        staleTime: 0,
    });

    return {
        ...query,
        // triggerecoverDb: () => query.refetch(), // Wrapper esplicito
    };
};
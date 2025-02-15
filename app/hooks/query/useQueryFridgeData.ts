import { useQuery } from '@tanstack/react-query';
import {apiFridgeEvents} from "@/app/lib/api/apiGET";

export const useQueryFridgeData = (serial:string, backup:string, isBackupReady:boolean, section:string) => {

    const { isLoading, isError, data, error , isSuccess} = useQuery({
        queryKey: ['fridgeData'],
        queryFn: () => apiFridgeEvents(serial, backup),
        enabled: !!serial && !!backup && ( section === "fridge" || section === "chart") && isBackupReady,
    });
    return { isLoading, isError, data, error, isSuccess};
};

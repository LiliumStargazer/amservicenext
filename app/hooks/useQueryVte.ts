import {useQuery} from "@tanstack/react-query";
import {apiGetVteData} from "@/app/lib/apiGET";


export const useQueryVte = (serial:string) => {

    const { isLoading, isError, data, error, isSuccess} = useQuery({
        queryKey: ['vte', serial],
        queryFn: () => apiGetVteData(serial),
        enabled: !!serial,
        refetchOnWindowFocus: false,
    });

    return { isLoading, isError, data, error, isSuccess};
};

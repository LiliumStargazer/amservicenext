import {useQueryClient} from "@tanstack/react-query";


const useResetQueries = () => {
    const queryClient = useQueryClient();

    return async () => {

        const queryCache = queryClient.getQueryCache();
        queryCache.clear();
    };
};
export default useResetQueries;
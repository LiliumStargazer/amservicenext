import {useCallback} from "react";
import {useQueryClient} from "@tanstack/react-query";

const useResetQueries = () => {
    const queryClient = useQueryClient();

    return useCallback(async () => {
        queryClient.resetQueries().catch(console.error);
    }, [queryClient]);
};

export default useResetQueries;
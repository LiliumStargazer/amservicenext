import {useCallback} from "react";
import useStore from "@/app/store";

const useNoDataAndStopLoading = () => {
    const setTable = useStore((state) => state.setTable);
    const setMessage = useStore((state) => state.setMessage);
    const setLoadingGlobal = useStore((state) => state.setLoadingGlobal);

    return useCallback((message: string) => {
        setMessage(message);
        setTable("no_table");
        setLoadingGlobal(false);
    }, [setMessage, setTable, setLoadingGlobal]);
};

export default useNoDataAndStopLoading;
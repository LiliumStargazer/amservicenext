import {useCallback} from "react";
import {usePathname, useRouter} from "next/navigation";
import useStore from "@/app/store";
import {getSerialValidationMessage, trimAndFormatSerial} from "@/src/client/utils/utils";
import {useQueryClient} from "@tanstack/react-query";


const useResetQueries = () => {
    const queryClient = useQueryClient();

    return async () => {

        const queryCache = queryClient.getQueryCache();
        queryCache.clear();
    };
};

const useNavigateToLog = () => {
    const router = useRouter();
    const pathname = usePathname();

    return () => {
        if (!pathname.includes("/log")) {
            router.push("/log");
        }
    };
};

const useResetAndNavigate = () => {
    const setMessage = useStore(state => state.setMessage);
    const setTable = useStore(state => state.setTable);
    const setExcelEvents = useStore(state => state.setExcelEvents);
    const setSerial = useStore(state => state.setSerial);
    const setBackupSelected = useStore(state => state.setBackupSelected);
    const setLoadingGlobal = useStore(state => state.setLoadingGlobal);
    const setSearchValueDebounced = useStore(state => state.setSearchValueDebounced);
    const table = useStore(state => state.table);
    const setFrigoData = useStore(state => state.setFrigoData);

    const resetQueries = useResetQueries();
    const navigateToLog = useNavigateToLog();

    return useCallback(async (serialTemp: string) => {
        await resetQueries(); // Reset delle query
        const formattedSerial = trimAndFormatSerial(serialTemp);
        const message = getSerialValidationMessage(formattedSerial);

        setLoadingGlobal(true);
        if (table !== "master") setTable("master");

        navigateToLog(); // Navigazione verso "/log"

        if (message !== "valid") {
            setMessage(message);
            setTable("no_table");
            setLoadingGlobal(false);
        } else {
            setSerial(formattedSerial);
            setSearchValueDebounced('');
            setMessage('');
            setExcelEvents([]);
            setFrigoData([]);
        }

    }, [setMessage, setTable, setSerial, resetQueries, navigateToLog, table, setExcelEvents, setBackupSelected, setLoadingGlobal, setSearchValueDebounced, setFrigoData]);
};

export default useResetAndNavigate;
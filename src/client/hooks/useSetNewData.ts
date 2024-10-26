import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import useStore from "@/app/store";
import { getSerialValidationMessage, trimAndFormatSerial } from "@/src/client/utils/utils";

// Main hook
const useSetNewData = () => {
    const setSerial = useStore((state) => state.setSerial);
    const setLoadingGlobal = useStore((state) => state.setLoadingGlobal);
    const setTable = useStore((state) => state.setTable);
    const setMessage = useStore((state) => state.setMessage);
    const table = useStore((state) => state.table);
    const queryClient = useQueryClient();
    const router = useRouter();
    const pathname = usePathname();

    // Utility functions using `useStore` and router hooks in the main hook body
    const noDataAndStopLoading = (message: string) => {
        setMessage(message);
        setTable("no_table");
        setLoadingGlobal(false);
    };

    const resetStoreData = () => {
        const { setMessage, setExcelEvents, setFrigoData, setSearchValueDebounced, setSerial } = useStore.getState();
        setSearchValueDebounced('');
        setMessage('');
        setExcelEvents([]);
        setFrigoData([]);
        setSerial('');
    };

    const resetQueries = async () => {
        queryClient.clear();
    };

    const navigateToLog = () => {
        if (!pathname.includes("/log")) {
            router.push("/log");
        }
        if (table !== "master") {
            setTable("master");
        }
    };

    // Main hook function with logic
    return useCallback(async (serialTemp: string) => {
        const formattedSerial = trimAndFormatSerial(serialTemp);
        const message = getSerialValidationMessage(formattedSerial);
        if (message !== "valid") {
            noDataAndStopLoading(message);
        } else {
            resetStoreData();
            setSerial(formattedSerial);
            setLoadingGlobal(true);
            await resetQueries();
            navigateToLog();

        }
    }, [setSerial, setLoadingGlobal, setTable, setMessage, table, queryClient, router, pathname]);
};

export default useSetNewData;
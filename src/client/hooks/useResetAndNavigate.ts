import {useCallback} from "react";
import {usePathname, useRouter} from "next/navigation";
import useStore from "@/app/store";
import {getSerialValidationMessage, trimAndFormatSerial} from "@/src/client/utils/utils";
import {useQueryClient} from "@tanstack/react-query";

const useResetAndNavigate = () => {
    const setMessage = useStore(state => state.setMessage);
    const setTable = useStore(state => state.setTable);
    const setExcelEvents = useStore(state => state.setExcelEvents);
    const setSerial = useStore(state => state.setSerial);
    const setBackupSelected = useStore(state => state.setBackupSelected);
    const setBackupList = useStore(state => state.setBackupList);
    const setLoadingGlobal = useStore(state => state.setLoadingGlobal);
    const setSearchValueDebounced = useStore(state => state.setSearchValueDebounced);
    const table = useStore(state => state.table);
    const setFrigoData = useStore(state => state.setFrigoData);

    const router = useRouter();
    const pathname = usePathname();
    const queryClient = useQueryClient();

    return useCallback( (serialTemp: string) => {
        queryClient.resetQueries().catch(console.error);
        const formattedSerial = trimAndFormatSerial(serialTemp);
        const message = getSerialValidationMessage(formattedSerial);


        setLoadingGlobal(true);
        if ( table !== "master")
            setTable("master");
        if (!pathname.includes("/log")) {
            router.push("/log");
        }
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
            setBackupSelected("");
        }
    }, [setMessage, setTable, setSerial, router, table, setMessage, setExcelEvents, setBackupSelected, setBackupList, setLoadingGlobal, pathname, queryClient, setSearchValueDebounced, setFrigoData]);
};

export default useResetAndNavigate;
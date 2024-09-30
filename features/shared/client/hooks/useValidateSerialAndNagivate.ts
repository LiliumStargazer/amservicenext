import { useCallback } from "react";
import {usePathname, useRouter} from "next/navigation";
import useStore from "@/app/store";
import { getSerialValidationMessage, trimAndFormatSerial } from "@/features/shared/client/utils/utils";
import { getSerialValidationServer } from "@/features/shared/client/api";

const useValidateSerialAndNavigate = () => {
    const setMessage = useStore(state => state.setMessage);
    const setTable = useStore(state => state.setTable);
    const setSerial = useStore(state => state.setSerial);
    const setLogDataFetched = useStore(state => state.setLogDataFetched);
    const router = useRouter();
    const pathname = usePathname();

    return useCallback(async (serialTemp: string) => {

        const formattedSerial = trimAndFormatSerial(serialTemp);
        const message = getSerialValidationMessage(formattedSerial);
        if (message !== "valid") {
            setMessage(message);
        } else {
            const serialValidated = await getSerialValidationServer(formattedSerial);
            if (serialValidated.error) {
                setMessage(serialValidated.error);
            } else if (!serialValidated) {
                setMessage("The serial number not exists");
            } else {
                setSerial(serialTemp);
                setLogDataFetched(false);
                setTable("master");
                if ( !pathname.includes("/log") ) {
                    router.push("/log");
                }
            }
        }
    }, [setMessage, setTable, setSerial, router]);
};

export default useValidateSerialAndNavigate;
import { useCallback } from "react";
import { trimAndFormatSerial, getSerialValidationMessage } from "@/app/utils/utils";

const useReset = (
    serialTemp: string,
    setMessage: (message: string) => void,
    setBackup: (backup: string) => void,
    setIsBackupReady: (isReady: boolean) => void,
    setSearchValue: (value: string) => void,
    setSerial: (serial: string) => void,
    setDatePiCkerDate: (date: Date) => void,
    setDateIsoString: (date: string | null) => void,
    resetQueries: () => Promise<void>
) => {
    return useCallback(async () => {
        const formattedSerial = trimAndFormatSerial(serialTemp);
        const message = getSerialValidationMessage(formattedSerial);
        if (message !== "valid") {
            setMessage(message);
        } else {
            setBackup('');
            setIsBackupReady(false);
            setSearchValue('');
            setMessage('');
            setSerial(formattedSerial);
            setDatePiCkerDate(new Date());
            setDateIsoString(null);
            await resetQueries();
        }
    }, [serialTemp, setMessage, setBackup, setIsBackupReady, setSearchValue, setSerial, setDatePiCkerDate, setDateIsoString, resetQueries]);
};

export default useReset;
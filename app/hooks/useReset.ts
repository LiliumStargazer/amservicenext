import { useCallback } from "react";

const useReset = (
    setBackup: (backup: string) => void,
    setIsBackupReady: (isReady: boolean) => void,
    setSearchValue: (value: string) => void,
    setDatePiCkerDate: (date: Date) => void,
    setDateIsoString: (date: string | null) => void,
    setIsGetBackupListEnabled: (value: boolean) => void,
    resetQueries: () => Promise<void>
) => {
    return useCallback(async () => {
        setBackup('');
        setIsBackupReady(false);
        setSearchValue('');
        setDatePiCkerDate(new Date());
        setDateIsoString(null);
        setIsGetBackupListEnabled(false);
        await resetQueries();
    }, [setBackup, setIsBackupReady, setSearchValue, setDatePiCkerDate, setDateIsoString, setIsGetBackupListEnabled, resetQueries]);
};

export default useReset;
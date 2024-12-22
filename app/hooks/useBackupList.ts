import { useEffect } from "react";
import { getLatestBackup } from "@/app/utils/utils";

const useBackupList = (
    isSuccessBackupList: boolean,
    backupList: string[],
    setBackup: (backup: string) => void

) => {
    useEffect(() => {
        if (isSuccessBackupList && Array.isArray(backupList)) {
            const latestDataBackup = getLatestBackup(backupList);
            setBackup(latestDataBackup);
        }
    }, [isSuccessBackupList, backupList, setBackup]);
};

export default useBackupList;